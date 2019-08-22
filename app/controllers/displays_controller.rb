# frozen_string_literal: true

class DisplaysController < ApplicationController
  def index
    @displays = Display.all
  end

  def show
    @display = Display.find(params[:id])
  end

  def update
    @display = Display.find(params[:id])
    @display.attributes = display_params
    @display.save!

    redirect_to display
  rescue ActiveRecord::RecordInvalid
    render :edit
  end

  private

  def display_params
    params.require(:display).permit(:name, :show_status, :view_mode, :location)
  end
end
