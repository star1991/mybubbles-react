
var React = require('react');

var ChartWidget = React.createClass({
	displayName: 'ChartWidget',
	getInitialState: function() {
    return { 
      is_signed_in: this.props.is_signed_in
    };
  },
  render: function() {
  	if (this.state.is_signed_in) {
  		return (
	    	<div className="chat-widget hidden-sm hidden-xs">
				  <img src="/assets/chart-icon-1.png" />
				  <img src="/assets/chart-icon-2.png" />
				  <img src="/assets/chart-icon-3.png" />
				  <img src="/assets/chart-icon-4.png" />
				</div>
	    );	
  	} else {
  		return (
	    	<div>
				</div>
	    );	
  	}
  	
  }
});

module.exports = ChartWidget;
