import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { logUp } from './action.js';

const role = [
  {label: 'Donor', value: 'donor'},
  {label: 'Recipient', value: 'recipient'},
]

function SignUp (props) {

    const [newUser, setNewUser] = useState({});
    
  const signUp =  () => {
        if(newUser.username && newUser.password && newUser.email && newUser.role){
        // fetch('https://food--ashurs.herokuapp.com/signup', {
        //     method: 'post',
        //     mode: 'cors',
        //     cache: 'no-cache',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: newUser ? JSON.stringify(newUser) : undefined,
        // })
        // .then(response =>  response.text())
        // .then(token =>{
        //     let storage = [['user', JSON.stringify(newUser)], ['access_token', token]];
        //         AsyncStorage.multiSet(storage, (error)=> {
        //             if(error) alert("error!");
        //             else alert("Welcome "+ newUser.username +" !");
        //         });  
        // });
        props.logUp(newUser);
        setNewUser({});
        // props.navigation.navigate('App')
    }else alert('You have to fill the form')
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
            <Text onPress={()=> props.navigation.navigate('SignIn')} >I have an account</Text>
            {/* <Button onPress={()=> props.navigation.navigate('SignIn')} title="Log In" color='gray'/> */}

        </View>
    )
}
const mapStateToProps = state => ({
    user: state.authReducer.user,
    loggedIn: state.authReducer.loggedIn,
    loading: state.authReducer.loading,
  });
const mapDispatchToProps = { logUp };
  
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
  
const styles = StyleSheet.create({
    container: {textAlign: 'center', marginTop:0,backgroundColor:'#696e78'},
    title: {textAlign: 'center', fontSize: 30, marginVertical: 30},
    input:{ fontSize: 15},
    button: {flex:1 ,flexDirection: 'row', justifyContent: 'space-between', width: 50},
    text: {textAlign: 'center',}
});