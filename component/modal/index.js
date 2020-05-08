/* eslint-disable no-unused-vars */
import React from 'react';
import logo from '../../assets/logo-popup-.png';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const Modal = props => {
  return (
    <View >
      <View >
        <View >
          <Text >{props.title}</Text>
          <Button onClick={props.close} >X</Button>
        </View>
        <View >{props.children}</View>
      </View>
    </View>
  );
};

export default Modal;