# frozen_string_literal: true

class UpdateNotifier < ApplicationCable::Channel
  def self.refresh_clients
    ActionCable.server.broadcast("updates", "reload")
  end

  def subscribed
    stream_from "updates"
  end

  def unsubscribed
    display.update(connected: false)
  end
end
