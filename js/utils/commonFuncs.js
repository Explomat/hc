var ceil = require('lodash/ceil');

function getPercentComplete(fact, min, targ){
	if (fact === '' || min === '' || targ === ''){
		return 0;
	}

	fact = Number(fact);
	min = Number(min);
	targ = Number(targ);

	if (fact <= min) {
		return 0;
	}
	var percent = ((fact - min) * 100) / (targ - min);
	return Math.round(percent > 100 ? 100 : percent);

}

function getSummWeight(tasks){
	return ceil(tasks.length === 0 ? 0 : (tasks.map(function(t){
		return Number(t.weight);
	}).reduce(function(first, second){
		return first +  second;
	})), 2);
}

function getAllPercentComplete(tasks){
	var summWeight = getSummWeight(tasks);

	return ceil((tasks.length === 0 ? 0 : (tasks.map(function(t){
		var percentComplete = getPercentComplete(t.fact, t.min, t.targ);
		return Number(t.weight) * percentComplete;
	}).reduce(function(first, second){
		return first + second;
	}))) / summWeight, 2);
}

module.exports = {
	getPercentComplete: getPercentComplete,
	getSummWeight: getSummWeight,
	getAllPercentComplete: getAllPercentComplete
}