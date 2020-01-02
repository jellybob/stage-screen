class Event < ApplicationRecord
  self.inheritance_column = :object_type

  scope :upcoming, lambda {
    where("ends_at >= ?", Time.local(2018, 8, 31, 16, 20, 0)).order("starts_at ASC")
  }
  scope :today, lambda {
    where("starts_at <= ?", Time.local(2018, 8, 31, 23, 59, 59))
  }
  scope :in_location, lambda { |location|
    where(venue: location)
  }
end
