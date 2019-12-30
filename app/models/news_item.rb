class NewsItem < ApplicationRecord
  validates :headline, presence: true

  rails_admin
end
