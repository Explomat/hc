var AssessmentController = require('./controllers/AssessmentController');
var ButtonsController = require('./controllers/ButtonsController');
var UrlUtils = require('./utils/url');

window.onload = function(){
	var paId = UrlUtils.getUrlParams(window.location.href, 'pa_id');
	AssessmentController.start(paId).then(function(){
		ButtonsController.start(paId);
	});
}
