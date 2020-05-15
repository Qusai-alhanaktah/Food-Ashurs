// import jwt from "react-native-pure-jwt";


export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGUP = 'LOGUP';
export const KEEP_IN = 'KEEP_IN';



export const logIn = (username, password) => dispatch => {
  fetch('https://food--ashurs.herokuapp.com/signin', {
    method: 'post',
    mode: 'cors',
    cache: 'no-cache',
    headers: new Headers({
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
    }),
  })
    .then(response =>  response.text())
    .then(token => validateToken(token))
    .then(data =>
      dispatch ({
        type: LOGIN,
        payload: data,
      }),
    );
};
export const logUp = (username, password, email, role) => dispatch => {
  let newBody = {username, password, email, role};
  fetch('https://food--ashurs.herokuapp.com/signup', {
    method: 'post',
    mode: 'cors',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: newBody ? JSON.stringify(newBody) : undefined,
  })
    .then(response =>  response.text())
    .then(data => generateToken(newBody))
    .then(data =>
      dispatch ({
        type: LOGUP,
        payload: data,
      }),
    );
};
const generateToken = user => {
  let userData = {
    username: user.username,
    userEamil: user.email,
    capabilities: user.role,
  };
  let token = jwt.sign(userData, 'ashurFood');
  return setLoginState(true, token, userData);
};

const validateToken = token =>{
  try {
    let user = jwt.verify(token, 'ashurFood');
    return setLoginState(true, token, user);
  } catch {
    console.error('token invalid');
    return setLoginState(false, null, {});
  }
};
const setLoginState = (loggedIn, token, user) =>{
//   cookie.save('auth', token);
  return({token, loggedIn, user,loading: false});
};
export const logOut = () => dispatch => {
  dispatch ({
    type: LOGOUT,
    payload: setLoginState(false, null, {}),
  });
};
export const keepIn = (token)=> dispatch => {
  dispatch ({
    type: KEEP_IN,
    payload: validateToken(token),
  });
};