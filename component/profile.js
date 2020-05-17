import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, TouchableOpacity } from 'react-native';

export default function Profile(props) {
    return (
        <View style={styles.container}>
          <Text>Hello {props.route.params.username}</Text>
          <Text>You enter as: {props.route.params.role}</Text>  
          <Text>Your Email is: {props.route.params.email}</Text>  

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  