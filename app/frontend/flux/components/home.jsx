var classnames = require('classnames');
var moment = require('moment');
var Link = require('react-router').Link;
var Router = require('react-router');
// var SessionStore = require('../sources/session_storage');
var listener;
var animation_id;

var Home = React.createClass({
  mixins: [Router.Navigation],
  displayName: 'Signin',
  getInitialState: function() {
    return { 
      email: '',
      password:'',
      errors: []
    };
  },
  intervalTrigger: function(jMainSection) {
    return window.setInterval( function(jMainSection) {
      jMainSection.moveDown();
    }, 5000 );
  },
  componentDidMount: function() {
    this.app.users.actionCreators.transitionFromHome();
    listener = this.app.users.store.addChangeListener(this._onChangeState);
    $('html').addClass('one-scroll-page');

    new WOW().init();

    var jMainSection = $(this.refs.main.getDOMNode());
    jMainSection.onepage_scroll({
      sectionContainer: "section",
      animationTime: 1000,
      responsiveFallback: 600,
      loop: true
    });

    $('ul.onepage-pagination').addClass('hidden-sm');
    // jMainSection.find('section:first-child').css('position', 'inherit');
    // jMainSection.find('section').css('position', 'inherit');
    // jMainSection.find('section').css('display', 'block');
    this._pageFitScreen();
    // window.addEventListener("load", this._pageFitScreen);
    // animation_id = setInterval(function(){  jMainSection.moveDown(); }, 5000);
    
    // var bubble_1 = document.getElementById("background-bubble-1");
    // tween = TweenMax.to(bubble_1, 10, {x:300, y:400, repeat:-1});

    $('footer.footer-wrap').css('position', 'fixed');
  },
  _pageFitScreen: function() {
    var header_height = $('header.header').outerHeight();
    var footer_height = $('footer.footer-wrap').outerHeight();
    var screen_height = $( window ).height();
    var adjust_height = 40;
    var expect_content_height = screen_height - header_height - footer_height - adjust_height;

    var screen_width = $(window).width();
    var content_height;
    var people_height;
    console.log('screen height:' + screen_height.toString() + 'px');
    console.log('header height:' + header_height.toString() + 'px');
    console.log('footer height:' + footer_height.toString() + 'px');
    $('section').each(function() {
      content_height = $(this).find('> .row').outerHeight();
      if (expect_content_height > content_height) {
        $(this).css('padding-top', ((expect_content_height - content_height) / 2).toString() + 'px' );
      };
    });
    $('.main.page').css('height', expect_content_height.toString() + 'px');
  },
  componentWillUnmount: function() {
    listener.dispose();
    $('html').removeClass('one-scroll-page');
    var jMainSection = $(this.refs.main.getDOMNode());
    jMainSection.dispose_scroll();
    window.clearInterval(animation_id);
    window.addEventListener("unload", this._pageFitScreen);
  },
  _onChangeState: function() {
    this.setState({ eamil: this.app.users.store.getState().email });
  },
  signout: function(e) {
    e.preventDefault();
    this.app.users.actionCreators.signout();
  },
  _onJoinNowClick: function() {
    this.app.users.actionCreators.transitionToSignup('test@test.com');
  },
  render: function() {
    
    var section_page_1 = (
      <section className="container content wow bounceInDown">
        <div className="row">
          <div className="col-md-6 col-md-push-6">
            <h1 className="punchline animated bounceInDown">The New<br/>
              <span className="squared-title">Privacy Minded</span><br/>
              Social Media
            </h1>
            <div className="hp-itm">
              <h2 className="itm-title animated fadeIn">Privacy & Security</h2>       
              <div className="hp-item-desc  animated fadeIn">        
                We respect your privacy and will never ask for your last name or other sensitive data. We also provide security settings that keep you anonymous! Truly hide your images from the public and fully control what is shown on your profile. We take pride in our environment that uses the most fundamental of our rights; to only show what we want shown.
              </div>
              <a href="#/signup">
                <div className="btn btn-lg register animated bounceInUp">REGISTER</div>
              </a>
            </div>
          </div>

          <div className="col-md-6 col-md-pull-6 hidden-xs">
            <div className="sec-features">
              <img className="imac hidden-xs animated pulse" src="/assets/imac.png" alt="imac's picture" />
            </div>
          </div>
        </div>
      </section>  
    );
    

    var section_page_2 = (
      <section className="container content">
        <div className="row">
          <div className="col-md-6 col-md-push-6">
            <h1 className="punchline animated bounceInDown">The New<br/>
              <span className="squared-title">Bubbly</span><br/>
              Social Media
            </h1>
            <div className="hp-itm">
              <h2 className="itm-title animated fadeIn">One Bubble, One World!</h2>       
              <div className="hp-item-desc animated fadeIn">        
                Create a bubble for anything you want ! This will be one of your ‘worlds’ where you can interact with others, collaborate, chat, or upload pictures and videos. For example, you could create a bubble for your school project team to share and discuss ideas or create a bubble for your local tennis team to share meeting calendars, and more !
              </div>  
              <a href="#/signup">
                <div className="btn btn-lg register animated bounceInUp">CREATE MY WORLD</div>
              </a>
            </div>
          </div>
          <div className="col-md-6 col-md-pull-6 hidden-xs sec-features clearfix">
          <figure>  
            <img src="/assets/circleImg.jpg" className="img-circle img-responsive circle-stroke10 pull-left" alt="Responsive image" />

          </figure>
          <figure>  
            <img src="/assets/circleImg-int1.jpg" className="img-circle img-responsive circle-stroke7 pull-left" alt="Responsive image" />

          </figure>
          <figure>  
            <img src="/assets/circleImg-int2.jpg" className="img-circle img-responsive circle-stroke4 pull-left" alt="Responsive image" />
          </figure>

          <figure>  
            <img src="/assets/circleImg-int3.jpg" className="img-circle img-responsive circle-stroke1 pull-left" alt="Responsive image" />
          </figure>
          </div>
        </div>
      </section>
    );

    var section_page_3 = (
      <section className="container content">
        <div className="row">
          <div className="col-md-6 col-md-push-6">
            <h1 className="punchline animated bounceInDown">The New<br/>
              <span className="squared-title">Collaborative</span><br/>
              Social Media
            </h1>
            <div className="hp-itm">
              <h2 className="itm-title animated fadeIn">Collaboration made easy!</h2>       
              <div className="hp-item-desc animated fadeIn">        
                Collaborate with your friends, classmates, or coworkers on different projects thanks to the tools we provided. With our whiteboard, you can draw to all users in that bubble so they can see what you are talking about while chatting with them! (voice functions coming soon!).
              </div>
              <a href="#/signup">
                <div className="btn btn-lg register animated bounceInUp">COLLABORATE NOW</div>
              </a>
            </div>
          </div>
          <div className="col-md-6 col-md-pull-6 hidden-xs sec-features">
            <svg version="1.1" id="slide3circles" x="0px" y="0px" viewBox="0 0 451.4 464" enableBackground="new 0 0 451.4 464" >
              <circle id="circle1" fill="#FFFFFF" fillOpacity="0.60" stroke="#FFFFFF" strokeWidth="1" strokeMiterlimit="10" cx="143.2" cy="224.1" r="142.7" />
              <circle id="circle2" fill="#FFFFFF" fillOpacity="0.60" stroke="#FFFFFF" strokeWidth="1" strokeMiterlimit="10" cx="225.5" cy="143.2" r="142.7" />
              <circle id="circle3" fill="#FFFFFF" fillOpacity="0.60" stroke="#FFFFFF" strokeWidth="1" strokeMiterlimit="10" cx="225.5" cy="320.7" r="142.7" />
              <circle id="circle4" fill="#FFFFFF" fillOpacity="0.60" stroke="#FFFFFF" strokeWidth="1" strokeMiterlimit="10" cx="308.2" cy="224.1" r="142.7" />
            </svg>
          </div>
        </div>
      </section>
    );
    
    return (
      <div className="wrapper one-scroll-page">
        <div className="main page home " ref="main">
          {section_page_1}
          {section_page_2}
          {section_page_3}
        </div>
      </div>
    );
  }
});

HomeContainer = Marty.createContainer(Home, {
  
});

HomeContainer.willTransitionTo = function (transition, params, query) {
  
};

module.exports = HomeContainer;