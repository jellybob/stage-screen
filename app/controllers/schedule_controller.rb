# frozen_string_literal: true

class ScheduleController < ApplicationController
  def show
    now = Time.utc(2018, 9, 2, 0, 0, 0)

    location = params[:id]

    response = Typhoeus.get("https://www.emfcamp.org/schedule.json")
    schedule = JSON.parse(response.body).map do |item|
      item.merge(
        "start_date" => Time.zone.parse(item["start_date"]).utc,
        "end_date" => Time.zone.parse(item["end_date"]).utc
      )
    end

    this_location =
      schedule
      .filter { |item| item["venue"] == location && item["start_date"] > now }
      .sort_by { |item| item["start_date"] }
      .slice(0, 3)

    render json: this_location
  end
end
