import React from 'react';
import { connect } from 'react-redux';
import Recipients from './recipient.js';
import Donor from './donor.js';
// import { keepIn } from '../../action/authAction.js';
// import cookie from 'react-cookies';

const If = props => {
  return props.condition ? props.children : null;
};

class Auth extends React.Component{
  constructor(props){
    super(props);
  }
//   componentDidMount(){
//     const qs = new URLSearchParams(window.location.search);
//     const cookieToken = cookie.load('auth');
//     const token = qs.get('token') || cookieToken || null;
//     this.props.keepIn(token);
//   }

  render() {
    let okToRenderRecipient = false;
    let okToRenderDonor = false;
    try {
      if(this.props.loggedIn){
        if(this.props.user.capabilities === 'donor')  okToRenderDonor = true;
        else if(this.props.user.capabilities === 'recipient')  okToRenderRecipient = true;
      }
    } catch {
      console.warn('not authorized to do that');
    }
    return (
      <>
        <If condition={okToRenderRecipient}>
          <Recipients />
        </If>
        <If condition={okToRenderDonor}>
          <Donor />
        </If>
      </>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.authReducer.loggedIn,
  loading: state.authReducer.loading,
  user: state.authReducer.user,
});
const mapDispatchToProps = {  };

export default connect(mapStateToProps, mapDispatchToProps)(Auth);