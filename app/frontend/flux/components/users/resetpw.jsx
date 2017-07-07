var classnames = require('classnames');
var moment = require('moment');
var Link = require('react-router').Link;
var ErrorNotice = require('../common/ErrorNotice.jsx');
var Router = require('react-router');
// var router = require('../../../router');
var SessionStore = require('../../sources/session_storage');
var listener;

var ResetPassword = React.createClass({
	displayName: 'ResetPassword',
	getInitialState: function() {
		return {
			errors: []
		};
	},
	componentDidMount: function() {
		$('footer.footer-wrap').css('position', 'fixed');
		listener = this.app.users.store.addChangeListener(this._onResetPWChange);
	},
	componentWillUnmount: function() {
		listener.dispose();
	},
	_onResetPWChange: function() {
		this.setState({ errors: this.app.users.store.getState().errors });
	},
	_handleOnResetPWSubmit: function(e) {
		e.preventDefault();
		this.setState({ errors: [] });

		var email = this.refs.email.getDOMNode().value;
		var params = {
      email: email
    };
		this.app.users.actionCreators.resetpw(params);

	},
	_renderErrorElement: function(error_key) {

    if (this.state.errors && this.state.errors.length > 0) {
    	return (
	    	<div>
		      <p className='validation-error'>{this.state.errors[0]}</p>
		      <p className="help-block"></p>
		    </div>
		   );
    }

  },
	render: function() {
		// var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
		var error_email = this._renderErrorElement();
		return (
			<section className="container resetpw"> 
				<div className="row">
					<div className="col-sm-12 text-center">
						<div className="onesdelay animated fadeIn">
							<h2 className="reg-pline">Forgot your password? <br />
								Don`t worry, it happens!
							</h2>
							<span className="h3 signup">Request password reset!</span>
						</div>
					</div>
		      <div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
						<form className="resetpw-form animated bounceInDown well" name="sentMessage" id="contactForm"  novalidate onSubmit={this._handleOnResetPWSubmit}>
							<div className="control-group">
								<div className="controls">
									<p className="form-label">Email</p>
									<input type="text" className="form-control" placeholder="your email" id="name" ref="email" />
									<p className="help-block"></p>
									{error_email}
								</div>
				   		</div>
						 	<div id="success"> </div>
						 	<button type="submit" className="btn btn-register pull-right">RESET PASSWORD</button><br />
						</form>
			    </div>
		    </div>
			</section>
		);
	}
});

ResetPasswordContainer = Marty.createContainer(ResetPassword, {
	listenTo: 'users.store',
	fetch: {
		errors: function() {
			return this.app.users.store.getState().errors;
		}
	}
});

module.exports = ResetPasswordContainer