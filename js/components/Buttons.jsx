var React = require('react');
var AssessmentActions = require('../actions/AssessmentActions');
var AssessmentStore = require('../stores/AssessmentStore');
var Steps = require('../utils/steps');
var Config = require('../config');

var Styles = {
	backgroundColor: '#eeeeee',
    backgroundImage: 'url(/pics/bg_btn_grey.png)',
    color: '#666',
    backgroundPosition: 'left center',
    backgroundRepeat: 'repeat-x',
    border: 'solid 2px #FFFFFF',
    padding: '3px 15px 3px 15px',
    textAlign: 'center',
    margin: '0'
}

var Buttons = React.createClass({

	_createMeeting(subject, attendees){
		if (!("ActiveXObject" in window) || !subject || !attendees) {
			return;
		}

	    var olAppointmentItem = 1;
	    var olMeeting = 1;

		var objOL = new ActiveXObject("Outlook.Application");
		var objAppt = objOL.CreateItem(olAppointmentItem);
		objAppt.Subject = subject;
		// make it a meeting request;
		objAppt.MeetingStatus = olMeeting;
		objAppt.RequiredAttendees = attendees.join(';');
		objAppt.Display();
	    // End With;

		objAppt = null;
		objOL = null;

	},

	getDefaultProps(){
		return {
			paId: ''
		}
	},

	getPrintButtonMarkup(){
		var curStep = AssessmentStore.getStep();
		if (curStep === Steps.keys.secondStep || curStep === Steps.keys.thirdStep){
			return (
				<a style={Styles} href={Config.url.createPath({action_name: 'createFile', pa_id: this.props.paId})}>
					Распечатать бланк
				</a>
			);
		}
		return null;
	},

	getMeetingButtonMarkup(){
		var curStep = AssessmentStore.getStep();
		var isReady = AssessmentStore.isReady();
		var isBoss = AssessmentStore.isBoss();
		if (!isReady && curStep === Steps.keys.secondStep && isBoss){
			return (
				<button onClick={this.handleCreateMeeting} style={Styles}>Назначить встречу</button>
			);
		}
		return null;
	},

	handleCreateMeeting(e){
		var self = this;
		e.preventDefault();
		AssessmentActions.createMeeting(this.props.paId).then(function(data){
			self._createMeeting(data.subject, data.attendees);
			document.location.reload(true);
		});
	},

	render(){
		return(
			<div>
				{this.getPrintButtonMarkup()}
				{this.getMeetingButtonMarkup()}
			</div>
		);
	}
});

module.exports = Buttons;