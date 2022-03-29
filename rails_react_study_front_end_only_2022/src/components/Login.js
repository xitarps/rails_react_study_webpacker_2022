import React from 'react'

class Login extends React.Component {

  handleLogin = (e) =>{
    let token = null;
    let client = null;

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
      token = response.headers.get('access-token');
      client = response.headers.get('client');

      return response.json();

    }).then((data) => {

      const uid = data.data.uid
      this.persist_login('user',token, client, uid)
      window.location = '/' // reload to reflect login

    }).catch(error => {

      console.error("error", error);

    });
    e.preventDefault();
  }

  persist_login = (key, token, client, uid)=>{
    localStorage.setItem(key,
      JSON.stringify({
        'access-token': token,
        'client': client,
        'uid': uid
      })
    );
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
