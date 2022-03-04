import React from 'react'
import Event from './Event'
import EventForm from './EventForm'

const EventList = props => (
  
  <div>
    {
      props.events.map((event)=>{
        return(<Event key={event.id} event={event}/>)
      })
    }
  <EventForm />
  </div>
)

export default EventList