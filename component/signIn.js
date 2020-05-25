import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, Image } from 'react-native';
import { connect } from 'react-redux';
import { logIn } from './action.js';
// import { AsyncStorage } from 'react-native';


function SignIn(props) {

    const [user, setUser] = useState({});

    const signIn = e => {
        props.logIn( user.username , user.password)
        setUser({});
    }

    return (
        <View style={styles.container}>
            <Text>User Name: </Text>
            <TextInput  placeholder='Type Your UserName'  style={styles.input} onChangeText={value => setUser({...user, 'username': value})}/>
            <Text>Password: </Text>
            <TextInput  placeholder='Type Your Password'  style={styles.input}  onChangeText={value => setUser({...user, 'password': value})}/>
            <Button style={styles.button} onPress={() => signIn()}  title="Sign In"  color="black" />
        <Text>I don't have an account</Text>
        <Button onPress={()=> props.navigation.navigate('SignUp')} title="Create One" color='gray'/>
        </View>
    )
}
const mapStateToProps = state => ({
    user: state.authReducer.user,
    loggedIn: state.authReducer.loggedIn,
    loading: state.authReducer.loading,
  });
  const mapDispatchToProps = { logIn };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

  
const styles = StyleSheet.create({
    container: {textAlign: 'center', marginTop:0,backgroundColor:'#696e78'},
    title: {textAlign: 'center', fontSize: 30, marginVertical: 30},
    input:{ fontSize: 15},
    button: {flex:1 ,flexDirection: 'row', justifyContent: 'space-between', width: 50},
    text: {textAlign: 'center',}
});
