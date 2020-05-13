import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image } from 'react-native';

export default function Footer() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>CopyRight@Qusai-AL-hanaktah</Text>   
        </View>
    )
}
const styles = StyleSheet.create({
    container: {position:'absolute', bottom: 0, marginHorizontal: 100},
    text: {textAlign: 'center',},
});
