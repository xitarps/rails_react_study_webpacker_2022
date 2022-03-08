class Event < ApplicationRecord
  validates :title, :location, :datetime, presence: true
  validates :title, length: {minimum:3, maximum:25}
end
