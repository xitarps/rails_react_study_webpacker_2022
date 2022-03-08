import React from "react";

function displayErrorsMessages(obj){
  return(Object.keys(obj).map((key)=>{
    return(
      obj[key].map((value)=>{
        let field   = key[0].toUpperCase() + key.slice(1)
        let message = value[0].toUpperCase() + value.slice(1)

        return(<p class="alert"><strong>{ field}</strong>: { message }</p>);
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


export default FormErrors
