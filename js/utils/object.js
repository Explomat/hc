module.exports = {
	getScalarValues: function (obj) {
		var outObj = {};
		Object.keys(obj).forEach(function(k){
			if (typeof(obj[k]) !== 'object'){
				outObj[k] = obj[k];
			}
		});
		return outObj;
	}
}