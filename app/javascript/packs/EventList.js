import React from 'react'
import Event from './Event'

import PropTypes from "prop-types";

const EventList = props => (
  <div>
    {
      props.events.map((event)=>{
        return(<Event key={event.id} event={event}/>)
      })
    }
  </div>
)

EventList.propTypes = {
  events: PropTypes.array.isRequired
}

export default EventList