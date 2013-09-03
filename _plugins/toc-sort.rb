module Jekyll
  class RenderSortedTOC < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      lines = context[@text].split("\n").sort()
      "#{lines}"
    end
  end
end

Liquid::Template.register_tag('render_toc', Jekyll::RenderSortedTOC)
