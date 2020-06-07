import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, Image } from 'react-native';
import { connect } from 'react-redux';
import { logIn } from './action.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { AsyncStorage } from 'react-native';


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
              <Button style={styles.button} onPress={() => signIn()}  title="Sign In"  />
            </TouchableOpacity>
            <View style={styles.switchPage}>
               <Text style={styles.switch1}>I Don't have an account, let's</Text>
               <Text style={styles.switch2} onPress={()=> props.navigation.navigate('SignUp')}>Sign Up</Text>
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
    button: {color: '#00695c',marginVertical: 30 },
    title:{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 30,},
    input: {borderStyle: 'solid', borderWidth: 1, borderRadius: 20, backgroundColor: 'white', fontSize: 15, color: 'blue', textAlign: 'center', marginBottom: 20 },
    switchPage: {
      flex: 1,
      flexDirection: 'row',
      textAlign: 'center', fontSize: 20, marginBottom: -180},
      switch1: {flex: 0.5, marginLeft: 50,},
      switch2: {flex: 0.5, marginLeft: -7, color: 'blue', },
});
