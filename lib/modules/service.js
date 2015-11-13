var express = require('express');

module.exports = {

	initializeService: function(callback){

		var self = this;
		self.app = express();

		if(self.router){
			self.app.use('*',self.router);
		}

		self.server =  self.app.listen(3000, function () {
			
			var host = self.server.address().address;
			var port = self.server.address().port;
			console.log('Example app listening at http://%s:%s', host, port);
			callback(null,true);
			
		});

	}
}