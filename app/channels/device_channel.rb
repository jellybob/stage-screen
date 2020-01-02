class DeviceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "devices_#{device_id}"

    # Device config is a bit racey, this gets around that (in an admitedly horrible way)
    Thread.new do
      sleep 0.5
      ActionCable.server.broadcast "devices_#{device_id}", current_device.to_json
    end
  end

  def device_id
    current_device.setup_key
  end
end
