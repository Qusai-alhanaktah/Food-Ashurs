/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../action/authAction.js';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const If = props => {
  return props.condition ? props.children : null;
};

function Header (){

    return (
      <View>
          <Text>hello</Text>
       </View>
    );
}
const mapStateToProps = state => ({
  loggedIn: state.authReducer.loggedIn,
  loading: state.authReducer.loading,
  user: state.authReducer.user,
});
const mapDispatchToProps = {logOut};

export default connect(mapStateToProps, mapDispatchToProps)(Header);