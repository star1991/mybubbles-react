var classnames = require('classnames');
var moment = require('moment');
var Link = require('react-router').Link;
var ErrorNotice = require('../common/ErrorNotice.jsx');
var Router = require('react-router');
// var router = require('../../../router');
var SessionStore = require('../../sources/session_storage');
var listener;

var Signin = React.createClass({
	displayName: 'Signin',
	mixins: [Router.Navigation],
	getInitialState: function() {
		return { 
			email: '',
			password:'',
			errors: this.app.users.store.getState().errors,
			confirm_notice: this.app.users.store.getState().confirm_notice
		};
	},
	componentDidMount: function() {
		$('footer.footer-wrap').css('position', 'fixed');
		this.app.users.actionCreators.transitionFromSignin();
		listener = this.app.users.store.addChangeListener(this._onSigninChange);
	},
	componentWillUnmount: function() {
		listener.dispose();
	},
	_onSigninChange: function() {
		this.setState({ errors: this.app.users.store.getState().errors, confirm_notice: this.app.users.store.getState().confirm_notice });
		this.refs.email.getDOMNode().value = this.state.email;
		this.refs.password.getDOMNode().value = this.state.password;
	},
	_handleOnSigninSubmit: function(e) {
		e.preventDefault();
		this.setState({ errors: [] });

		var email = this.refs.email.getDOMNode().value;
		var password = this.refs.password.getDOMNode().value;

		var params = {
      email: email,
      password: password,
    };

		this.setState({email: email, password: ''});
		this.app.users.actionCreators.signin(params);

	},
	_renderErrorElement: function() {

    if (this.state.errors && this.state.errors.length > 0) {
    	return (
    		<div>
    			<p className="validation-error">login or password is invalid</p>
    		</div>
    	);
    };
    if (this.state.confirm_notice) {
    	return (
    		<div>
    			<p className="validation-error">{this.state.confirm_notice}</p>
    		</div>
    	);
    };
    return (<div></div>);
  },
	render: function() {
		// var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
		var error_elemet = this._renderErrorElement();
		return (
			<section className="container content"> 
				<div className="row">
					<div className="col-sm-12 text-center">
						<div className="onesdelay animated fadeIn">
							<h1 className="welcome-msg">Welcome back!</h1>
							<h2 className="reg-pline">Find, Meet and Make new Friends. <br />
								Here, There, everywhere!
							</h2>
							<span className="h3 signup">User Login!</span>
						</div>
					</div>
					<div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 acc-form">
						<form className="login-page-form animated bounceInDown well" name="sentMessage" id="contactForm" onSubmit={this._handleOnSigninSubmit}>
							<div className="control-group">
								{error_elemet}
								<div className="controls">
									<p className="form-label">Email</p>
									<input type="text" className="form-control" placeholder="your name" id="email" ref="email" defaultValue={this.state.email}  />
									<p className="help-block"></p>
								</div>
							</div>
							<div className="control-group">
								<div className="controls">
									<p className="form-label">PASSWORD</p>
									<input type="password" className="form-control" placeholder="password" id="password" ref="password" defaultValue="" />
									<p className="help-block"></p>
								</div>
							</div>
							<div className="ilcheckox">
								<a className="text-right pull-right forgot-pw" href="#/resetpw">Forgot password ?</a>
								<input type="checkbox" id="remember-me" /> Remember me <br /><br />
							</div>
							<button type="submit" className="btn btn-register pull-right">LOGIN</button><br />
						</form>
					</div>
				</div>
			</section>
		);
	}
});

SigninContainer = Marty.createContainer(Signin, {
	listenTo: 'users.store',
	fetch: {
		errors: function() {
			return this.app.users.store.getState().errors;
		}
	}
});

SigninContainer.willTransitionTo = function (transition, params, query) {
	// console.log('signin marty transition');
	// if (SessionStore.isSignedin()) {
	//   transition.redirect('/');
	// };
	
};

module.exports = SigninContainer