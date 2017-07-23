function CacheUtil(){
	this.data = {};
};
CacheUtil.prototype.set = function(key, value) {
	this.data[key] = value;
	return this.data[key];
};

CacheUtil.prototype.get = function(key) {
	return this.data[key];
};

CacheUtil.prototype.delete = function(key) {
	return (delete this.data[key]);
};

module.exports = CacheUtil