var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Signin = require('./flux/components/users/signin');
var Signup = require('./flux/components/users/signup');
var Home = require('./flux/components/home');
var App = require('./flux/components/App');
var Profile = require('./flux/components/users/profile');
var ResetPassword = require('./flux/components/users/resetpw');
var SentEmail = require('./flux/components/users/sent_email');

module.exports = (
  <Route name='app' path="/" handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="signin" path="/signin" handler={Signin} />
    <Route name="signup" path="/signup" handler={Signup} />
    <Route name="profile" path="/profile" handler={Profile} />
    <Route name="resetpw" path="/resetpw" handler={ResetPassword} />
    <Route name="sent_email" path="/sent_email" handler={SentEmail} />
  </Route>
);
