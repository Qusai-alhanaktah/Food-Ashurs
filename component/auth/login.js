/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../action/authAction.js';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';

const If = props => {
  return props.condition ? props.children : null;
};


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userDetails: {},
      isUserLoggedIn: false,
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.logIn(this.state.username, this.state.password);
    e.target.reset();
  }

  render() {
    return (
      <>
        <If condition={!this.props.loggedIn}>
          <form onSubmit={this.handleSubmit}>
            <View >
              <Text >Username</Text>
              <TextInput name="username" type="user"  placeholder="Enter your name" onChange={this.handleChange}/>
            </View>
            <View >
              <Text >Password</Text>
              <TextInput name="password" type="password"  data-type="password" placeholder="Enter your password" onChange={this.handleChange}/>
            </View>
              <Button title='Log In!'/>
          </form>
        </If>
      </>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.authReducer.loggedIn,
  loading: state.authReducer.loading,
  user: state.authReducer.user,
});
const mapDispatchToProps = { logIn };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;
