# frozen_string_literal: true

class Display < ApplicationRecord
  before_create :generate_display_id
  after_save :broadcast_update

  def generate_display_id
    self.display_id = SecureRandom.hex(3)
  end

  def broadcast_update
    ActionCable.server.broadcast("display:#{display_id}", to_json)
  end
end
