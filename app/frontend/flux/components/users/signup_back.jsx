var classnames = require('classnames');
var moment = require('moment');
var Link = require('react-router').Link;
var ErrorNotice = require('../common/ErrorNotice.jsx');
var Router = require('react-router');
// var router = require('../../../router');
var listener;

function readURL(input, jQueryElement) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      jQueryElement.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

var Signup = React.createClass({
  displayName: 'Signup',
  mixins: [Router.Navigation],
  getInitialState: function() {
    return { 
      email: this.app.users.store.getState().email,
      password:'',
      errors: [],
      signup_button_enabled: false
    };
  },
  componentDidMount: function() {
    this.app.users.actionCreators.transitionFromSignup();
    listener = this.app.users.store.addChangeListener(this._onSignupChange);

    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    if (dropZone != undefined) {
      dropZone.addEventListener('dragover', this._handleOnDragOver, false);
      dropZone.addEventListener('drop', this._handleFileSelect, false);  
    }

    this._pageFitScreen();
  },
  componentWillUnmount: function() {
    listener.dispose();
  },
  _handleOnDragOver: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  },
  _handleFileSelect: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    readURL(evt.dataTransfer, $('#avatar_preview'));
    document.getElementById('registration_avatar').files = files;

    // files is a FileList of File objects. List some properties.
    // var output = [];
    // for (var i = 0, f; f = files[i]; i++) {
    //   output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    //               f.size, ' bytes, last modified: ',
    //               f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
    //               '</li>');
    // }
    // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  },
  _onSignupChange: function() {
    this.setState({ errors: this.app.users.store.getState().errors });
  },
  componentDidUpdate: function() {
    this._pageFitScreen();
  },
  _handleOnSignupSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var email = this.refs.email.getDOMNode().value;
    var first_name = this.refs.first_name.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var password_confirmation = this.refs.password_confirmation.getDOMNode().value;
    var errors = [];
    var error_element;
    if (!email || email.length < 6) {
      error_element = {email: "Minimum 6 characters"}
      errors.push(error_element);
    }
    if (!first_name || first_name.length === 0) {
      error_element = {first_name: "Name field is required"}
      errors.push(error_element);
    }
    if (!password || password.length < 6 || password.length > 20) {
      error_element = {password: "6-20 characters"}
      errors.push(error_element);
    }
    if (password !== password_confirmation) {
      error_element = {password_confirmation: "Password doesnot match"}
      errors.push(error_element);
    } 
    if (errors.length != 0) {
      this.setState({errors: errors});
    }
    else {
      this.app.users.actionCreators.signup(email, first_name, password);
    }
    
    
  },
  _acceptTerm: function(e) {
    this.setState({signup_button_enabled: $(this.refs.accept_term.getDOMNode()).is(":checked")});
  },
  _pageFitScreen: function() {
    var header_height = $('header.header').outerHeight();
    var footer_height = $('footer.footer').outerHeight();
    var screen_height = $( window ).height();
    var expect_content_height = screen_height - header_height - footer_height;

    var jPageContent = $('.page.register');
    jPageContent.css('padding-bottom', '0px');
    var content_height = jPageContent.outerHeight();
    if (content_height < expect_content_height) {
      jPageContent.css('padding-bottom', (expect_content_height - content_height).toString() + 'px');
    };
    
  },
  _onAvatarPreviewClick: function() {
    $('#registration_avatar')
      .trigger('click')
      .on('change', function() { 
        readURL(this, $("#avatar_preview"));
      });
  },
  _renderErrorElement: function(error_key) {
    var error_element;
    for (var i = 0; i < this.state.errors.length; i++) {
      if(this.state.errors[i][error_key]) {
        return (
          <p className="validation-error">{this.state.errors[i][error_key]}</p>
        );
      }
    };
    return (<div></div>);
  },
  _onPasswordMatchhandleChange: function() {
    
    var jPassword = $(this.refs.password.getDOMNode());
    var jPasswordConfirmation = $(this.refs.password_confirmation.getDOMNode());
    jPassword.removeClass('match-password');
    jPasswordConfirmation.removeClass('match-password');

    var password = jPassword.val();
    var password_confirmation = jPasswordConfirmation.val();
    if (password != "" && password_confirmation != "") {
      if (password == password_confirmation) {
        jPassword.addClass('match-password');
        jPasswordConfirmation.addClass('match-password');
      };
    };
  },
  render: function() {
    // var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var error_first_name = this._renderErrorElement("first_name")
    var error_email = this._renderErrorElement("email")
    var error_password = this._renderErrorElement("password")
    var error_password_confirmation = this._renderErrorElement("password_confirmation")
    var signup_button = (
      <button name="button" type="submit" className="btn btn-register" >Register</button>
    );
    if (!this.state.signup_button_enabled) {
      signup_button = (
        <button name="button" type="submit" className="btn btn-register" disabled >Register</button>
      );
    }
    return (
      <div className="page register">
        <div className="container-fluid">
          <div className="row">
            <div className="left-side col-md-2 col-lg-3"></div>
            <div className="content col-md-8 col-lg-6">
              <h2>
                Sign Up
              </h2>
              <h4>
                Find, Meet, and Make New Friends Around You
              </h4>
              <div className="signup-content">
                <form onSubmit={this._handleOnSignupSubmit}>
                  <div className="row">
                    <div className="avatar-container col-md-4 col-lg-4">
                      <div className="drag-and-drop-zone" id="drop_zone" >
                        <a href="javascript:;" className="txt-center wh150">
                          <img id="avatar_preview" className="avatar-image ui small circular image" src="/assets/square-image.png" 
                            alt="Square image" ref="avatar_preview" onClick={this._onAvatarPreviewClick} />
                          <input multipart="true" className="hide" id="registration_avatar" type="file" name="user[avatar]" />
                        </a>
                        <p >Upload profile pic</p>
                        <div id="choose-file" onClick={this._onAvatarPreviewClick}>
                          <p>or choose a file from computer</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 col-lg-8">
                      <div className="row">
                        <div className="form-group col-lg-6 required">
                          <label className="required-class control-label required" for="user_first_name">First name</label>
                          <input className="form-control" type="text" ref="first_name" />
                          {error_first_name}
                        </div>
                        <div className="form-group col-lg-6 required">
                          <label className="required-class control-label required" for="user_email">Email</label>
                          <input className="form-control" type="email" ref="email" defaultValue={this.state.email} />
                          {error_email}
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-lg-6 required">
                          <label className="required-class control-label required" for="user_password">Create Password</label>
                          <input className="form-control" type="password" ref="password" onChange={this._onPasswordMatchhandleChange} />
                          {error_password}
                        </div>
                        <div className="form-group col-lg-6 required" >
                          <label className="required-class control-label" for="user_password_confirmation">Password confirmation</label>
                          <input className="form-control" type="password" ref="password_confirmation" onChange={this._onPasswordMatchhandleChange} />
                          {error_password_confirmation}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 form-group ">
                          <input type="checkbox" id="accept-terms-of-service" name="accept-terms-of-service" ref="accept_term" onClick={this._acceptTerm} />
                          <div className="terms-text">
                            By registering your profile, you accept the terms of service
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 form-group">
                          <div className="action button_action " id="user_submit_action" >
                            {signup_button}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="right-side col-md-2 col-lg-3"></div>
          </div>  
        </div>
      </div>

    );
  }
});

SignupContainer = Marty.createContainer(Signup, {
  listenTo: 'users.store',
  fetch: {
    errors: function() {
      return this.app.users.store.getState().errors;
    }
  }
});

// SignupContainer.willTransitionTo = function (transition, params, query) {
//   console.log('signup marty transition');
//   transition.redirect('/signup');
// };

module.exports = SignupContainer
