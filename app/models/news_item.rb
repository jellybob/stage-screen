class NewsItem < ApplicationRecord
  validates :headline, presence: true

  scope :approved, -> { where(approved: true) }
  scope :within_date_range, lambda {
    where("visible_from IS NULL OR visible_from >= NOW()")
      .where("visible_until IS NULL OR visible_until <= NOW()")
  }
  scope :visible, -> { approved.within_date_range }

  rails_admin
end
