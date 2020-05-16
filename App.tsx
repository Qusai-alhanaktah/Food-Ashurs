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
import AboutUs from './component/about-us.js';
import Profile from './component/profile.js';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
useEffect(()=>{
  AsyncStorage.multiGet(['access_token', 'user']).then((userSession) => {
    setToken(userSession[0][1]);
    setUser(JSON.parse(userSession[1][1]));
    console.log(user);
    console.log(token);
  });
}, [])
const userAccess = ()=> {
if(user.role === 'donor') return(
  <Drawer.Navigator>
    <Drawer.Screen name='Home' component={Donor} options={{title: 'Donor'}} />
    <Drawer.Screen name='Profile' component={Profile}  />
    <Drawer.Screen name='AboutUs' component={AboutUs}  />
  </Drawer.Navigator>);
else if(user.role === 'recipient') return(
  <Drawer.Navigator>
    <Drawer.Screen name='Home' component={Recipient} options={{title: 'Recipient'}} />
    <Drawer.Screen name='Profile' component={Profile}  />
    <Drawer.Screen name='AboutUs' component={AboutUs}  />
  </Drawer.Navigator>);
}
const Auth = ()=> 
<Stack.Navigator>
<Stack.Screen name='Home' component={SignIn} options={{title: 'Sign In', headerStyle:{backgroundColor:'gray'}, headerTintColor:'white'}}/>
<Stack.Screen name='SignUp' component={SignUp} options={{title: 'Sign Up'}}/>
</Stack.Navigator>

return( 
<NavigationContainer >
    { token ? ( userAccess ) : ( Auth) }
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
