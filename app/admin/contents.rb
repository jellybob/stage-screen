# frozen_string_literal: true

ActiveAdmin.register Content do
  permit_params :url, :content_type, :contributed_by, :tags

  form do |f|
    f.inputs do
      f.input :content_type, as: :select, collection: Content::VALID_TYPES
      f.input :url
      f.input :contributed_by
      f.input :tags, input_html: { value: f.object.tags.join(", ") }
    end
    f.actions
  end

  index do
    selectable_column
    column :content_type
    column :contributed_by
    column :tags
    column "URL" do |content|
      url_length = content.url.length
      visible_url = url_length > 50 ? "..." + content.url.slice(url_length - 47, url_length) : content.url
      link_to visible_url, content.url
    end
    actions
  end
end
