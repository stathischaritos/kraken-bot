module.exports.serviceConfig = {
	pollInterval: 10000,
	name: "Kraken Scraper",
	port: process.env.PORT || 3000,
	mongoLabURI: process.env.MONGOLAB_URI ,
	currencyPair: "XBTEUR"
};