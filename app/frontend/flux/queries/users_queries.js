var UsersConstants;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
UsersConstants = require('../constants/users_constants');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  // if ((json = JSON.parse(res.text))) {
  //   if (json['errors']) {
  //     errorMsgs = json['errors'];
  //   } else if (json['error']) {
  //     errorMsgs = [json['error']];
  //   }
  // }
  return errorMsgs;
}

module.exports = Marty.createQueries({
  id: 'UsersQueries',
  signin: function(params) {
    console.log('users query signin');
    this.app.users.sources.signin(params).then(function (res) {
      // if (res.result.users[0].access_token) {
      //   console.log('receive user signin');
      //   this.dispatch(UsersConstants.SIGNIN_RESPONSE, res, null);
      // } else {
      //   this.dispatch(UsersConstants.SIGNIN_RESPONSE, null, res.errors);
      //   console.log('invalid user signin');
      // }

      if (res.errors && res.errors.length > 0) {
        console.log('invalid user signin');
        this.dispatch(UsersConstants.SIGNIN_RESPONSE, null, res.errors, '');
      } else if (res.error) {
        this.dispatch(UsersConstants.SIGNIN_RESPONSE, null, res.errors, res.error);
      } else {
        if (res.result.users && res.result.users.length > 0) {
          console.log('receive user signin');
          this.dispatch(UsersConstants.SIGNIN_RESPONSE, res.result.users[0], null);
        } else {
          console.log('unknow signin error');
          errors = [{signin: "unknow signin error"}];
          this.dispatch(UsersConstants.SIGNIN_RESPONSE, null, errors);
        }
      }
    }.bind(this)).catch(function (err) {
      errors = _getErrors(err)
      this.dispatch(UsersConstants.SIGNIN_RESPONSE, null, errors);
      console.log('error to signin');
    }.bind(this))

  },
  resetpw: function(params) {
    this.app.users.sources.resetpw(params).then(function (res) {
      if (res.errors && res.errors.email) {
        console.log('error to reset password');
      }
      this.dispatch(UsersConstants.RESET_PW_RESPONSE, null, res.errors.email);
    }.bind(this)).catch(function(err) {
      console.log('throw to reset password');
      this.dispatch(UsersConstants.RESET_PW_RESPONSE, null, null);
    });
  },
  resend_confirm_email: function(params) {
    this.app.users.sources.resend_confirm_email(params).then(function (res) {
      if (res.errors && res.errors.email) {
        console.log('error to reset password');
      }
      this.dispatch(UsersConstants.RESEND_CONFIRM_EMAIL_RESPONSE, res);
    }.bind(this)).catch(function(err) {
      console.log('throw to reset password');
      this.dispatch(UsersConstants.RESEND_CONFIRM_EMAIL_RESPONSE, res);
    });
  },
  signout: function() {
    this.dispatch(UsersConstants.SIGNOUT);
  },
  receiveSignin: function(json, errors) {
    console.log('receive signin');
    return this.dispatch(UsersConstants.SIGNIN_RESPONSE, json, errors);
  },
  signup: function(params) {
    this.app.users.sources.signup(params).then(function (res) {
      if (res.error) {
        console.log('receive user signup');
        this.dispatch(UsersConstants.SIGNUP_RESPONSE, res, null);
      } else {
        // this.dispatch(UserActions.RECEIVE_USER_FAILED, id);
        // console.log('invalid');
        this.dispatch(UsersConstants.SIGNUP_RESPONSE, null, res.errors);
      }
    }.bind(this)).catch(function (err) {
      errors = _getErrors(err)
      this.dispatch(UsersConstants.SIGNUP_RESPONSE, null, errors);
      console.log('error to signup');
    }.bind(this))
  },
  transitionFromSignin: function() {
    if (this.app.users.session.isSignedin()) {
      this.dispatch(UsersConstants.TRANSITIONTOHOME);
    }
  },
  transitionFromHome: function() {
    if (this.app.users.session.isSignedin()) {
      this.dispatch(UsersConstants.TRANSITIONTOPROFILE);
    }
  },
  transitionFromProfile: function() {
    if (!this.app.users.session.isSignedin()) {
      this.dispatch(UsersConstants.TRANSITIONTOHOME);
    }
  },
  transitionFromSignup: function() {
    if (this.app.users.session.isSignedin()) {
      this.dispatch(UsersConstants.TRANSITIONTOHOME);
    };
  },
  transitionToSignup: function(email) {
    email = email || '';
    this.dispatch(UsersConstants.TRANSITIONTOSIGNUP, email);
  }
});