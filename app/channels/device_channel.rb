class DeviceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "devices_#{device_id}"
    ActionCable.server.broadcast "devices_#{device_id}", current_device.to_json
  end

  def device_id
    current_device.setup_key
  end
end
