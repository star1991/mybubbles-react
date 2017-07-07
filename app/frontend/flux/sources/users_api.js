

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  // if ((json = JSON.parse(res.text))) {
  //   if (json['errors']) {
  //     errorMsgs = json['errors'];
  //   } else if (json['error']) {
  //     errorMsgs = [json['error']];
  //   }
  // }
  return errorMsgs;
}

module.exports = Marty.createStateSource({
  id: 'UsersAPI',
  type: 'http',
  signup: function(params) {
    var url;
    url = Routes.api_v1_users_path({
      user: {
        email: params.email,
        first_name: params.first_name,
        password: params.password,
        password_confirmation: params.password,
        agree_to_terms: "1",
        avatar: params.avatar
      }
    });
    return this.post({url:'/api/v1/users' , contentType: 'application/json', 
              body: { 
                user: {
                  email: params.email,
                  first_name: params.first_name,
                  password: params.password,
                  password_confirmation: params.password_confirmation,
                  agree_to_terms: "1",
                  avatar: params.avatar
                }
              }
          }).then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        // throw new Error('Failed to signin user', res);  
        return res.json();
      }
      
    });
  },

  signin: function(params) {
    // var url;
    // url = Routes.api_v1_sessions_path({
    //   email: email,
    //   password: password,
    //   grant_type: 'password'
    // });
    console.log('users api signin');
    return this.post({url:'/api/v1/sessions' , contentType: 'application/json', 
              body: { 
                email: params.email,
                password: params.password
              }}).then(function(res) {
      if (res.ok) {
        return res.json();
      } else {
        // throw new Error('Failed to signin user', res);  
        return res.json();
      }
      
    });
  },
  resetpw: function(params) {
    console.log('users api resetpw');
    return this.post({url:'/api/v1/password' , contentType: 'application/json', 
      body: { 
        user: {
          email: params.email
        }
      }}).then(function(res) {
        if (res.ok) {
          return res.json();
        } else {
          return res.json();
        }
        return res.json();
      
    });
  },
  resend_confirm_email: function(params) {
    console.log('users api resend_confirm_email');
    return this.post({url:'/api/v1/confirmations/resend' , contentType: 'application/json', 
      body: { 
        email: params.email
      }}).then(function(res) {
        
        if (res.ok) {
          return res.json();
        } else {
          return res.json();
        }
        return res.json();
      
    });
  }

});