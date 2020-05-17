import React, {useState, useEffect} from 'react';
import Recipient from './recipient.js';
import Donor from './donor.js';
import AboutUs from './about-us.js';
import Profile from './profile.js';
import SignUp from './signUp.js';
import SignIn from './signIn.js';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();

const If = props => {
  return props.condition ? props.children : null;
};

export default function Auth (props){
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [okToRenderDonor, setOkToRenderDonor] = useState(false);
  const [okToRenderRecipient, setOkToRenderRecipient] = useState(false);


useEffect(()=>{
  AsyncStorage.multiGet(['access_token', 'user']).then((userSession) => {
    setToken(userSession[0][1]);
    setUser(JSON.parse(userSession[1][1]));
    console.log(user);
    console.log(token);
  });
    if(token){
      if(user.role === 'donor') setOkToRenderDonor(true);
      else if(user.role === 'recipient') setOkToRenderRecipient(true);
      else alert('not authorized to do that');
     }
}, []);

    const homeStackScreen  = () =>{ return(
      <Stack.Navigator>
         <Stack.Screen name='SignIn' component={SignIn}  options={{headerShown: false,}}/>
         <Stack.Screen name='SignUp' component={SignUp}  options={{headerShown: false,}}/>
      </Stack.Navigator>
    )}

    const accessScreen = () =>{return (
      user.role === 'donor' ? (
        <Drawer.Navigator>
           <Drawer.Screen name='Donor' component={Donor} options={{title: 'Home'}} />
           <Drawer.Screen name='Profile' component={Profile} initialParams={user} />
           <Drawer.Screen name='AboutUs' component={AboutUs}  />
        </Drawer.Navigator>
      ): user.role === 'recipient' ? (
        <Drawer.Navigator>
          <Drawer.Screen name='Recipient' component={Recipient} options={{title: 'Home'}} />
          <Drawer.Screen name='Profile' component={Profile}  initialParams={user}/>
          <Drawer.Screen name='AboutUs' component={AboutUs}  />
        </Drawer.Navigator>
      ) : ( 
          homeStackScreen()
      )
    )} 
    return (
      <NavigationContainer>
          {token ? (
            homeStackScreen()
          ):(
            accessScreen()
          )}
      </NavigationContainer>
    );
}
