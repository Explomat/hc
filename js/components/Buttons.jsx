var React = require('react');
var AssessmentActions = require('../actions/AssessmentActions');
var BaseStore = require('../stores/BaseStore');
var Steps = require('../utils/steps');
var Config = require('../config');
var Styles = require('../styles/ButtonsClasses');
var UrlUtils = require('../utils/url');

var Buttons = React.createClass({

	propTypes(){
		return {
			printAction: React.PropTypes.string.isRequired
		}
	},

	_createMeeting(subject, attendees){
		if (!("ActiveXObject" in window) || !subject || !attendees) {
			return false;
		}

	    var olAppointmentItem = 1;
	    var olMeeting = 1;

	    try {
	    	var objOL = new ActiveXObject("Outlook.Application");
			var objAppt = objOL.CreateItem(olAppointmentItem);
	    }
	    catch(e){
	    	return false;
	    }
		
		objAppt.Subject = subject;
		// make it a meeting request;
		objAppt.MeetingStatus = olMeeting;
		objAppt.RequiredAttendees = attendees.join(';');
		objAppt.Display();
	    // End With;

		objAppt = null;
		objOL = null;
		return true;
	},

	getDefaultProps(){
		return {
			paId: '',
			printAction: ''
		}
	},

	getPrintButtonMarkup(){
		var paId = UrlUtils.getUrlParams(window.location.href, 'pa_id');
		//var curStep = BaseStore.getStep();
		return (
			<a style={Styles} href={Config.url.createPath({action_name: this.props.printAction, pa_id: paId})}>
				Распечатать бланк
			</a>
		);
	},

	getMeetingButtonMarkup(){
		var curStep = BaseStore.getStep();
		var isReady = BaseStore.isReady();
		var isBoss = BaseStore.isBoss();
		if (!isReady && (curStep === Steps.keys.fourthStep || curStep === Steps.keys.secondStep) && isBoss){
			return (
				<button onClick={this.handleCreateMeeting} style={Styles}>Назначить оценочную встречу</button>
			);
		}
		return null;
	},

	handleCreateMeeting(e){
		var self = this;
		var paId = UrlUtils.getUrlParams(window.location.href, 'pa_id');
		e.preventDefault();
		AssessmentActions.createMeeting(paId).then(function(data){
			if (!self._createMeeting(data.subject, data.attendees)) {
				alert("Откройте Outlook и назначьте встречу по оценке в удобное для Вас время.");
			}
			document.location.reload(true);
		});
	},

	render(){
		return(
			<div style={{padding: '3px', paddingBottom: '8px', 'backgroundColor': '#eee', textAlign: 'center'}}>
				{this.getPrintButtonMarkup()}
				{this.getMeetingButtonMarkup()}
			</div>
		);
	}
});

module.exports = Buttons;