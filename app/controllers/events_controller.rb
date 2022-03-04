class EventsController < ApplicationController
  def index
    @events = [
      {title:"Event A", datetime: "Mon, 21 Oct 2022", location: 'Masp'},
      {title:"Event B", datetime: "Tue, 22 Oct 2022", location: 'Oca'},
      {title:"Event C", datetime: "Wed, 23 Oct 2022", location: 'Ibira'}
    ]
  end
end
