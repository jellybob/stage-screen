class ScheduleImport < ActiveJob::Base
  queue_as :default

  def perform
    response = Typhoeus.get("https://www.emfcamp.org/schedule/2018.json")
    schedule = JSON.parse(response.body)

    schedule.each do |event|
      import_event(event)
    end

    ActionCable.server.broadcast("schedule", "updated")

    true
  end

  def import_event(source) # rubocop:disable Metrics/AbcSize
    event = Event.find_or_initialize_by(external_id: source["id"])
    %w[source cost equipment slug venue title description type link map_link speaker age_range].each do |field|
      event[field] = source[field]
    end

    event.latitude = source["latlon"][0]
    event.longitude = source["latlon"][1]
    event.starts_at = Time.parse(source["start_date"])
    event.ends_at = Time.parse(source["end_date"])
    event.source_document = source.to_json

    return unless event.changed?

    puts "Event #{event.external_id} has changed, saving"
    event.save
  end
end
