module.exports.serviceConfig = {
	port: process.env.PORT || 3000,
	mongoLabURI: process.env.MONGOLAB_URI  || "mongodb://heroku_1f16w093:7itoidqj3itopidelihkfv0p7e@ds047124.mongolab.com:47124/heroku_1f16w093",
	currencyPair: "XBTEUR"
};