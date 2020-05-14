import React from 'react';
import jwt from 'jsonwebtoken';


export const logInContext = React.createContext();

class logInProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      loading: false,
      logIn: this.logIn,
      logout: this.logout,
      logUp: this.logUp,
      user: {},
    };
  }

  logIn = (username, password) =>{

    fetch(`${API}/signin`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      }),
    })
      .then(response =>  response.text())
      .then(token => this.validateToken(token))
      .catch(console.error);
    this.setState({loading:true});

  }


  logUp = (username, password, email, role) =>{
    console.log(username, password,  email, role);

    let newbody = {username, password, email, role};
    return fetch(`${API}/signup`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: newbody ? JSON.stringify(newbody) : undefined,
    })

      .then( response => {
        if (response.status === 200) this.genarateToken(newbody);
        else alert('This user is user');
      })
      .catch(console.error);
  }

  genarateToken = user => {

    let userData = {
      username: user.username,
      userEamil: user.email,
      capabilities: user.role,
    };
    let token = jwt.sign(userData, 'ashurFood');
    this.setlogInState(true, token, user);
    // this.validateToken(token);
    // console.log('token', token);
    
  }

  validateToken = token =>{
    try {
      let user = jwt.verify(token, 'ashurFood');
      this.setlogInState(true, token, user);
    } catch {
      this.setlogInState(false, null, {});
      // alert('wrong password/username');
      console.error('token invalid');
    }
  }
  setlogInState = (loggedIn, token, user) =>{
    cookie.save('auth', token);
    this.setState({token, loggedIn, user});
    console.log('this.state',this.state);
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.setState({ loading: false});
  }

    logout = () =>  this.setlogInState(false, null, {});

    componentDidMount(){
      const qs = new URLSearchParams(window.location.search);
      const cookieToken = cookie.load('auth');
      const token = qs.get('token') || cookieToken || null;
      this.validateToken(token);
    }

}

export default logInProvider;