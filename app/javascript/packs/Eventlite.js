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
      title: {value: '', valid: false},
      datetime: {value: '', valid: false},
      location: {value: '', valid: false},
      formErrors: {},
      success: false,
      formValid: false
    }
  }


  // handleInput(event) {    with arrow function we avoid the 'bind(this)'
  handleInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const newState = {};
    newState[name] = {...this.state[name],value: event.target.value};
    this.setState(newState, this.validateForm);
  }

  validateForm() {
    let formErrors = {}
    let formValid = true
    if(this.state.title.value.length <= 2) {
      formErrors.title = ["is too short (minimum is 3 characters)"]
      formValid = false
    }
    if(this.state.location.value.length === 0) {
      formErrors.location = ["can't be blank"]
      formValid = false
    }
    if(this.state.datetime.value.length === 0) {
      formErrors.datetime = ["can't be blank"]
      formValid = false
    } else if(Date.parse(this.state.datetime.value) <= Date.now()) {
      formErrors.datetime = ["can't be in the past"]
      formValid = false
    }
    this.setState({formValid: formValid, formErrors: formErrors})
  }

  handleSubmit = (e) =>{
    // Grab the CSRF token from the meta tag
    let newEvent = {title:    this.state.title.value,
                    datetime: this.state.datetime.value,
                    location: this.state.location.value
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
          formValid={this.state.formValid}
          title={this.state.title.value}
          datetime={this.state.datetime.value}
          location={this.state.location.value}
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
