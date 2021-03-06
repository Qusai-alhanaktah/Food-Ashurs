import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { logUp } from './action.js';
import logo from '../assets/logo.jpg'

const role = [
  {label: 'Donor', value: 'donor'},
  {label: 'Recipient', value: 'recipient'},
]

function SignUp (props) {

    const [newUser, setNewUser] = useState({});
    
  const signUp =  () => {
    if(newUser.username && newUser.password && newUser.email && newUser.role){
      props.logUp(newUser);
      setNewUser({});
    }else alert('You have to fill the form')
  }

    return (
      <View style={styles.container}>
            <Text style={styles.title}>Food Ashur's</Text>
            <Image source={logo} style={styles.logo}/>
            <TouchableOpacity style={styles.form}>
              <Text style={styles.text}>User Name: </Text>
              <TextInput  placeholder='Type Your UserName'  style={styles.input}  onChangeText={value => setNewUser({...newUser, 'username': value})}/>
              <Text  style={styles.text}>Password: </Text>
              <TextInput  placeholder='Type Your Password'  style={styles.input}  onChangeText={value => setNewUser({...newUser, 'password': value})}/>
              <Text style={styles.text}>Email: </Text>
              <TextInput  placeholder='Type Your Email'  style={styles.input}  onChangeText={value => setNewUser({...newUser, 'email': value})}/>
              <Text style={styles.text}>Food Type: </Text>
              <RadioForm
                  radio_props={role}
                  initial={-1}
                  onPress={ value => setNewUser({...newUser, 'role': value})}
                  buttonSize={20}
                  buttonOuterSize={25}
                  selectorButtonColor={'green'}
                />
              <View style={styles.button} >
                <Button onPress={() => {signUp(); }}  title="Sign Up"  />
              </View>
            </TouchableOpacity>
            <View style={styles.switchPage}>
               <Text style={styles.switch1}>I have an account, let's</Text>
               <Text style={styles.switch2} onPress={()=> props.navigation.navigate('SignIn')} >Log In</Text>
            </View>
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
  
    container: {textAlign: 'center',    
    flex: 1,
    backgroundColor: '#81c784',
    },
    form: {flex: 1, justifyContent: 'center', padding: 20, marginBottom: 50},
    text: {fontSize: 20, fontWeight: 'bold'},
    button: {color: '#00695c',  width: 370,  alignItems: 'center',    },
    title:{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 10,},
    input: {borderStyle: 'solid', borderWidth: 1, borderRadius: 20, backgroundColor: 'white', fontSize: 15, color: 'blue', textAlign: 'center', },
    switchPage: {
      flex: 1,
      flexDirection: 'row',
      textAlign: 'center', fontSize: 20, marginBottom: -180},
    switch1: {flex: 0.5, marginLeft: 90,},
    switch2: {flex: 0.5, marginLeft: -35, color: 'blue', },
    logo: { width:100, height:100, marginLeft: 150, marginBottom: -20}

});