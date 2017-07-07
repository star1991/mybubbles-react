var UsersConstants;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
UsersConstants = require('../constants/users_constants');
AppSessionStorage = require('../sources/session_storage');
var Router = require('react-router');
var routes = require('../../routes');
var router = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});

module.exports = Marty.createStore({
  id: 'UsersStore',
  getInitialState: function() {
    return {
      errors: [],
      email: '',
      confirm_notice: ''
    };
  },
  handlers: {
    signinResponse: UsersConstants.SIGNIN_RESPONSE,
    signupResponse: UsersConstants.SIGNUP_RESPONSE,
    resetpwResponse: UsersConstants.RESET_PW_RESPONSE,
    resendConfirmEmailResponse: UsersConstants.RESEND_CONFIRM_EMAIL_RESPONSE,
    signoutResponse: UsersConstants.SIGNOUT,
    transitionToHome: UsersConstants.TRANSITIONTOHOME,
    transitionToProfile: UsersConstants.TRANSITIONTOPROFILE,
    transitionToSignup: UsersConstants.TRANSITIONTOSIGNUP
  },
  signinResponse: function(json, errors, confirm_notice) {
    console.log('signin response');
    
    if (errors) {
      this.setState({errors: errors, confirm_notice: ''});
      router.transitionTo('signin');
      return;
    };
    if (json && json.access_token) {
      this.app.users.session.saveAccessToken(json.email, json.access_token);
      this.setState({is_signed_in: true});
      router.transitionTo('profile');
      return;
    } else if(confirm_notice) {
      this.setState({errors: [], confirm_notice: confirm_notice});
      router.transitionTo('signin');
      return;
    } else {
      errors = [{signin: "unknow signin error"}];
      this.setState({errors: errors});
      router.transitionTo('signin');
      return;
    }
  },
  signupResponse: function(json, errors) {
    if (json && json.access_token) {
      this.app.users.session.saveAccessToken(json.email, json.access_token);
      router.transitionTo('profile');
    }
    if (json && json.error) {
      router.transitionTo('sent_email');
    };
    if (errors) {
      // router.transitionTo('app');
      this.setState({errors: errors});
    };
  },
  resetpwResponse: function(json, errors) {
    if (errors) {
      this.setState({errors: errors});
    };
  },
  resendConfirmEmailResponse: function(res_json) {
    console.log(res_json);
  },
  signoutResponse: function() {
    this.app.users.session.signout();
    this.setState({email: '', is_signed_in: false});
    router.transitionTo('app');
  },
  transitionToHome: function() {
    router.transitionTo('app');
  },
  transitionToProfile: function() {
    router.transitionTo('profile');
  },
  transitionToSignup: function(email) {
    if (!this.app.users.session.isSignedin()) {
      this.setState({email: email});
      router.transitionTo('signup');
    };
  }
});