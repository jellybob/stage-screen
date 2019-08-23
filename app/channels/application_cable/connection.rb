# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    attr_accessor :display
    attr_accessor :display_id

    identified_by :display_id

    def connect
      self.display = find_display
      self.display_id = display.display_id
    end

    private

    def find_display
      if (display = Display.find_by(display_id: cookies.signed[:display_id]))
        display
      else
        reject_unauthorized_connection
      end
    end
  end
end
