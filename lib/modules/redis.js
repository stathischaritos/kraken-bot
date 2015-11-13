var redis = require("redis");

module.exports = {

	initializeRedisClient: function(callback){

		var self = this;
		self.redis = redis.createClient();

	}

}