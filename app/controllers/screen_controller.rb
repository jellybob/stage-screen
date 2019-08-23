# frozen_string_literal: true

class ScreenController < ApplicationController
  layout "screen"

  def show
    find_or_create_display
  end

  private

  def find_or_create_display
    if cookies.signed[:display_id].nil?
      display = Display.create!
      cookies.signed[:display_id] = display.display_id
      return display
    end

    Display.where(display_id: cookies.signed[:display_id]).first
  end
end
