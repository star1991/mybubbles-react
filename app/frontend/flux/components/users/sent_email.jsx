var classnames = require('classnames');
var moment = require('moment');
var Link = require('react-router').Link;
var ErrorNotice = require('../common/ErrorNotice.jsx');
var Router = require('react-router');
var SessionStore = require('../../sources/session_storage');
var listener;

var SentEmail = React.createClass({
	displayName: 'SentEmail',
	getInitialState: function() {
		return { 
			resend: false,
			email: 'cale.myers723@gmail.com'
		};
	},
	componentDidMount: function() {
		this._pageFitScreen();
		$('footer.footer-wrap').css('position', 'fixed');
		listener = this.app.users.store.addChangeListener(this._onSigninChange);
	},
	componentWillUnmount: function() {
		listener.dispose();
	},
	_pageFitScreen: function() {
    var header_height = $('header.header').outerHeight();
    var footer_height = $('footer.footer-wrap').outerHeight();
    var screen_height = $( window ).height();
    var adjust_height = 80;
    var expect_content_height = screen_height - header_height - footer_height - adjust_height;

    var jContentSection = $('.content.sent_email');
    var content_height = jContentSection.outerHeight();

    console.log('screen height:' + screen_height.toString() + 'px');
    console.log('content height:' + content_height.toString() + 'px');
    if (expect_content_height > content_height) {
    	jContentSection.css('margin-top', ((expect_content_height - content_height) / 2).toString() + 'px');
    };
  },
  _handleOnResendConfirmEmailSubmit: function(e) {
  	e.preventDefault();
  	var params = {
      email: this.state.email
    };
  	this.app.users.actionCreators.resend_confirm_email(params);
  },
	render: function() {
		return (
			<section className="container content sent_email"> 
				<div className="row">
					<div className="col-sm-12 col-md-6 col-md-offset-3 text-center">
						<form className="animated bounceInDown" name="sentMessage" onSubmit={this._handleOnResendConfirmEmailSubmit}>
							<div className="">
								<h1 className="send-mail-title onesdelay animated fadeIn">We send you an email!</h1>
								<div className="mail-icon"><i className="fa fa-envelope-o"></i></div>
								<div className="">
									<p>You need to confirm you email address.</p>
									<p>Please check your email.</p>
									<hr></hr>
									<p>In case you did not receive the email</p>
									<p>you can send it again.</p>
									<button type="submit" className="btn register ">RESEND</button><br />
								</div>
							</div>
						</form>
					</div>
					
				</div>
			</section>
		);
	}
});

SentEmailContainer = Marty.createContainer(SentEmail, {
	listenTo: 'users.store',
	fetch: {
		errors: function() {
			return this.app.users.store.getState().errors;
		}
	}
});

module.exports = SentEmailContainer