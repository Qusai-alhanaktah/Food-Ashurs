import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// import { connect } from 'react-redux';
// import { logUp } from './action.js';
import { AsyncStorage } from 'react-native';

const role = [
  {label: 'Donor', value: 'donor'},
  {label: 'Recipient', value: 'recipient'},
]

export default function SignUp(props) {

    const [newUser, setNewUser] = useState({});

    const signUp =  () => {
        fetch('https://food--ashurs.herokuapp.com/signup', {
            method: 'post',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: newUser ? JSON.stringify(newUser) : undefined,
        })
        .then(response =>  response.text())
        .then(data => AsyncStorage.setItem('authToken', data));
        AsyncStorage.setItem('user', newUser)
        setNewUser({});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity>
            <Text>User Name: </Text>
            <TextInput  placeholder='Type Your UserName'  style={styles.input}  onChangeText={value => setNewUser({...newUser, 'username': value})}/>
            <Text>Password: </Text>
            <TextInput  placeholder='Type Your Password'  style={styles.input}  onChangeText={value => setNewUser({...newUser, 'password': value})}/>
            <Text>Email: </Text>
            <TextInput  placeholder='Type Your Email'  style={styles.input}  onChangeText={value => setNewUser({...newUser, 'email': value})}/>
            <Text>Food Type: </Text>
            <RadioForm
                radio_props={role}
                initial={-1}
                onPress={ value => setNewUser({...newUser, 'role': value})}
                buttonSize={20}
                buttonOuterSize={25}
                selectorButtonColor={'green'}
              />
            <Button style={styles.button} onPress={() => {signUp(); }}  title="Sign Up"  color="black" />
            </TouchableOpacity>
            <Text>I have an account</Text>
            <Button onPress={()=> props.navigation.navigate('Home')} title="Log In" color='gray'/>

        </View>
    )
}
// const mapStateToProps = state => ({
//     loggedIn: state.authReducer.loggedIn,
//     loading: state.authReducer.loading,
//     user: state.authReducer.user,
//   });
//   const mapDispatchToProps = { logUp };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

  
const styles = StyleSheet.create({
    container: {textAlign: 'center', marginTop:0,backgroundColor:'#696e78'},
    title: {textAlign: 'center', fontSize: 30, marginVertical: 30},
    input:{ fontSize: 15},
    button: {flex:1 ,flexDirection: 'row', justifyContent: 'space-between', width: 50},
    text: {textAlign: 'center',}
});
