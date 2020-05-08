/* eslint-disable no-unused-vars */
import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { logUp } from '../../action/authAction.js';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const If = props => {
  return props.condition ? props.children : null;
};

class Logup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      role: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.logUp(this.state.username, this.state.password, this.state.email, this.state.role);
    e.target.reset();
  }
  responseGoogle1 = (response) => {
    this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
    this.props.logUp(response.profileObj.givenName, response.profileObj.googleId,  response.profileObj.email, 'recipient');
  };

 responseGoogle2 = (response) => {
   this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
   this.props.logUp(response.profileObj.givenName, response.profileObj.googleId,  response.profileObj.email, 'donor');
 }
 render() {
   return (
     <>
       <If condition={!this.props.loggedIn}>
         <form onSubmit={this.handleSubmit} >
           <View >
             <Text >Username</Text>
             <TextInput name="username" type="text"  placeholder="enter your name" onChange={this.handleChange}/>
           </View>
           <View >
             <Text >Password</Text>
             <TextInput name="password" type="password" data-type="password" placeholder="Enter your password" onChange={this.handleChange}/>
           </View>
           <View >
             <Text >Email Address</Text>
             <TextInput name="email" type="email"  placeholder="username@gmail.com" onChange={this.handleChange}/>
           </View>
           <View >
             <Text>
               <TextInput type='radio' name="role" value='donor' onClick={this.handleChange} required/>DONOR
             </Text>
             <Text>
               <TextInput type='radio' name="role" value='recipient' onClick={this.handleChange}  required/> RECIPIENT
             </Text>
           </View>
           <View  >
             <TextInput type="submit"  value="Sign Up"/>
           </View>
           <View >
             {!this.props.loggedIn && (
               <GoogleLogin
                 clientId="729663215177-d2uq3c446ce2gfkoopbuhm4debo4crvf.apps.googleusercontent.com"
                 render={renderProps => (
                   <Button
                     className="fa fa-google button-google"
                     onClick={renderProps.onClick}
                     disabled={renderProps.disabled}
                   >
                        SIGN UP AS A RECIPIENT
                   </Button>
                 )}
                 onSuccess={this.responseGoogle1}
                 onFailure={this.responseGoogle1}
               />
             )}
             {!this.props.loggedIn && (
               <GoogleLogin
                 clientId="729663215177-d2uq3c446ce2gfkoopbuhm4debo4crvf.apps.googleusercontent.com"
                 render={renderProps => (
                   <Button
                     className="fa fa-google button-google"
                     onClick={renderProps.onClick}
                     disabled={renderProps.disabled}
                   >
                        SIGN UP AS A DONOR
                   </Button>
                 )}
                 onSuccess={this.responseGoogle2}
                 onFailure={this.responseGoogle2}
               />
             )}
           </View>
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
const mapDispatchToProps = { logUp };

export default connect(mapStateToProps, mapDispatchToProps)(Logup);