class DevicesController < ApplicationController
  def show
    render json: Device.where(setup_key: session[:device_reference]).first
  end
end
