import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logIn } from './action.js';


function SignIn(props) {

    const [user, setUser] = useState({});

    const signIn = e => {
        props.logIn( user.username , user.password)
        setUser({});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Food Ashur's</Text>
            <TouchableOpacity style={styles.form}>
              <Text style={styles.text}>User Name: </Text>
              <TextInput  placeholder='Type Your UserName'  style={styles.input} onChangeText={value => setUser({...user, 'username': value})}/>
              <Text style={styles.text}>Password: </Text>
              <TextInput  placeholder='Type Your Password'  style={styles.input}  onChangeText={value => setUser({...user, 'password': value})}/>
              <View style={styles.button}>
                <Button onPress={() => signIn()}  title="Sign In"  />
              </View>
            </TouchableOpacity>
            <View>
               <Text style={styles.switch1}>I Don't have an account, let's<Text style={styles.switch2} onPress={()=> props.navigation.navigate('SignUp')}> Sign Up</Text></Text>
            </View>
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
  
    container: {textAlign: 'center',    
    flex: 1,
    backgroundColor: '#81c784',
    },
    form: { justifyContent: 'center', padding: 20, marginVertical: 100},
    text: {fontSize: 20, fontWeight: 'bold'},
    button: {color: '#00695c',  width: 370,  alignItems: 'center',     },
    title:{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 30,},
    input: {borderStyle: 'solid', borderWidth: 1, borderRadius: 20, backgroundColor: 'white', fontSize: 15, color: 'blue', textAlign: 'center', marginBottom: 20 },
    switch2: {  textAlign: 'center', color: 'blue', },
    switch1: {textAlign: 'center',}
});
