import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { logIn, logUp } from './action.js';
import { AsyncStorage } from 'react-native';

const role = [
  {label: 'Donor', value: 'donor'},
  {label: 'Recipient', value: 'recipient'},
]

function SingForm(props) {

    const [newUser, setNewUser] = useState({});
    const [user, setUser] = useState({});
    const [showSingUpForm, setShowSingUpForm] = useState(false);
    const [showSingInForm, setShowSingInForm] = useState(false);


    const signUp =  () => {
        fetch('https://food--ashurs.herokuapp.com/signup', {
            method: 'post',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: newUser ? JSON.stringify(newUser) : undefined,
        })
        .then(response =>  response.text())
        .then(data => AsyncStorage.setItem('authToken', data))
        .then( ()=> console.log('loggedIn'))
        setNewUser({});
    }
    const signIn = e => {
        alert('hello'+ user.username + user.password);
        setUser({});
        props.logIn( newUser.username , newUser.password)
    }

    return (
        <View style={styles.container}>
            <Button style={styles.button} onPress={()=> setShowSingUpForm(true)} title='Create an Acount' color='gray'/>
            <Button style={styles.button} onPress={()=> setShowSingInForm(true)} title='Log In' color='gray'/>
        <Modal visible={showSingUpForm}>
        <Button onPress={()=> setShowSingUpForm(false)} title='x' color='gray'/>
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
            <Button style={styles.button} onPress={() => {signUp(); setShowSingUpForm(false)}}  title="Sign Up"  color="black" />
        </Modal>
        <Modal visible={showSingInForm}>
        <Button onPress={()=> setShowSingInForm(false)} title='x' color='gray'/>
            <Text>User Name: </Text>
            <TextInput  placeholder='Type Your UserName'  style={styles.input} onChangeText={value => setUser({...user, 'username': value})}/>
            <Text>Password: </Text>
            <TextInput  placeholder='Type Your Password'  style={styles.input}  onChangeText={value => setUser({...user, 'password': value})}/>
            <Button style={styles.button} onPress={() => {signIn(); setShowSingInForm(false)}}  title="Sign In"  color="black" />
        </Modal>
        </View>
    )
}
const mapStateToProps = state => ({
    loggedIn: state.authReducer.loggedIn,
    loading: state.authReducer.loading,
    user: state.authReducer.user,
  });
  const mapDispatchToProps = { logIn, logUp };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingForm);

  
const styles = StyleSheet.create({
    container: {textAlign: 'center', marginTop:0,backgroundColor:'#696e78'},
    title: {textAlign: 'center', fontSize: 30, marginVertical: 30},
    input:{ fontSize: 15},
    button: {flex:1 ,flexDirection: 'row', justifyContent: 'space-between', width: 50},
    text: {textAlign: 'center',}
});
