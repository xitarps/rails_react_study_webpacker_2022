import React from 'react'

class Login extends React.Component {

  handleLogin = (e) =>{
    fetch("http://localhost:3000/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.email.value,
        password: this.password.value
      })
    }).then(response => {

      return response.json();

    }).then((data) => {

      console.log(data);

    }).catch(error => {

      console.error("error", error);

    });
    e.preventDefault();
  }

  render () {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={this.handleLogin} >
          <input name="email" ref={(input) => this.email = input } />
          <input name="password" type="password" ref={(input) => this.password = input } />
          <input type="submit" value="Log in" />
        </form>
      </div>
    )
  }
}

export default Login
