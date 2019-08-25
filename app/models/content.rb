# frozen_string_literal: true

class Content < ApplicationRecord
  VALID_TYPES = %w[video youtube image].freeze

  def tags=(new_tags)
    new_tags = new_tags.split(",").map(&:strip) if new_tags.is_a?(String)

    self[:tags] = new_tags
  end
end
