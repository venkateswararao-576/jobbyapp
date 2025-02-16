import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errormsg: ''}

  updatename = event => {
    this.setState({username: event.target.value})
  }

  updatepassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onfailure = msg => {
    this.setState({errormsg: msg})
  }

  savedetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
      this.setState({username: '', password: '', errormsg: ''})
    } else {
      this.onfailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errormsg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.savedetails}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <label className="label" htmlFor="name">
            USERNAME
          </label>
          <input
            type="text"
            value={username}
            id="name"
            placeholder="Username"
            className="user-input"
            onChange={this.updatename}
          />
          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            className="password-input"
            onChange={this.updatepassword}
          />
          <button className="login-button" type="submit">
            Login
          </button>
          <p className="error">{errormsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
