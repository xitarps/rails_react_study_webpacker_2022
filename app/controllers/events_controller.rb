class EventsController < ApplicationController
  def index
    @events = [
      {title:"Event A", start_datetime: "Mon, 21 Oct 2022", location: 'Masp'},
      {title:"Event B", start_datetime: "Mon, 22 Oct 2022", location: 'Oca'},
      {title:"Event C", start_datetime: "Mon, 23 Oct 2022", location: 'Ibira'}
    ]
  end
end
