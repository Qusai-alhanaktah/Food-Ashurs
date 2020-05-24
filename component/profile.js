import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';

export default function Profile(props) {
  const [user, setUser] = useState({});
  const [showUser, setShowUser] = useState(false);

  useEffect(()=>{
    AsyncStorage.getItem('user').then(userInfo => {
      console.log('userInfo', typeOf(userInfo));
      setUser(JSON.parse(userInfo));
      setShowUser(true)
    })
  });
  
    return (
        <>
        {showUser && (
        <View style={styles.container}>
          <Text>Hello {user.username}</Text>
          <Text>You enter as: {user.role}</Text>  
          <Text>Your Email is: {user.email}</Text>  
        </View>
        )}
        </>
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
  