
module.exports = {
	getUrlParams: function(url, param){
		if (!url) return null;

		var vars = {};
	    url.replace(
			/[?&]+([^=&]+)=?([^&]*)?/gi,
			function( m, key, value ) {
				vars[key] = value !== undefined ? value : '';
			}
	    );

	    if (param) return vars[param];
	    return vars;
	}
}

