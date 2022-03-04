import React from 'react'

class EventForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      title: '',
      datetime: '',
      location: ''
    }
    // this.handleInput = this.handleInput.bind(this);
  }

  // handleInput(event) {    with arrow function we avoid the 'bind(this)'
  handleInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const newState = {};
    newState[name] = event.target.value;
    this.setState(newState);
  }

  render (){
    return (
      <div>
        <h4>Create an event:</h4>
        <form>
          <input type="text" name="title"    placeholder='Title'    value={this.state.title}    onChange={this.handleInput} />
          <input type="date" name="datetime" placeholder='Date'     value={this.state.datetime} onChange={this.handleInput} />
          <input type="text" name="location" placeholder='Location' value={this.state.location} onChange={this.handleInput} />
          <button type="submit">Create event</button>
        </form>
      </div>
    )
  }
}

export default EventForm