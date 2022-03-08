class Event < ApplicationRecord
  validates :title, :location, :datetime, presence: true
  validates :title, length: {minimum:3, maximum:25}
  validate :datetime_cannot_be_in_the_past

  private

  def datetime_cannot_be_in_the_past
    errors.add(:datetime, "can't be in the past") if (datetime.present? and
      datetime < DateTime.now)
  end
end
