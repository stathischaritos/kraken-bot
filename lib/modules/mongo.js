var MongoClient = require('mongodb').MongoClient;

module.exports = {
	initializeMongoClient: function(callback){

		var self = this;
		var url = self.serviceConfig.mongoLabURI;

		MongoClient.connect(url, function(err, db) {
		  	self.mongodb = db;		  		
		  	callback(err,db);		  
		});

	}
}