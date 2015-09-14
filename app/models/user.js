var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Link = require('./link.js')
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  links: function() {
    return this.hasMany(Link);
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      // get submitted password

      // run it through bcrypt
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      // store that as the password
      model.set('password', hash);
    });
  }

});

module.exports = User;
