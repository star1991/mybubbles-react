var PeopleConstants;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
PeopleConstants = require('../constants/people_constants');
module.exports = Marty.createQueries({
  id: 'PeopleQueries',
  findPeople: function(pageNumber, searchText) {
    return this.app.people.sources.findPeople(pageNumber, searchText).then(__bind(function(res) {
      return this.dispatch(PeopleConstants.RECEIVE_PEOPLE, res);
    }, this))["catch"](function(err) {
      return console.log(err);
    });
  },
  findPerson: function(id) {
    return this.app.people.sources.findPerson(id).then(__bind(function(res) {
      return this.dispatch(PeopleConstants.RECEIVE_CURRENT_PERSON, res);
    }, this))["catch"](function(err) {
      return console.log(err);
    });
  }
});


