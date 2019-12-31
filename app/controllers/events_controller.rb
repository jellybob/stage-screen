class EventsController < ApplicationController
  def upcoming
    render json: Event.where(venue: params[:venue]).upcoming.today.limit(5)
  end
end
