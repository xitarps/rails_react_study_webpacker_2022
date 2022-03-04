import React from 'react'
import ReactDom from 'react-dom'

const Eventlite = props => (
  <div>
    {props.events.map((event)=>{
      return(
        <div className='event'>
          {event.title}
        </div>
      )
    })}
  </div>
);

document.addEventListener('DOMContentLoaded',()=>{
  const node = document.getElementById('events_data');
  const data = JSON.parse(node.getAttribute('data'));

  ReactDom.render(
    <Eventlite events={data}/>,
    document.body.appendChild(document.createElement('div'))
  )
});
