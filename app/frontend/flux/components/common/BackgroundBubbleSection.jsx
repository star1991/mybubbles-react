var React = require('react');

var BackgroundBubbleSection = React.createClass({
	displayName: 'BackgroundBubbleSection',
	getInitialState: function() {
    return { 
    };
  },
  componentDidMount: function() {
  	this._animateBubbles();
  },
  componentWillUnmount: function() {
  },
  _animateBubbles: function() {
  	var screen_width = $(window).width();
  	var bubble_html;
  	bubble_interval = 40;
  	for (var i = 0; i < screen_width / bubble_interval ; i++ ) {
  		bubble_class = "bubble";
  		var randomnumber=Math.floor(Math.random()*5)
  		if ((randomnumber % 5) != 0) {
  			bubble_class += ( randomnumber % 5 ).toString();
  		};
  		style_str = 'left:' + (i * bubble_interval).toString() + 'px';
  		bubble_html = '<span class="' + bubble_class + '"';
  		bubble_html += ' style="' + style_str + '"';
  		bubble_html += '>';
  		bubble_html += '<span className="glow"></span></span>';
  		$('#beaker').append(bubble_html);
  	}
  },
	render: function() {

		return (
  		<div id="background-bubble">
	  		<img src="/assets/bubble-1.png" id="background-bubble-1" />
	  		<img src="/assets/bubble-2.png" id="background-bubble-2" />
	  		<img src="/assets/bubble-3.png" id="background-bubble-3" />
	  		<div id="beaker">
	  		</div>
	  	</div>
  	);
  }
  // 	return (
  // 		<div id="background-bubble">
	 //  		<img src="/assets/bubble-1.png" id="background-bubble-1" />
	 //  		<img src="/assets/bubble-2.png" id="background-bubble-2" />
	 //  		<img src="/assets/bubble-3.png" id="background-bubble-3" />
	 //  		<div id="beaker">
	 //  			<span className="bubble">
	 //  				<span className="glow"></span>
	 //  			</span>
	 //  			<span className="bubble1">
	 //  				<span className="glow"></span>
	 //  			</span>
	 //  			<span className="bubble2">
	 //  				<span className="glow"></span>
	 //  			</span>
	 //  			<span className="bubble3">
	 //  				<span className="glow"></span>
	 //  			</span>
	 //  			<span className="bubble4">
	 //  				<span className="glow"></span>
	 //  			</span>
	 //  		</div>
	 //  	</div>
  // 	);
  // }
});

module.exports = BackgroundBubbleSection;