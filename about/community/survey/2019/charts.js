var RED = {};
RED.chart = RED.chart || {};
RED.chart.histogram = function(opts) {
    var target = $(opts.id);
    if ((opts.type||"bar") !== 'bar') {
        return;
    }
    if (opts.title) {
        $("<h4>").text(opts.title).appendTo(target);
    }

    var list = $("<ol>").appendTo(target);

    var data = opts.data;
    function formatValue(v) {
        v = ""+(v<10?"&nbsp;":"")+v;
        if (v.indexOf(".") === -1) {
            v = v+".0"
        };
        return v + "%";
    }
    data.forEach(function(d) {
        var item = $("<li>").appendTo(list);
        $("<span>").addClass("chart-bar-label").text(d.name).appendTo(item);
        $("<span>").addClass("chart-bar-value").html(d.value?formatValue(d.value):"&nbsp;").appendTo(item);
        var bar = $("<span>").addClass("chart-bar").appendTo(item);
        if (d.value !== undefined) {
            var c = $("<span>").addClass("chart-bar-fill chart-bar-fill-series-"+(d.series||"0")).width(d.value+"%").appendTo(bar);
            $('<div class="popover">').html(formatValue(d.value)).appendTo(c);
        } else if (opts.stacked) {
            opts.series.forEach(function(s,i) {
                var c = $("<span>").addClass("chart-bar-fill chart-bar-fill-series-"+i).width(d[s]+"%").appendTo(bar);
                $('<div class="popover">').html(formatValue(d[s])).appendTo(c);
            })
        }
    })

    if (opts.stacked) {
        var legend = $('<div class="chart-legend">').appendTo(target);
        opts.series.forEach(function(s,i) {
            $("<span>").addClass("chart-legend-swatch chart-bar-fill-series-"+i).appendTo(legend);
            $("<span>").addClass("chart-legend-label").text(s).appendTo(legend);
        })
    }

    if (opts.total) {
        $('<div class="chart-label">').text(opts.total+" responses").appendTo(target);
    }
}

RED.chart.treeMap = function(opts) {

    var palette = ['#B68181','#FCD0A1','#B1B695','#A393BF','#AFD2E9'];

    var target = $(opts.id);
    var margin = {top: 30, right: 0, bottom: 0, left: 0},
        width = target.width(),
        height = target.height() - margin.top - margin.bottom,
        formatNumber = d3.format(",d"),
        transitioning;
    var x = d3.scale.linear()
        .domain([0, width])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, height])
        .range([0, height]);

    var treemap = d3.layout.treemap()
        .children(function(d, depth) { return depth ? null : d._children; })
        .sort(function(a, b) { return a.value - b.value; })
        .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
        .round(false);

    var svg = d3.select(opts.id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .style("margin-left", -margin.left + "px")
        .style("margin.right", -margin.right + "px")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("shape-rendering", "crispEdges");

    var titleBar = svg.append("g")
        .attr("class", "titleBar");

    titleBar.append("rect")
        .attr("y", -margin.top)
        .attr("width", width)
        .attr("height", margin.top);

    titleBar.append("text")
        .attr("x", 6)
        .attr("y", 10 - margin.top)
        .attr("dy", ".75em");

    var root = opts.data;
    initialize(root);
    accumulate(root);
    sort(root);
    colourize(root);
    layout(root);
    display(root);

    function colourize(root) {
        if (root._children) {
            root._children.forEach(function(c,i) {
                c.fill = palette[i%palette.length];
                colourize(c);
            })
        }
    }

    function initialize(root) {
        root.x = root.y = 0;
        root.dx = width;
        root.dy = height;
        root.depth = 0;
    }
    function accumulate(d) {
        return (d._children = d.children)
        ? d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
        : d.value;
    }

    function sort(d) {
        if (d._children) {
            d._children.sort(function(a,b) { return a.value - b.value });
            d._children.forEach(sort);
        }
    }

    function layout(d) {
        if (d._children) {
            treemap.nodes({_children: d._children});
            d._children.forEach(function(c) {
                c.x = d.x + c.x * d.dx;
                c.y = d.y + c.y * d.dy;
                c.dx *= d.dx;
                c.dy *= d.dy;
                c.parent = d;
                layout(c);
            });
        }
    }

    function display(d) {
        titleBar
            .datum(d.parent)
            .on("click", transition)
            .select("text")
            .text(name(d));

        var g1 = svg.insert("g", ".titleBar")
            .datum(d)
            .attr("class", "depth");

        var g = g1.selectAll("g")
            .data(d._children)
            .enter().append("g");

        g.filter(function(d) { return d._children; })
            .classed("children", true)
            .on("click", transition);

        // g.filter(function(d) { return !d._children; })
        //     .classed("leaf", true)
        //     .on("click", function(d) { console.log(d);});

        g.selectAll(".child")
            .data(function(d) { return d._children || [d]; })
            .enter().append("rect")
            .attr("class", "child")
            .call(rect);

        g.append("rect")
            .attr("class", "parent")
            .call(rect)
            .attr("fill", function(d) { return d.fill||"#f00"})
            .append("title")
            .text(function(d) { return formatNumber(d.value); })

        g.append("text")
            .attr("dy", ".75em")
            .text(function(d) { return d.name; })
            .call(text);

        function transition(d) {
            if (transitioning || !d) return;
            transitioning = true;

            var g2 = display(d),
            t1 = g1.transition().duration(750),
            t2 = g2.transition().duration(750);

            // Update the domain only after entering new elements.
            x.domain([d.x, d.x + d.dx]);
            y.domain([d.y, d.y + d.dy]);

            // Enable anti-aliasing during the transition.
            svg.style("shape-rendering", null);

            // Draw child nodes on top of parent nodes.
            svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

            // Fade-in entering text.
            g2.selectAll("text").style("fill-opacity", 0);

            // Transition to the new view.
            t1.selectAll("text").call(text).style("fill-opacity", 0);
            t2.selectAll("text").call(text).style("fill-opacity", 1);
            t1.selectAll("rect").call(rect);
            t2.selectAll("rect").call(rect);

            // Remove the old node when the transition is finished.
            t1.remove().each("end", function() {
                svg.style("shape-rendering", "crispEdges");
                transitioning = false;
            });
        }

        return g;
    }

    function text(text) {
        text.attr("x", function(d) { return x(d.x) + 6; })
            .attr("y", function(d) { return y(d.y) + 6; });
    }

    function rect(rect) {
        rect.attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y); })
            .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
            .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
    }

    function name(d) {
        return d.parent
            ? name(d.parent) + " - " + d.name
            : d.name;
    }
};
