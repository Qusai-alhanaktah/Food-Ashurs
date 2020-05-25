// import jwt from 'jsonwebtoken';
import React from 'react';
import { AsyncStorage } from 'react-native';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGUP = 'LOGUP';
export const KEEP_IN = 'KEEP_IN';
// const base64 = require('base-64');
import base64 from 'react-native-base64'

export const logUp = (newUser) => dispatch => {
  console.log('user at action line 11', newUser);
  
    fetch('https://food--ashurs.herokuapp.com/signup', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: newUser ? JSON.stringify(newUser) : undefined,
    })
    .then(response =>  response.text())
    .then(token =>{
      console.log('token at action line 21', token);
      dispatch ({
        type: LOGUP,
        payload: {token: token, loggedIn: true, loading: false, user:newUser},
      });
      let storage = [['user', JSON.stringify(newUser)], ['access_token', token]];
          AsyncStorage.multiSet(storage, (error)=> {
              if(error) alert("error!");
              else alert("Welcome "+ newUser.username +" !");
          });

    });
};
export const logOut = () => dispatch => {
  AsyncStorage.clear();
  dispatch ({
    type: LOGOUT,
    payload: {token:null, loggedIn: false, loading: false, user:{}},
  });
};

export const logIn = (username, password) => dispatch => {
  console.log('username',username, 'password',password); 
  var headers = new Headers();
  headers.append("Authorization", "Basic " + base64.encode(`${username}:${password}`));
  fetch('https://food--ashurs.herokuapp.com/signin', {
    method: 'post',
    mode: 'cors',
    cache: 'no-cache',
    headers: new Headers({
           "Authorization": "Basic " + base64.encode(`${username}:${password}`),
          }),
  })
    .then(response =>  {
      console.log('response',response); 
      response.text()
    })
    // .then(token =>{
    //   console.log('token',token); 
    //   fetch('https://food--ashurs.herokuapp.com/users')
    //   .then(res => { 
    //     console.log('res',res);  
    //     // res.json()
    //   })
      // .then(data => {
      //   console.log('data',data); 
      //   const newUser = data.filter(user => (username === user.username && password === user.password))
      //   dispatch ({
      //     type: LOGIN,
      //     payload: {token: token, loggedIn: true, loading: false, user:newUser[0]},
      //   });
      //     let storage = [['user', JSON.stringify(newUser)], ['access_token', token]];
      //     AsyncStorage.multiSet(storage, (error)=> {
      //         if(error) alert("error!");
      //         else alert("Welcome "+ newUser.username +" !");
      //     });
      // });
    // });
};







// export const logIn = (username, password) => dispatch => {
//   fetch('https://food--ashurs.herokuapp.com/signin', {
//     method: 'post',
//     mode: 'cors',
//     cache: 'no-cache',
//     headers: new Headers({
//       'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
//     }),
//   })
//     .then(response =>  response.text())
//     .then(token => validateToken(token))
//     .then(data =>
//       dispatch ({
//         type: LOGIN,
//         payload: data,
//       }),
//     );
// };
// export const logUp = (username, password, email, role) => dispatch => {
//   let newBody = {username, password, email, role};
//   fetch('https://food--ashurs.herokuapp.com/signup', {
//     method: 'post',
//     mode: 'cors',
//     cache: 'no-cache',
//     headers: { 'Content-Type': 'application/json' },
//     body: newBody ? JSON.stringify(newBody) : undefined,
//   })
//     .then(response =>  response.text())
//     .then(data => generateToken(newBody))
//     .then(data =>
//       dispatch ({
//         type: LOGUP,
//         payload: data,
//       }),
//     );
// };
// const generateToken = user => {
//   let userData = {
//     username: user.username,
//     userEamil: user.email,
//     capabilities: user.role,
//   };
//   let token = jwt.sign(userData, 'ashurFood');
//   return setLoginState(true, token, userData);
// };

// const validateToken = token =>{
//   try {
//     let user = jwt.verify(token, 'ashurFood');
//     return setLoginState(true, token, user);
//   } catch {
//     console.error('token invalid');
//     return setLoginState(false, null, {});
//   }
// };
// const setLoginState = (loggedIn, token, user) =>{
// //   cookie.save('auth', token);
//   return({token, loggedIn, user,loading: false});
// };
// export const logOut = () => dispatch => {
//   dispatch ({
//     type: LOGOUT,
//     payload: setLoginState(false, null, {}),
//   });
// };
// export const keepIn = (token)=> dispatch => {
//   dispatch ({
//     type: KEEP_IN,
//     payload: validateToken(token),
//   });
// };

