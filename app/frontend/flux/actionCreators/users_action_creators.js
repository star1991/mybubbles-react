var UsersConstants;
UsersConstants = require('../constants/users_constants');
module.exports = Marty.createActionCreators({
  id: 'UsersActionCreators',
  signin: function(params) {
    console.log('users action signin');
  	this.app.users.queries.signin(params);
  	// console.log('aaa');
  },
  signup: function(params) {
  	this.app.users.queries.signup(params);
  },
  signout: function() {
  	this.app.users.queries.signout();
  },
  resetpw: function(params) {
    this.app.users.queries.resetpw(params);
  },
  resend_confirm_email: function(params) {
    this.app.users.queries.resend_confirm_email(params);
  },
  receiveSignin: function(json, errors) {
    this.app.users.queries.receiveSignin(json, errors);
  },
  transitionFromHome: function() {
  	this.app.users.queries.transitionFromHome();
  },
  transitionFromSignin: function() {
    this.app.users.queries.transitionFromSignin();
  },
  transitionFromProfile: function() {
    this.app.users.queries.transitionFromProfile();
  },
  transitionFromSignup: function() {
    this.app.users.queries.transitionFromSignup();
  },
  transitionToSignup: function(email) {
    email = email || '';
    this.app.users.queries.transitionToSignup(email);
  }
});