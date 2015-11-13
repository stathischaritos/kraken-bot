var express = require('express');

module.exports = {

	initializeRouter: function(callback){

		var self = this;
		self.router = express.Router();

		self.router.get('/', function (req, res, next) {
		  	res.status(200).send("Test");
		});

		callback(null,true);

	}

};
