import { Component, Fragment } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import './index.css';
import Header from '../Header/';

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    redirect: false,
  };

  onChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    });
    this.setState({ redirect: true });
  };

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder='rahul@2021'
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder='rahul'
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg, redirect } = this.state;
    const jwtToken = Cookies.get('jwt_token');

    if (jwtToken || redirect) {
      return <Navigate to="/" replace />;
    }

    return (
      <>
      <div className="login-form-container">
        <img
          src="https://www.ewizcommerce.com/wp-content/uploads/2021/12/11-powerful-ways-AI-chatbots-can-transform-your-ecommerce-busines-1.webp"
          className="login-image"
          alt="website login" />
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="bot-heading">AI Chatbot</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
      </>
    );
  }
}

export default Login;
