var PeopleConstants;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
PeopleConstants = require('../constants/people_constants');
module.exports = Marty.createStore({
  id: 'PeopleStore',
  getInitialState: function() {
    return {
      searchText: '',
      meta: {
        total_pages: 0,
        current_page: 0
      }
    };
  },
  handlers: {
    receivePeople: PeopleConstants.RECEIVE_PEOPLE,
    updateSearchText: PeopleConstants.SET_SEARCH_TEXT,
    resetSearch: PeopleConstants.RESET_SEARCH,
    receiveCurrentPerson: PeopleConstants.RECEIVE_CURRENT_PERSON,
    resetCurrentPerson: PeopleConstants.RESET_CURRENT_PERSON
  },
  fetchPeople: function() {
    return this.fetch({
      id: 'all-people',
      locally: __bind(function() {
        return this.state.people;
      }, this),
      remotely: __bind(function() {
        return this.app.people.queries.findPeople();
      }, this)
    });
  },
  receivePeople: function(response) {
    return this.setState({
      people: response.people,
      meta: response.meta
    });
  },
  updateSearchText: function(text) {
    return this.setState({
      searchText: text
    });
  },
  resetSearch: function() {
    return this.setState({
      searchText: ''
    });
  },
  getPerson: function(id) {
    return this.fetch({
      id: "person-" + id,
      locally: __bind(function() {
        return this.state.currentPerson;
      }, this),
      remotely: __bind(function() {
        return this.app.people.queries.findPerson(id);
      }, this)
    });
  },
  receiveCurrentPerson: function(person) {
    return this.setState({
      currentPerson: person
    });
  },
  resetCurrentPerson: function() {
    return this.setState({
      currentPerson: void 0
    });
  }
});