class DisplayController < ApplicationController
  layout :display

  def index
    create_device
  end

  def create_device
    ref = cookies.permanent.signed["device_reference"]
    return if Device.where(setup_key: ref).exists?

    device = Device.create!(view: "setup") if device.nil?
    cookies.permanent.signed["device_reference"] = device.setup_key
  end
end
