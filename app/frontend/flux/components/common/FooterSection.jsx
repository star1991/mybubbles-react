var React = require('react');

var FooterSection = React.createClass({
	displayName: 'FooterSection',
	render: function() {
  	return (
  		<footer className="footer-wrap">
				<div className="container-fluid ">
					<div className="row">
						<div className="col-md-push-8 col-md-4 clearfix text-center">
							<div className="social">
								<span className="fa-stack social-i">
								<a href="">
									<i className="fa fa-circle-thin fa-stack-2x"></i>
									<i className="fa fa-instagram fa-stack-1x"></i>
								</a>
								</span>			
								<span className="fa-stack social-i">
								<a href="">
									<i className="fa fa-circle-thin fa-stack-2x"></i>
									<i className="fa fa-twitter fa-stack-1x"></i>
								</a>
								</span>
								<span className="fa-stack social-i">
									<a href="">
									<i className="fa fa-circle-thin fa-stack-2x"></i>
									<i className="fa fa-facebook fa-stack-1x"></i>
									</a>
								</span>
							</div>
						</div>	
						<div className="col-md-4">
							<ul className="footer-links">
								<li><a href="">Register</a></li>
								<li><a href="">Press</a></li>
								<li><a href="">Contact Us</a></li>
								<li><a href="">Privacy Policy</a></li>
								<li><a href="">Terms of Service</a></li>
							</ul>
						</div>	
						<div className="col-md-pull-8 col-md-4">
							<div className="copyright">2015 Copyright ©MyBubblz.com. All Rights Reserved.</div>
						</div>	
					</div>	
				</div>
			</footer>
  	);
  }
});

module.exports = FooterSection;