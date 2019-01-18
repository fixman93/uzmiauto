import React, { Component } from 'react'

var firebase = require('firebase')

var config = {
  apiKey: "AIzaSyCM2lqMfWg1NNtTf6caURCixXSf5sDuOsw",
  authDomain: "usurvey-3e521.firebaseapp.com",
  databaseURL: "https://usurvey-3e521.firebaseio.com",
  projectId: "usurvey-3e521",
  storageBucket: "usurvey-3e521.appspot.com",
  messagingSenderId: "536079421504"
};
firebase.initializeApp(config);

class Authen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      err: ''
    }
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }

  login(event) {
    const email = this.refs.email.value
    const password = this.refs.password.value
    console.log(email + ' ' + password)
    const auth = firebase.auth()
    const promise = auth.signInWithEmailAndPassword(email, password)
    promise.catch(e => {
      var err = e.message
      console.log(err)
      this.setState({ err })
    })
  }

  signup() {
    const email = this.refs.email.value
    const password = this.refs.password.value
    console.log(email + ' ' + password)
    const auth = firebase.auth()
    const promise = auth.createUserWithEmailAndPassword(email, password)

    promise
      .then(user => {
        var err = "Welcome " + user.user.email
        firebase.database().ref('/users' + user.user.uid).set({
          email: user.user.email
        })
        this.setState({ err: err })
      })
    promise
      .catch(e => {
        var err = e.message
        this.setState({ err: err })
      })
  }
  render() {
    return (
      <div>
        <input id='email' ref='email' type='email' placeholder='Enter your email' />
        <input id='pass' ref='password' type='password' placeholder='Enter your password' />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign In</button>
        <button>Log out</button>
      </div>
    )
  }
}

export default Authen