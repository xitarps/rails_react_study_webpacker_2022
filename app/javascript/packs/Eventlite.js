import React from 'react'
import ReactDom from 'react-dom'
import EventList from './EventList';
import EventForm from './EventForm'


// const Eventlite = props => (
//   <div>
//     <EventList events={props.events} />
//   </div>
// );

class Eventlite extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      events: this.props.events
    }
  }

  addNewEvent  = (event) => {
    const events = [event, ...this.state.events].sort((a,b)=>{
      return new Date(a.datetime) - new Date(b.datetime)
    });
    this.setState({events: events});
  }

  render(){
    return(
      <div>
        <EventForm handleNewEvent={this.addNewEvent} />
        <EventList events={this.state.events} />
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  const node = document.getElementById('events_data');
  const data = JSON.parse(node.getAttribute('data'));

  ReactDom.render(
    <Eventlite events={data}/>,
    document.body.appendChild(document.createElement('div'))
  )
});
