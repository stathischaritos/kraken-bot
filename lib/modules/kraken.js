var KrakenClient = require('kraken-api');
var async = require("async");

module.exports = {

	initializeKraken: function(callback){

		var self = this;

		self.kraken = new KrakenClient(null, null);

		self.running = false;

		self.tradesSince = null;

		self.start();
		
		self.getTradesSince(callback);

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

	stop: function(){

		this.running = false;

	},

	getData: function(callback){

		var self = this;
		self.timestamp = new Date();

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

				setTimeout(callback, self.serviceConfig.pollInterval );

			}

		}, callback);

	},

	getTicker: function(callback){

		var self = this;
		self.kraken.api('Ticker', { pair: self.serviceConfig.currencyPair } , callback);

	},

	getDepth: function(callback){

		var self = this;
		self.kraken.api('Depth', { pair: self.serviceConfig.currencyPair } , callback);

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
		
		async.parallel([

			function(callback){

				self.Info.update({}, {

					tradesSince: self.tradesSince

				}, { upsert: true }, callback);
			},

			function(callback){

				self.Trade.insert(data, callback);

			}

		], callback);

	},

	getTradesSince: function(callback){

		var self = this;

		self.Info.findOne({}, function(error, info){

			if(info){

				self.tradesSince = info.tradesSince;
				console.log(self.tradesSince);
				callback(null, info.tradesSince);

			}else{

				callback(null, null);

			}			

		});

	}	

}
