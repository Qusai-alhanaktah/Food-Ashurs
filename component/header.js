import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, Image } from 'react-native';
import SingForm from './singForm.js';

export default function Header  (){

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Food Ashur's</Text>
            {/* <SingForm /> */}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {textAlign: 'center', marginTop:0, marginBottom:80 },
    title: {textAlign: 'center', fontSize: 30, marginVertical: 30},
    input:{ fontSize: 15},
    button: {padding:20},
    text: {textAlign: 'center',}
});