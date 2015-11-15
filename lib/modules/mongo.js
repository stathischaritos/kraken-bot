var MongoClient = require('mongodb').MongoClient;

module.exports = {

	initializeMongoClient: function(callback){

		var self = this;
		var url = self.serviceConfig.mongoLabURI ||'mongodb://localhost/kraken';

		MongoClient.connect(url, function(err, db) {
		  	self.mongodb = db;	

		  	self.Ticker = db.collection('ticker');	
		  	self.Depth = db.collection('depth');	
		  	self.Trade = db.collection('trade');
		  	self.Info = db.collection('info');

		  	callback(err,db);		  
		});

	}
}