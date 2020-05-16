import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, TouchableOpacity } from 'react-native';

export default function AboutUs(props) {
    return (
        <View style={styles.container}>
          <Text>My Name Is: Qusai Al-hanaktah</Text>  
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
  