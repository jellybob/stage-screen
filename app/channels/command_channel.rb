class CommandChannel < ApplicationCable::Channel
  def subscribed
    stream_from "commands"
  end
end
