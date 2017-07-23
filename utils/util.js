var Util = {};

Util.findKeywordInCollection = function(keyword, collection) {
	var results = [];
	collection.forEach(function(c) {
		var str = JSON.stringify(c).toLowerCase();
		var index = str.indexOf(keyword.toLowerCase());
		console.log("SEARCH index = ", index,'str = ', str);
		if( index !== -1) {
			results.push(c);
		}
	});
	return results;
}
module.exports = Util;