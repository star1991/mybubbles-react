var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var HeaderSection = require('./common/HeaderSection.jsx');
var FooterSection = require('./common/FooterSection.jsx');
var ChartWidget = require('./common/ChartWidget.jsx');
var BackgroundBubbleSection = require('./common/BackgroundBubbleSection.jsx');

var App = React.createClass({
  displayName: 'App',
  getInitialState: function() {
    return { 
      is_signed_in: this.app.users.session.isSignedin(),
    };
  },
  render: function() {
    return (
      <div>
        <BackgroundBubbleSection />
      	<HeaderSection />
        <RouteHandler />
        <FooterSection />
        <ChartWidget is_signed_in={this.state.is_signed_in} />
      </div>
    );
  }
});

AppContainer = Marty.createContainer(App, {
  
});

module.exports = AppContainer