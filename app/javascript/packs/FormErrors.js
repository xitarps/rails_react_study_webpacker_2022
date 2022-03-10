import React from "react";
import PropTypes from "prop-types";

function displayErrorsMessages(obj){
  return(Object.keys(obj).map((key)=>{
    return(
      obj[key].map((value)=>{
        let field   = key[0].toUpperCase() + key.slice(1)
        let message = value[0].toUpperCase() + value.slice(1)

        return(<p className="alert"><strong>{ field}</strong>: { message }</p>);
      })
    );
  }));
}

const FormErrors = props =>{
  return(
    <div>
      {displayErrorsMessages(props.formErrors)}
    </div>
  )
}

FormErrors.propTypes = {
  formErrors: PropTypes.object
}


export default FormErrors
