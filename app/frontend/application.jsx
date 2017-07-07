var ApplicationContainer, MyBubblezApplication;

window.Marty = Marty;
Marty.HttpStateSource.removeHook('parseJSON');
ApplicationContainer = Marty.ApplicationContainer;
MyBubblezApplication = require('./flux/applications/main_application');

$(function() {
  var myBubblezApp;
  myBubblezApp = new MyBubblezApplication();


  myBubblezApp.router.run(function(Handler, state) {

    appContainer = (
	    <ApplicationContainer app={myBubblezApp}>
	      <Handler {...state.params}/>
	    </ApplicationContainer>
	   );
    return React.render(appContainer, document.getElementById('react-wrapper'));
  });

});