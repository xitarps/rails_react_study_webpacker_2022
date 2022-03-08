class Event < ApplicationRecord
  validates :title, :location, :datetime, presence: true
end
