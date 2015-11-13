var KrakenClient = require('kraken-api');
var async = require("async");

module.exports = {

	initializeKraken: function(callback){

		var self = this;

		self.kraken = new KrakenClient(null, null);

		self.running = false;

		self.tradesSince = null;

		self.start();

		callback();

	},

	start: function(){

		console.log("Starting...")
		var self = this;
		self.running = true;

		async.whilst(

			function(){

				return self.running;

			},

			function(callback){

				self.getData(callback);

			},

			function(error){

				console.log(error, "Stopped!");
				process.exit(1);

			}

		)

	},

	getData: function(callback){

		var self = this;
		self.timestamp = new Date().getTime();

		async.auto({

			"Ticker": function(callback){

				async.waterfall([

					self.getTicker.bind(self),
					self.saveTicker.bind(self)

				],callback);
				
			},

			"Depth": function(callback){

				async.waterfall([

					self.getDepth.bind(self),
					self.saveDepth.bind(self)

				],callback);				
					
			},

			"LatestTrades": function(callback){

				async.waterfall([

					self.getLatestTrades.bind(self),
					self.saveLatestTrades.bind(self)

				],callback);
				
			},
			"Wait": function(callback){

				setTimeout(callback, 10000 );

			}

		}, callback);

	},

	getTicker: function(callback){

		var self = this;
		self.kraken.api('Ticker', {"pair": self.serviceConfig.currencyPair } , callback);

	},

	getDepth: function(callback){

		var self = this;
		self.kraken.api('Depth', {"pair": self.serviceConfig.currencyPair } , callback);

	},

	getLatestTrades: function(callback){

		var self = this;
		self.kraken.api('Trades', { pair: self.serviceConfig.currencyPair , since: self.tradesSince } , callback);

	},

	saveTicker: function(data, callback){

		console.log(data);
		var self = this;
		data.timestamp = self.timestamp;
		self.Ticker.insert(data, callback);

	},

	saveDepth: function(data ,callback){

		console.log(data);
		var self = this;
		data.timestamp = self.timestamp;
		self.Depth.insert(data, callback);

	},

	saveLatestTrades: function(data ,callback){

		console.log(data);
		var self = this;
		data.timestamp = self.timestamp;
		self.tradesSince = data.result.last;		
		self.Trade.insert(data, callback);

	},

	getLastTradesSince:function(callback){

		self.mongodb

	}

}