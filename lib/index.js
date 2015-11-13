var _ = require("lodash");
var fs = require("node-fs");

var service = function Constructor(){};

// Load modules from the modules folder to extend the prototype 
var files = fs.readdirSync(__dirname + '/modules/');
for(var i = 0; i < files.length; i++){
  if(files[i].match(/.*\.js/)){
    var mod = require('./modules/' + files[i]);
    _.merge(service.prototype, mod);
  }
}

module.exports = new service;

