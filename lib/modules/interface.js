var async = require("async");

module.exports = {
	
	getServiceInfo: function(req, res){

		var self = this;

		var info = {

			title: function(callback){

				callback(null, self.serviceConfig.name);

			},

			timesteps_scraped: function(callback){

				self.Ticker.count({},callback);

			},

			time_alive: [

				"timesteps_scraped",

				function(callback, results){

					var count = results["timesteps_scraped"];
					var hours = count/(6 *60);
					callback(null, hours.toFixed(2) + " hours");

				}

			]

		};

		async.auto(info, function(error, results){

			res.status(200).send(results);

		});

	}

};