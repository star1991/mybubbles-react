module.exports = Marty.createStateSource({
  namespace: 'mybubble',
  type: 'localStorage',
  saveAccessToken: function (email, token) {
    this.set('accessToken', token);
    this.set('email', email);
  },
  getValueById: function (id) {
    return this.get(id);
  },
  isSignedin: function () {
  	var accessToken = this.get('accessToken');
  	if (accessToken != undefined && accessToken!="" && accessToken != 'null') {
  		return true;
  	};
  	return false;
  },
  signout: function() {
  	this.set('accessToken', '');
    this.set('email', '');
  }
});