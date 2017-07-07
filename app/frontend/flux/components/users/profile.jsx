var Link = require('react-router').Link;
var ErrorNotice = require('../common/ErrorNotice.jsx');
var Router = require('react-router');
var SessionStore = require('../../sources/session_storage');
var listener;

var Profile = React.createClass({
  displayName: 'Profile',
  getInitialState: function() {
    return { 
      email: '',
      password:'',
      errors: [],
      is_loaded: false
    };
  },
  componentDidMount: function() {
    this.app.users.actionCreators.transitionFromProfile();
    listener = this.app.users.store.addChangeListener(this._onLoginChange);
    this._pageFitScreen();
    window.addEventListener("load", this._pageFitScreen);  
    // if (this.state.is_loaded) {
    //   this._pageFitScreen();
    // } else {
    //   window.addEventListener("load", this._pageFitScreen);  
    //   this.setState({is_loaded: true});
    // }
  },
  componentWillUnmount: function() {
    listener.dispose();
    window.addEventListener("unload", this._pageFitScreen);
  },
  _onLoginChange: function() {
    this.setState({ errors: this.app.users.store.getState().errors });
  },
  _handleOnSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    this.setState({email: email, password: password});
    this.app.users.actionCreators.signin(email, password);
  },
  _pageFitScreen: function() {
    var header_height = $('header.header').outerHeight();
    var footer_height = $('footer.footer').outerHeight();
    var screen_height = $( window ).height();
    var expect_content_height = screen_height - header_height - footer_height;

    var jPageContent = $('.page.profile');
    jPageContent.css('padding-bottom', '0px');
    var content_height = jPageContent.outerHeight();
    if (content_height < expect_content_height) {
      jPageContent.css('padding-bottom', (expect_content_height - content_height).toString() + 'px');
    };
  },
  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div className="page profile">
        <div className="container-fluid">
          <div className="left-side col-md-2 col-lg-3"></div>
          <div className="content col-md-8 col-lg-6">
            <div className="clearfix">
              <img src="/assets/profile.png" alt="" className="profile-image" />
              <div className="profile-container">
                <div className="profile-name">
                  <div >Sophia’</div>
                  <div className="logo">
                    <span>Z  </span>
                  </div>
                  <div>Profile</div>
                </div>
                <div className="profile-research">
                  Lab research at Welyx
                </div>
                <div className="profile-content hidden-xs">
                  Etiam tincidunt enim et pretium efficitur. Donec auctor leo sollicitudin eros iaculis sollicitudin.
                </div>
              </div>
            </div>
            <div className="bubbles-container">
              <ul id="sortable" className="clearfix">
                <li className="bubble bubble-1"><a href=""><i className="database icon"></i></a></li>
                <li className="bubble bubble-2"><a href=""><i className="volume up icon"></i></a></li>
                <li className="bubble bubble-3"><a href=""><i className="photo icon"></i></a></li>
                <li className="bubble bubble-4"><a href=""><i className="photo icon"></i></a></li>
                <li className="bubble bubble-5"><a href=""><i className="photo icon"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="right-side col-md-2 col-lg-3"></div>
        </div>
        <div className="vertical-bar">
          <div className="col-md-2 col-lg-3"></div>
          <div className="col-md-8 col-lg-6">
            <div className="name">Sophia Jones</div>
          </div>
          <div className="right-side col-md-2 col-lg-3"></div>
        </div>
      </div>
    );
  }
});

ProfileContainer = Marty.createContainer(Profile, {
  listenTo: 'users.store',
  fetch: {
    errors: function() {
      return this.app.users.store.getState().errors;
    }
  }
});

ProfileContainer.willTransitionTo = function (transition, params, query) {
};

module.exports = ProfileContainer