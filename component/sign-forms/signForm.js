/* eslint-disable no-unused-vars */
import React from 'react';
import SignInForm from '../auth/login.js';
import SignUpForm from '../auth/logup.js';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const If = props => {
  return props.condition ? props.children : null;
};
class Form extends React.Component{
  render(){
    return (
      <React.Fragment>
        <If condition={this.props.loggedIn}>
          <Button onClick={this.props.logout} >Log Out!</Button>
        </If>

        <If condition={!this.props.loggedIn}>
            <View >
              <Button onClick={this.props.close} >X</Button>
              <View >
                <TextInput id="tab-1" type="radio" name="tab" /><Text >Sign In</Text>
                <TextInput id="tab-2" type="radio" name="tab" /><Text >Sign Up</Text>
                <View >
                  <SignUpForm/>
                  <SignInForm/>
                </View>
              </View>
            </View>
        </If>
      </React.Fragment>
    );

  }
}
const mapStateToProps = state => ({
  loggedIn: state.authReducer.loggedIn,
  loading: state.authReducer.loading,
  user: state.authReducer.user,
});
const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Form);
