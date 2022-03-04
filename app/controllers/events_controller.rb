class EventsController < ApplicationController
  def index
    @events = Event.order('datetime ASC')
  end
end
