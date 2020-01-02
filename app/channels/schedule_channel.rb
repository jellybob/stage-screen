class ScheduleChannel < ApplicationCable::Channel
  periodically :broadcast_schedule, every: 15.minutes

  def subscribed
    stream_from "schedule:#{params[:location]}"
    broadcast_schedule
  end

  def broadcast_schedule
    events = Event.today.upcoming.in_location(params[:location]).limit(5).all
    ActionCable.server.broadcast "schedule:#{params[:location]}", events.to_json
  end
end
