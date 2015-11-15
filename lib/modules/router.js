var express = require('express');

module.exports = {

	initializeRouter: function(callback){

		var self = this;
		self.router = express.Router();

		self.router.get('/info', function (req, res, next) {

		  	self.getServiceInfo(req, res);

		});

		self.router.get('/start-scraping', function (req, res, next) {

		  	self.start();

		  	res.status(200).send("Starting scraper...");
		  	
		});

		self.router.get('/stop-scraping', function (req, res, next) {

		  	self.stop();

		  	res.status(200).send("Stoping scraper...");
		  	
		});

		callback(null,true);

	}

};
