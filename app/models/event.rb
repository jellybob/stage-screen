class Event < ApplicationRecord
  self.inheritance_column = :object_type
end
