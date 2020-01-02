class Device < ApplicationRecord
  before_create :generate_setup_key
  after_save :broadcast_change

  # I'm aware you could get conflicts using this approach, but
  # given the expected number of devices I don't expect that to
  # happen in practice. I'm sure at some point it'll bite me.
  def generate_setup_key
    self.setup_key = SecureRandom.hex(3)
  end

  def broadcast_change
    ActionCable.server.broadcast("devices_#{setup_key}", to_json)
  end
end
