 module Jekyll
  module RSSURLFilter
    def relative_urls_to_absolute(input)
      url = @context.registers[:site].config['url']
      input
        .gsub('src="/', 'src="' + url + '/')
        .gsub('href="/', 'href="' + url + '/')
        .gsub('src=&quot;/', 'src=&quot;' + url + '/')
        .gsub('href=&quot;/', 'href=&quot;' + url + '/')
    end
  end
end

Liquid::Template.register_filter(Jekyll::RSSURLFilter)
