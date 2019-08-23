# frozen_string_literal: true

class Content < ApplicationRecord
  VALID_TYPES = [
    %w[Video video],
    %w[YouTube youtube],
    %w[Image image]
  ].freeze

  def self.valid_types
    VALID_TYPES
  end

  def tags=(new_tags)
    new_tags = new_tags.split(",").map(&:strip) if new_tags.is_a?(String)

    self[:tags] = new_tags
  end
end
