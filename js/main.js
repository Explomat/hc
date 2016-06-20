var BaseController = require('./controllers/BaseController');
var UrlUtils = require('./utils/url');

window.onload = function(){
	var paId = UrlUtils.getUrlParams(window.location.href, 'pa_id');
	BaseController.start(paId);
}
