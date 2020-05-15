import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './component/header.js';
import Footer from './component/footer.js';
import Donor from './component/donor.js';
import Recipient from './component/recipient.js';
import logInContext from './component/contextAuth.js';
import SettingsProvider from './component/contextAuth.js';
import Auth from './component/auth.js';
import { Provider } from 'react-redux';
import store from './component/store.js';
import SignUp from './component/signUp.js';
import SignIn from './component/signIn.js';
import { AsyncStorage } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
useEffect(()=>{

  AsyncStorage.getItem('authToken')
  .then(newToken => setToken(newToken));

  AsyncStorage.getItem('user')
  .then(newUser => setUser(newUser));
  console.log(user);
}, [])

  return( 
<NavigationContainer >
{token ? (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Donor} options={{title: 'Donor', headerStyle:{backgroundColor:'gray'}, headerTintColor:'white'}}/>
    </Stack.Navigator>
    ) : (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={SignIn} options={{title: 'Sign In', headerStyle:{backgroundColor:'gray'}, headerTintColor:'white'}}/>
      <Stack.Screen name='SignUp' component={SignUp} options={{title: 'Sign Up'}}/>
    </Stack.Navigator>
  )}
</NavigationContainer>
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
