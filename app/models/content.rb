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
end
