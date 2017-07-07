var React = require('react');
var Link = require('react-router').Link;

var HeaderSection = React.createClass({
  displayName: 'Signin',
  getInitialState: function() {
    return { 
      is_signed_in: this.app.users.session.isSignedin()
    };
  },
  componentDidMount: function() {
    listener = this.app.users.store.addChangeListener(this._onSigninChange);
  },
  componentWillUnmount: function() {
    listener.dispose();
  },
  _onSigninChange: function() {
    this.setState({ is_signed_in: this.app.users.store.getState().is_signed_in });
  },
  _renderNavbarHeader: function() {
    var navbar_header;
    if (this.state.is_signed_in) {
      // navbar_header += 
    };
    
  },
  _handleOnLanguageButton: function(e) {
    e.preventDefault();
    var jLanguageMenu = $(this.refs.language_menu.getDOMNode());
    // $('.language-menu').addClass('out');
    jLanguageMenu.addClass('out');
  },
  _closeLanguageBar: function() {
    $('.language-menu').removeClass('out');
  },
  _handleOnSigninSubmit: function(e) {
    e.preventDefault();
    $('.navbar-nav > li.dropdown').removeClass('open');
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var params = {
      email: email,
      password: password,
    };

    this.setState({email: email, password: password});
    this.app.users.actionCreators.signin(params);
  },
  _signout: function(e) {
    e.preventDefault();
    this.app.users.actionCreators.signout();
  },
  render: function() {
    var navbar_header_button = (this.state.is_signed_in) ? false : 
      (
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      );

    var login_form_section = (
      <ul id="login-dp" className="dropdown-menu">
        <li>
          <div className="row">
            <div className="col-md-12 login-form">
              <span className="login-via">Login via</span>
              <div className="social-buttons">
                <a href="#" className="btn btn-fb"><i className="fa fa-facebook"></i> Facebook</a>
                <a href="#" className="btn btn-tw"><i className="fa fa-twitter"></i> Twitter</a>
              </div>
              or
              <form className="form" onSubmit={this._handleOnSigninSubmit} >
                <div className="form-group">
                   <label className="sr-only" >Email address</label>
                   <input type="email" className="form-control" placeholder="Email address" ref="email" />
                </div>
                <div className="form-group">
                  <label className="sr-only">Password</label>
                  <input type="password" className="form-control" placeholder="Password" ref="password" />
                  <div className="help-block text-right"><Link className="brand" to="resetpw" >Forgot password ?</Link></div>
                </div>
                <div className="form-group">
                   <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                </div>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" /> 
                      keep me logged-in
                  </label>
                </div>
              </form>
            </div>
            <div className="bottom text-center">
              New here ? <a href="#/signup"><b>Join Us</b></a>
            </div>
          </div>
        </li>
      </ul>
    );

    var navbar_header_icon = (
      <div className="navbar-header-signed-in">
        <div className="bubble-group hidden-xs">
          <div className="header-bubble-icon in-bubble">
            <span>IN</span>
          </div>
        </div>
        <div className="bubble-right-group hidden-xs">
          <p>Sophia Jones</p>
          <a className="header-bubble-icon mail-bubble">
            <i className="mail icon"></i>
          </a>
          <a className="header-bubble-icon user-bubble">
            <i className="user icon"></i>
          </a>
          <a className="header-bubble-icon help-bubble">
            <i className="help icon"></i>
          </a>
          <a className="header-bubble-icon signout-bubble" onClick={this._signout}>
            <i className="sign out icon"></i>
          </a>
        </div>
        <div className="header-bubble-icon search-bubble hidden-xs">
          <i className="search icon"></i>
        </div>
      </div>
    );

    var navbar_collapse;
    if (this.state.is_signed_in) {
      navbar_collapse = (
        <div className="" >
          {navbar_header_icon}
        </div>
      );
    } else {
      navbar_collapse = (
        <div className="collapse navbar-collapse" id="navbar-collapse-1">
          <ul className="nav navbar-nav pull-right">
            <li className="nava">Already have an account?</li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Login <i className="fa fa-arrow-circle-down"></i></a>
              {login_form_section}
            </li>
            <li>
              <a href="" role="menuitem" onClick={this._handleOnLanguageButton}>EN</a>
            </li>
          </ul>
        </div>
      );
    }
    

    return (
      <header className="header clearfix">
        <nav id="main-menu" className="navbar navbar-custom" role="navigation">
          <div className="fluid-container header-fixed">
            <span className="logo-wrap pull-left">
              <a href="#"> <img className="logo" src="/assets/logo.png" alt="" width=""/></a>
            </span>
            {navbar_header_button}
            {navbar_collapse}
          </div>
        </nav>

        <div className="language-menu" ref="language_menu">
          <div className="close" onClick={this._closeLanguageBar}>×</div>
          <p id="en" name="english" className="language active">English</p>
          <br/>
          <p id="es" name="espanol" className="language">Espanol</p>
          <br/>
          <p id="fr" name="francais" className="language">Francais</p>
          <br/>
          <p id="de" name="deutsch" className="language">Deutsch</p>
          <br/>
          <p id="pt" name="português" className="language">Português</p>
          <br/>
        </div>
      </header>
    );
  }
});

HeaderContainer = Marty.createContainer(HeaderSection, {
  listenTo: 'users.store'
});

module.exports = HeaderContainer;

