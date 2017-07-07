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
    new WOW().init();

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
    var avatar = $('#avatar_preview').attr('src');
    var errors = [];
    var error_element;
    // if (!email || email.length < 6) {
    //   error_element = {email: "Minimum 6 characters"}
    //   errors.push(error_element);
    // }
    // if (!first_name || first_name.length === 0) {
    //   error_element = {first_name: "Name field is required"}
    //   errors.push(error_element);
    // }
    // if (!password || password.length < 6 ) {
    //   error_element = {password: ["is too short (minimum is 6 characters)"]};
    //   errors.push(error_element);
    // }
    // if (password !== password_confirmation) {
    //   error_element = {password_confirmation: "Password doesnot match"}
    //   errors.push(error_element);
    // } 

    var params = {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      first_name: first_name,
      agree_to_terms: "1",
      avatar: avatar
    };
    if (errors.length != 0) {
      this.setState({errors: errors});
    }
    else {
      this.app.users.actionCreators.signup(params);
    }
    this._pageFitScreen();
    
    
  },
  _acceptTerm: function(e) {
    this.setState({signup_button_enabled: $(this.refs.accept_term.getDOMNode()).is(":checked")});
  },
  _pageFitScreen: function() {
    // var header_height = $('header.header').outerHeight();
    // var footer_height = $('footer.footer').outerHeight();
    // var screen_height = $( window ).height();
    // var expect_content_height = screen_height - header_height - footer_height;

    // var jPageContent = $('.page.register');
    // jPageContent.css('padding-bottom', '0px');
    // var content_height = jPageContent.outerHeight();
    // if (content_height < expect_content_height) {
    //   jPageContent.css('padding-bottom', (expect_content_height - content_height).toString() + 'px');
    // };
    $('footer.footer-wrap').css('position', 'relative');
    var content_height = $('#react-wrapper').outerHeight();
    var screen_height = $( window ).height();
    if (content_height < screen_height) {
      $('footer.footer-wrap').css('position', 'fixed');
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

    // have to use RxJS
    // var error_element;
    // var render_html = '<div>';
    // for (var i = 0; i < this.state.errors.length; i++) {
    //   if(this.state.errors[i][error_key]) {
    //     this.state.errors[i][error_key].forEach(function(itemInArray) {
    //       render_html += '<p className="validation-error">' + itemInArray + '</p>';
    //     });
    //   }
    // };
    // render_html += '</div>';
    // return render_html;


    var errorClasses;
    
    for (var i = 0; i < this.state.errors.length; i++) {
      if(this.state.errors[i][error_key]) {
        errorClasses = classnames({
          'validation-error': true,
          'avatar-error': error_key === 'avatar',
        });
        return (
          <div>
            <p className={errorClasses}>{this.state.errors[i][error_key][0]}</p>
            <p className="help-block"></p>
          </div>
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
    var error_avatar = this._renderErrorElement("avatar");
    var error_first_name = this._renderErrorElement("first_name");
    var error_email = this._renderErrorElement("email");
    var error_password = this._renderErrorElement("password");
    var error_password_confirmation = this._renderErrorElement("password_confirmation");
    var signup_button = (
      <button name="button" type="submit" className="btn btn-register" >Register</button>
    );
    if (!this.state.signup_button_enabled) {
      signup_button = (
        <button name="button" type="submit" className="btn btn-register" disabled >Register</button>
      );
    }
    return (
      <div className="container content wow bounceInDown"> 
        <div className="row">
          <div className="col-sm-12 text-center">
            <h1 className="welcome-msg">Welcome to myBubblz</h1>
            <h2 className="reg-pline">Find, Meet and Make new Friends. <br/>
              Here, There, everywhere!
            </h2>
            <span className="h3 signup">Sign Up!</span>
          </div>
          <div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 acc-form">
            <div className="col-md-12">
              <form className="reg-form animated bounceInDown" name="sentMessage" className="well" id="contactForm"  onSubmit={this._handleOnSignupSubmit}>
                <div className="control-group">
                  <img id="avatar_preview" className="pic-upload center-block" src="/assets/upl.png" alt="upload " onClick={this._onAvatarPreviewClick} />
                  <input multipart="true" className="hide" id="registration_avatar" type="file" name="user[avatar]" />
                  <div className="txt-upload text-center">Upload profile picture</div>
                  {error_avatar}
                </div>
                <div className="control-group">
                  <div className="controls">
                    <p className="form-label">NAME</p>
                    <input type="text" className="form-control" placeholder="your name" id="name" ref="first_name"  />
                    <p className="help-block"></p>
                    {error_first_name}
                  </div>
                  </div>
                  <div className="control-group">
                      <div className="controls">
                        <p className="form-label">EMAIL</p>
                    <input type="email" className="form-control" ref="email" placeholder="mail@mail.com" id="email" />
                    {error_email}
                  </div>
                </div>
                <div className="control-group">
                  <div className="controls">
                    <p className="form-label">PASSWORD</p>
                    <input type="password" className="form-control" placeholder="password" id="password" ref="password" />
                    <p className="help-block"></p>
                    {error_password}
                  </div>
                  </div>
                <div className="control-group">
                  <div className="controls">
                    <p className="form-label">CONFIRM PASSWORD</p>
                    <input type="password" className="form-control" ref="password_confirmation" placeholder="retype password" id="password" />
                    <p className="help-block"></p>
                    {error_password_confirmation}
                  </div>
                </div>
                <div className="control-group">
                  <div className="contorls ilcheckox">
                    <input type="checkbox" className="" id="terms" required /> I agree to the Terms of Service and Privacy Policy <br /><br />
                  </div>
                </div>
                <div id="success"> </div>
                <button type="submit" className="btn btn-register pull-right">REGISTER</button><br />
              </form>
            </div>
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
