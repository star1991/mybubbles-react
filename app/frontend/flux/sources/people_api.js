module.exports = Marty.createStateSource({
  id: 'PeopleAPI',
  type: 'http',
  findPeople: function(pageNumber, searchText) {
    var url;
    url = Routes.api_v1_people_path({
      page: pageNumber,
      search: searchText
    });
    return this.get(url).then(function(res) {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Error while finding people', res);
    });
  },
  findPerson: function(id) {
    var url;
    url = Routes.api_v1_person_path(id);
    return this.get(url).then(function(res) {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Error while finding current person', res);
    });
  }
});