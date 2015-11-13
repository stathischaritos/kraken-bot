var redis = require("redis"),

module.exports = {

	initializeRedisClient: function(callback){

		var self = this;
		var self.redis = redis.createClient();



	}

}