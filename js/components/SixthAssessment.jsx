var React = require('react');
var Obj = require('../utils/object');
var assign = require('lodash/assign');
var ceil = require('lodash/ceil');
var AssessmentClasses = require('../styles/AssessmentClasses');
var ButtonsClasses = require('../styles/ButtonsClasses');
var Buttons = require('./Buttons');
var Portal = require('./modules/portal');
var BaseStore = require('../stores/BaseStore');
var filter = require('lodash/filter');

var BossInstruction = require('./instructions/BossInstruction');
var CollaboratorInstruction = require('./instructions/CollaboratorInstruction');
var AssessmentOfCompetencies = require('./AssessmentOfCompetencies');

var UrlUtils = require('../utils/url');
var config = require('../config');
var AssessmentActions = require('../actions/AssessmentActions');

var Task = React.createClass({

	render(){
		var fact = this.props.fact ? ceil(this.props.fact, 2) : this.props.fact;
		var styles = Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.td);
		var factStyles = assign(Obj.getScalarValues(AssessmentClasses.assessmentContainer.blockContainer.block.task.fact), styles);
		return(
			<tr>
				<td style={styles}>{this.props.title}</td>
				<td style={styles}>{this.props.unit}</td>
				<td style={styles}>{this.props.weight}</td>
				<td style={factStyles}>{fact}</td>
			</tr>
		);
	}
});

var MonthBlock = React.createClass({

	render(){
		if (this.props.tasks && this.props.tasks.length === 0) {
			return null;
		}
		var blockContainer = AssessmentClasses.assessmentContainer.blockContainer;
		var blockContainerStyles = Obj.getScalarValues(blockContainer);
		var titleStyles = Obj.getScalarValues(blockContainer.block.title);
		var blockStyles = Obj.getScalarValues(blockContainer.block);
		var thStyles = Obj.getScalarValues(blockContainer.block.th);
		var tasksResultStyles = Obj.getScalarValues(blockContainer.block.tasksResult);
		var ratingStyles= Obj.getScalarValues(blockContainer.block.tasksResult.rating);
		var positionDescrStyles = Obj.getScalarValues(blockContainer.block.tasksResult.rating.description);
		var ratingDescrStyles = Obj.getScalarValues(blockContainer.block.tasksResult.position.description);
		return(
			<div style={blockContainerStyles}>
				<div style={titleStyles}>{this.props.title}</div>
				<table style={blockStyles}>
					<thead>
						<tr>
							<th style={thStyles}>Наименование</th>
							<th style={thStyles}>ед. изм-я</th>
							<th style={thStyles}>вес, %</th>
							<th style={thStyles}>ФАКТ</th>
						</tr>
					</thead>
					<tbody>
						{this.props.tasks.map(function(t, index){
							return <Task key={index} {...t} />
						})}
					</tbody>
				</table>
				<div style={tasksResultStyles}>
					<span>
						<span style={positionDescrStyles}>Позиция в рейтинге: </span>
						<span> {this.props.tasksResult.position}</span>
					</span>
					<span style={ratingStyles}>
						<span style={ratingDescrStyles}>Соответствие рейтингу: </span>
						<span> {this.props.tasksResult.rating}</span>
					</span>
				</div>
			</div>
		);
	}
});

var Block = React.createClass({
	
	getInitialState(){
		return {
			isDisplayMessage: false
		}	
	},
	
	componentWillReceiveProps(){
		var isDisplayMessage = this.state.isDisplayMessage;
		var message = this.props.testInfo.message;
		if (isDisplayMessage && message !== null){
			alert(message);
			this.setState({isDisplayMessage: false});
		}
	},

	_isContainsTasks(){
		var data = this.props.monthData;
		var isContains = false;
		if (data) {
			isContains = filter(data, function(item) {
				return item.tasks.length > 0
			}).length > 0;
		}
		return isContains;
	},
	
	handleCreateTest(){
		this.setState({isDisplayMessage: true});
		var paId = UrlUtils.getUrlParams(window.location.href, 'pa_id');
		AssessmentActions.createTest(paId);
	},
	
	getTestInfoMarkup(){
		var isCollaborator = BaseStore.isCollaborator();
		var testInfo = this.props.testInfo;
		var isAssignTest = testInfo.isAssignTest;
		var isPassTest = testInfo.isPassTest;
		
		var blockContainer = AssessmentClasses.assessmentContainer.blockContainer;
		var thStyles = Obj.getScalarValues(blockContainer.block.th);
		var tdStyles = Obj.getScalarValues(blockContainer.block.task.td);
		var testInfoDescriptionStyles = Obj.getScalarValues(blockContainer.block.testInfo.description.displayDescription);
		
		if (isAssignTest){
			if (isPassTest){
				return(
					<table style={testInfoDescriptionStyles}>
						<thead>
							<tr>
								<th style={thStyles}>Название</th>
								<th style={thStyles}>Результат</th>
								<th style={thStyles}>Статус</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style={tdStyles}>{testInfo.name}</td>
								<td style={tdStyles}>{testInfo.score}</td>
								<td style={tdStyles}>{testInfo.state}</td>
							</tr>
						</tbody>
					</table>
				);
			}
			else {
				return (isCollaborator && <div>Тест назначен. Для его прохождения перейдите по ссылке, отправленной вам на почту.</div>)
			}
		}
		return (isCollaborator && <button style={ButtonsClasses} onClick={this.handleCreateTest}>Пройти тест</button>)
	},

	render(){
		var blockContainer = AssessmentClasses.assessmentContainer.blockContainer;
		var blockContainerStyles = Obj.getScalarValues(blockContainer);
		var testInfoStyles = Obj.getScalarValues(blockContainer.block.testInfo);
		return(
			<div style={blockContainerStyles}>
				<div>
					{this._isContainsTasks() && this.props.monthData.map(function(m, index){
						return <MonthBlock key={index} {...m} />
					})}
				</div>
				<div style={testInfoStyles}>
					{this.getTestInfoMarkup()}
				</div>
			</div>
		);
	}
});

var SixthAssessment = React.createClass({

	displayName: 'SixthAssessment',
	
	componentDidMount(){
		this.preventForms();	
	},
	
	preventForms(){
		var isCollaborator = BaseStore.isCollaborator();
		var block = BaseStore.getFirstBlockForSixthAssessment();
		$('form#workflow_assessment_process').submit(function(e){
			e.preventDefault();
			if (block){
				var testInfo = block.testInfo;
				if ((!testInfo.isAssignTest || !testInfo.isPassTest) && isCollaborator){
					alert("Необходимо пройти тест!");
					e.preventDefault();
				}
			}
		});
		$('form#f_switch').submit(function(e){
			if (block){
				var testInfo = block.testInfo;
				if ((!testInfo.isAssignTest || !testInfo.isPassTest) && isCollaborator){
					alert("Необходимо пройти тест!");
					e.preventDefault();
				}
			}
		})
	},
	
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

module.exports = SixthAssessment;