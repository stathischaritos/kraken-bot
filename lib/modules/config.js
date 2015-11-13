module.exports.serviceConfig = {
	port: process.env.PORT || 3000,
	mongoLabURI: process.env.MONGOLAB_URI  || "mongodb://localhost:27017",
	currencyPair: "XBTEUR"
};