import React from 'react'
import ReactDom from 'react-dom'
import EventList from './EventList';
import EventForm from './EventForm'
import FormErrors from './FormErrors';

// const Eventlite = props => (
//   <div>
//     <EventList events={props.events} />
//   </div>
// );

class Eventlite extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      events: this.props.events,
      title: '',
      datetime: '',
      location: '',
      formErrors: {},
      success: false
    }
  }


  // handleInput(event) {    with arrow function we avoid the 'bind(this)'
  handleInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const newState = {};
    newState[name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit = (e) =>{
    // Grab the CSRF token from the meta tag
    let newEvent = {title: this.state.title,
                    datetime: this.state.datetime,
                    location: this.state.location
                   }
    const csrfToken = document.querySelector("[name='csrf-token']").content
    fetch("/events", {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken, // 👈👈👈 Set the token
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ event: newEvent })
    }).then(response => {

      if (response.ok) { this.setState({success: true})
      }else{
        this.setState({success: false})
      }
      return response.json()

    }).then((data) => {
      //Success or Validations
      if(this.state.success){
        this.addNewEvent(data)
        this.resetFormErrors()
      }else{
        this.setState({ formErrors: data })
        throw data;
      }

    }).catch(error => {
      //Show error
      console.error("error", error)

    })

    e.preventDefault();
  }

  resetFormErrors(){
    this.setState({ formErrors: {} })
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
        <FormErrors formErrors = { this.state.formErrors }/>
        <EventForm handleSubmit={this.handleSubmit}
          handleInput={this.handleInput}
          title={this.state.title}
          datetime={this.state.datetime}
          location={this.state.location}
        />
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
