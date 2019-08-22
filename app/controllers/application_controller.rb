# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def display
    if cookies.signed[:display_id].nil?
      display = Display.create!
      cookies.signed[:display_id] = display.display_id
      return display
    end

    Display.where(display_id: cookies.signed[:display_id]).first
  end
  helper_method :display
end
