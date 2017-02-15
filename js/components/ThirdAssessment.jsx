var React = require('react');
// var commonFuncs = require('../utils/commonFuncs');
var Obj = require('../utils/object');
var ceil = require('lodash/ceil');
var assign = require('lodash/assign');
var AssessmentClasses = require('../styles/AssessmentClasses');
var Buttons = require('./Buttons');
var Portal = require('./modules/portal');
var BaseStore = require('../stores/BaseStore');

var BossInstruction = require('./instructions/BossInstruction');
var CollaboratorInstruction = require('./instructions/CollaboratorInstruction');
var AssessmentOfCompetencies = require('./AssessmentOfCompetencies');

var config = require('../config');
//var AssessmentActions = require('../actions/AssessmentActions');

var Task = React.createClass({

	render(){
		var min = this.props.min ? ceil(this.props.min, 2) : this.props.min;
		var targ = this.props.targ ? ceil(this.props.targ, 2) : this.props.targ;
		var max = this.props.max ? ceil(this.props.max, 2) : this.props.max;
		var fact = this.props.fact ? ceil(this.props.fact, 2) : this.props.fact;
		var percent = this.props.percent ? ceil(this.props.percent, 2) : this.props.percent;
		var styles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td);
		var factStyles = assign(Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.fact), styles);
		return(
			<tr>
				<td style={styles}>{this.props.title}</td>
				<td style={styles}>{this.props.unit}</td>
				<td style={styles}>{this.props.weight}</td>
				<td style={styles}>{min}</td>
				<td style={styles}>{targ}</td>
				<td style={styles}>{max}</td>
				<td style={factStyles}>{fact}</td>
				<td style={styles}>{percent}</td>
			</tr>
		);
	}
});

var Block = React.createClass({

	render(){
		if (this.props.tasks && this.props.tasks.length === 0) {
			return null;
		}
		var blockContainerStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer);
		var titleStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.title);
		var blockStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block);
		var thStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.th);
		return(
			<div style={blockContainerStyles}>
				<div style={titleStyles}>{this.props.title}</div>
				<table style={blockStyles}>
					<thead>
						<tr>
							<th style={thStyles}>Наименование</th>
							<th style={thStyles}>ед. изм-я</th>
							<th style={thStyles}>вес, %</th>
							<th style={thStyles}>MIN</th>
							<th style={thStyles}>TARG</th>
							<th style={thStyles}>MAX</th>
							<th style={thStyles}>ФАКТ</th>
							<th style={thStyles}>% выполнения</th>
						</tr>
					</thead>
					<tbody>
						{this.props.tasks.map(function(t, index){
							return <Task key={index} {...t} />
						})}
					</tbody>
				</table>
			</div>
		);
	}
});

var ThirdAssessment = React.createClass({

	displayName: 'ThirdAssessment',
	
	hasPreviosAssessment(){
		var previosAssessment = BaseStore.getPreviosAssessment();
		return (previosAssessment.headers && previosAssessment.data);
	},

	render() {
		var isBoss = BaseStore.isBoss();
		var isCollaborator = BaseStore.isCollaborator();
		var previosAssessment = BaseStore.getPreviosAssessment();
		return (
			<div>
				<Portal nodeId={config.dom.buttonsId}>
					<Buttons printAction={'createFile'} />
				</Portal>
				<Portal nodeId={config.dom.instructionId}>
					{(isBoss && !isCollaborator) && <BossInstruction />}
					{((isCollaborator && isBoss) || (!isBoss && isCollaborator)) && <CollaboratorInstruction />}
				</Portal>
				{this.props.blocks.map(function(b, index){
					return <Block key={index} {...b} />
				})}
				{this.hasPreviosAssessment() && <AssessmentOfCompetencies {...previosAssessment} />}
			</div>
		);
	}
});

module.exports = ThirdAssessment;