# frozen_string_literal: true

class ScheduleController < ApplicationController
  def show
    now = Time.utc(2018, 9, 2, 9, 0, 0)
    location = params[:id]

    this_location =
      full_schedule
      .filter { |item| item["venue"] == location && item["end_date"] > now }
      .sort_by { |item| item["start_date"] }
      .slice(0, 3)

    render json: this_location
  end

  def full_schedule
    Rails.cache.fetch("schedule", expires_in: 5.minutes) do
      response = Typhoeus.get("https://www.emfcamp.org/schedule.json")
      JSON.parse(response.body).map { |i| parse_item_times(i) }
    end
  end

  def parse_item_times(item)
    item.merge(
      "start_date" => Time.zone.parse(item["start_date"]).utc,
      "end_date" => Time.zone.parse(item["end_date"]).utc
    )
  end
end
