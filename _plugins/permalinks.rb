module Jekyll
  class Document
    def url=(name)
      @url = name
    end
  end
end

module Permalinks
  class Generator < Jekyll::Generator
    def generate(site)
      site.collections.each do |name, items|
        items.docs.each do |doc|
          if doc.url.end_with?("/index")
            doc.data["permalink"] = doc.url[0..-7]
            doc.url = doc.url[0..-7]
          end
        end
      end
    end
  end
end

module Jekyll
  module Tags
    class Link < Liquid::Tag
      def render(context)
        site = context.registers[:site]

        site.each_site_file do |item|
          url = item.url.end_with?("/index") ? item.url[0..-7] : item.url
          return url if item.relative_path == @relative_path
          # This takes care of the case for static files that have a leading /
          return url if item.relative_path == "/#{@relative_path}"
        end

        raise ArgumentError, <<-MSG
Could not find document '#{@relative_path}' in tag '#{self.class.tag_name}'.
Make sure the document exists and the path is correct.
MSG
      end
    end
  end
end