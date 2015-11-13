var async = require("async");


module.exports = {

	initialize: function(){

		var self = this;

		async.auto({
			"initializeMongoClient": function(callback){
				self.initializeMongoClient(callback);
			},
			"initializeKraken": [
				"initializeMongoClient", function(callback){
					self.initializeKraken(callback);
				}
			],
			"initializeRouter": function(callback){
				self.initializeRouter(callback);
			},
			"initializeService": [
				"initializeRouter", function(callback){
					self.initializeService(callback);
				}
			]
		}, function(error,results){

			console.log(error,results);

		});

	}
	
}