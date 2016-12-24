var React = require('react');
var Obj = require('../utils/object');
var assign = require('lodash/assign');
var ceil = require('lodash/ceil');
var AssessmentClasses = require('../styles/AssessmentClasses');
var Buttons = require('./Buttons');
var Portal = require('./modules/portal');
var commonFuncs = require('../utils/commonFuncs');
var BaseStore = require('../stores/BaseStore');

var BossInstruction = require('./instructions/BossInstruction');
var CollaboratorInstruction = require('./instructions/CollaboratorInstruction');
var AssessmentOfCompetencies = require('./AssessmentOfCompetencies');

var config = require('../config');
//var AssessmentActions = require('../actions/AssessmentActions');


var Task = React.createClass({

	render(){
		var fact = this.props.fact ? ceil(this.props.fact, 2) : this.props.fact;
		var min = this.props.min;
		var targ = this.props.targ;
		var max = this.props.max;
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
				<td style={styles}>{commonFuncs.getPercentComplete(fact, min, targ, max)}</td>
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
		var descriptionStyles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.description);
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
				<table>
					<tbody>
						<tr>
							<td style={descriptionStyles}>Суммарный вес индивидуальных показателей</td>
							<td></td>
							<td>{commonFuncs.getSummWeight(this.props.tasks)}%</td>
						</tr>
						<tr>
							<td style={descriptionStyles}>% выполнения</td>
							<td></td>
							<td>{commonFuncs.getAllPercentComplete(this.props.tasks)}%</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

var Assessment = React.createClass({

	displayName: 'Assessment',
	
	hasPreviosAssessment(){
		var previosAssessment = BaseStore.getPreviosAssessment();
		return (previosAssessment.headers && previosAssessment.data);
	},

	getAveragePercentComplete(_blocks){
		var blocks = _blocks.filter(function(b){
			return b.tasks.length > 0
		});
		var percent = 0;
		blocks.forEach(function(b){
			percent += commonFuncs.getAllPercentComplete(b.tasks);
		});
		return ceil(percent / blocks.length, 1);
	},

	getCountBlocksWithTasks(){
		var blocks = this.props.blocks;
		return blocks.filter(function(b){
			return b.tasks.length > 0
		}).length;
	},

	render() {
		var isBoss = BaseStore.isBoss();
		var isCollaborator = BaseStore.isCollaborator();
		var percentAverage = AssessmentClasses.assessmentContainer.percentAverage;
		var percentAverageStyles = this.getCountBlocksWithTasks() > 0 ? Obj.getScalarValues(percentAverage.displayAverage) :
																		Obj.getScalarValues(percentAverage);
		
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
				<div style={percentAverageStyles}>
					<h3>Средний процент выполнения по кварталам: {this.getAveragePercentComplete(this.props.blocks)}</h3>
				</div>
				{this.hasPreviosAssessment() && <AssessmentOfCompetencies {...previosAssessment} />}
			</div>
		);
	}
});

module.exports = Assessment;