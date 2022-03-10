import React from 'react'
import PropTypes from "prop-types";

const EventForm = (props) => (
  <div>
    <h4>Create an Event:</h4>
    <form onSubmit={props.handleSubmit}>
      <input type="text"           name="title"          placeholder="Title"    value={props.title}           onChange={props.handleInput} />
      <input type="datetime-local" name="datetime"       placeholder="Date"     value={props.datetime}  onChange={props.handleInput} />
      <input type="text"           name="location"       placeholder="Location" value={props.location}        onChange={props.handleInput} />
      <input type="submit"                                                      value="Create Event"          disabled={!props.formValid}  />
    </form>
  </div>
)

EventForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInput:  PropTypes.func.isRequired,
  formValid:    PropTypes.bool.isRequired,
  title:        PropTypes.string.isRequired,
  datetime:     PropTypes.string.isRequired,
  location:     PropTypes.string.isRequired
}

export default EventForm