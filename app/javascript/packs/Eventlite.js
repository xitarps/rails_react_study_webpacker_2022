import React from 'react'
import ReactDom from 'react-dom'

import EventList from './EventList';
import EventForm from './EventForm'
import FormErrors from './FormErrors';

import validations from '../validations';
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

  static formValidations =  {
    title: [
      (value) => { return(validations.checkMinLength(value, 3)) }
    ],
    datetime: [
      (value) => { return(validations.checkMinLength(value, 1)) },
      (value) => { return(validations.timeShouldBeInTheFuture(value)) }
    ],
    location: [
      (value) => { return(validations.checkMinLength(value, 1)) }
    ]
  }

  handleInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const newState = {};
    newState[name] = {...this.state[name], value: value};
    this.setState(newState, () => this.validateField(name, value, Eventlite.formValidations[name]));
  }

  validateField(fieldName, fieldValue, fieldValidations) {
    let fieldValid = true
    let errors = fieldValidations.reduce((errors, validation)=>{
      let [valid, fieldError] = validation(fieldValue);
      if(!valid){
        errors = errors.concat(fieldError)
      }
      return errors
    }, [] );

    fieldValue = errors.length === 0;

    const newState = {formErrors: {...this.state.formErrors, [fieldName]: errors}}
    newState[fieldName] = {...this.state[fieldName], valid: fieldValid}

    this.setState(newState, this.validateForm)
  }

  validateForm() {
    this.setState({formValid: this.state.title.valid && 
                              this.state.datetime.valid &&
                              this.state.location.valid
                  })
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
