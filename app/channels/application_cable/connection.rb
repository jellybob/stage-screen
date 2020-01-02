module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_device

    def connect
      self.current_device = find_device
    end

    def find_device
      Device.find_by(setup_key: cookies.signed["device_reference"])
    end
  end
end
