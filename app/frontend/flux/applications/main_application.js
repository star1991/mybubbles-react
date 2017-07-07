module.exports = Marty.createApplication(function() {
  this.register({
    users: {
      store: require('../stores/users_store'),
      queries: require('../queries/users_queries'),
      actionCreators: require('../actionCreators/users_action_creators'),
      sources: require('../sources/users_api'),
      session: require('../sources/session_storage')
    }
  });

  var Router = require('react-router');
  var routes = require('../../routes');
  var router = Router.create({
    routes: routes,
    location: null // Router.HistoryLocation
  });
  // return this.router = require('../../router');
  return this.router = router;
});