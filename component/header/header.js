/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import {Link , NavLink} from 'react-router-dom';
import SignForm from '../sign-forms/signForm.js';
import $ from 'jquery';
import {When} from '../if/index.js';
import { logOut } from '../../action/authAction.js';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

window.$ = window.jQuery = require('jquery');

const If = props => {
  return props.condition ? props.children : null;
};

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isToggle : false,
      showSignForm : false,
    };
  }

  handleClick = () =>{
    $(document).ready(function() {
      $(document).delegate('.open', 'click', function(event){
        $(this).addClass('oppenned');
        event.stopPropagation();
      });
      $(document).delegate('body', 'click', function(event) {
        $('.open').removeClass('oppenned');
      });
      $(document).delegate('.cls', 'click', function(event){
        $('.open').removeClass('oppenned');
        event.stopPropagation();
      });
    });
  };
  handleSignClick =() => {
    this.setState(state =>({showSignForm : true}));
  }
  closeSignForm =() => {
    this.setState(state =>({showSignForm : false}));
  }

  render(){

    return (
      <>
        <View >
          { this.props.loggedIn && (
            <View  onClick={this.handleClick}>
              <View>
                <ul >
                  <li>
                    <a href="#header" >Home</a>
                  </li>
                  <li>
                    <NavLink href="#header" to='/profile'>Profile</NavLink>
                  </li>
                  <li>
                    <a href="#team-section" title="aboutUs">About Us</a>
                  </li>
                  <li>
                    <If condition={this.props.loggedIn}>
                      <a href="/" onClick={this.props.logOut} >Log Out!</a>
                    </If>
                    <If condition={!this.props.loggedIn}>
                      <a href="/" onClick={this.handleSignClick}>Log In</a>
                    </If>
                  </li>
                </ul>
              </View>
            </View>
          )}
        </View>
        <When condition={this.state.showSignForm}>
          <SignForm close={this.closeSignForm}  />
        </When>
        <If condition={!this.props.loggedIn}>
          <Button
           onClick={this.handleSignClick} >
            SignIn</Button>
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
const mapDispatchToProps = {logOut};

export default connect(mapStateToProps, mapDispatchToProps)(Header);