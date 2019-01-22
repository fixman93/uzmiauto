import React, { Component } from 'react'
import { FirebaseConfig } from "./config/dev";

var firebase = require('firebase')
firebase.initializeApp(FirebaseConfig);

class Authen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      err: ''
    }
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.logout = this.logout.bind(this)
  }

  login(event) {
    const email = this.refs.email.value
    const password = this.refs.password.value
    console.log(email + ' ' + password)
    const auth = firebase.auth()
    const promise = auth.signInWithEmailAndPassword(email, password)
    promise
      .then(user => {
        var err = "Welcome back " + user.user.email
        this.setState({ err })
      })
    promise.catch(e => {
      var err = e.message
      console.log(err)
      this.setState({ err })
    })
    console.log('user: ', promise)
  }

  signup() {
    const email = this.refs.email.value
    const password = this.refs.password.value
    const fullName = this.refs.fullname.value
    console.log(email + ' ' + password)
    const auth = firebase.auth()
    var user = firebase.auth().currentUser;
    const promise = auth.createUserWithEmailAndPassword(email, password)

    promise
      .then(user => {
        var err = "Welcome " + user.user.email
        firebase.database().ref('users/' + user.user.uid).set({
          email: user.user.email
        })
        this.setState({ err: err })
      })
    promise
      .catch(e => {
        var err = e.message
        this.setState({ err: err })
      })
    console.log('dsada', user)
  }

  logout() {
    firebase.auth().signOut()
  }
  render() {
    return (
      <div>
        <input id='email' ref='email' type='email' placeholder='Enter your email' />
        <input id='pass' ref='password' type='password' placeholder='Enter your password' />
        <input id='name' ref='fullname' type='test' placeholder='Enter your full name' />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign In</button>
        <button onClick={this.logout}>Log out</button>
      </div>
    )
  }
}

export default Authen