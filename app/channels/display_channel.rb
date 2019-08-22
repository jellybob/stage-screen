# frozen_string_literal: true

class DisplayChannel < ApplicationCable::Channel
  delegate :display, to: :connection
  delegate :display_id, to: :display

  def subscribed
    display.update(connected: true)
    stream_from "display:#{display_id}"
  end

  def unsubscribed
    display.update(connected: false)
  end

  def request_state
    ActionCable.server.broadcast("display:#{display_id}", display.to_json)
  end
end
