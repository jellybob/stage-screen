# frozen_string_literal: true

class MessagesController < ApplicationController
  def next
    @messages = Message.order("RANDOM()").where("active = ?", true)
    @messages = @messages.where("id != ?", params[:previous]) if params[:previous]

    render json: @messages.first
  end
end
