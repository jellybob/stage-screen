# frozen_string_literal: true

class Display < ApplicationRecord
  VALID_MODES = %w[setup stage info bar].freeze

  before_create :generate_display_id
  after_save :broadcast_update

  validates :display_id, presence: true
  validates :view_mode, inclusion: { in: VALID_MODES }

  def generate_display_id
    self.display_id = SecureRandom.hex(3)
  end

  def broadcast_update
    ActionCable.server.broadcast("display:#{display_id}", to_json)
  end
end
