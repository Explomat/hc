var ceil = require('lodash/ceil');

/*function getPercentComplete(fact, min, targ){
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

}*/

function getPercentComplete(fact, min, targ, max){
  if (fact === ''){
    return 0;
  }

  var percent = 0;

  fact = parseFloat(fact);
  min = parseFloat(min);
  targ = parseFloat(targ);
  max = parseFloat(max);

  fact = isNaN(fact) ? '' : fact;
  min = isNaN(min) ? '' : min;
  targ = isNaN(targ) ? '' : targ;
  max = isNaN(max) ? '' : max;

  if (min === '' && max === '' && targ !== ''){
    percent = fact == targ ? 1 : 0;
  }
  else {

    if (min == targ || min === '') {
      if (max > targ) {
        percent = fact < targ ? 0 : 1;
      }
      else {
        percent = fact > targ ? 0 : 1;
      }
    }
    else {
      if (max == targ || max === ''){
        if (min < targ){
          if (fact <= min){
            percent = 0;
          }
          else {
            percent = fact < targ ? (fact - min) / (targ - min) : 1;
          }
        }
        else {
          if (fact >= min){
            percent = 0;
          }
          else {
            percent = fact > targ ? (fact - min) / (targ - min) : 1;
          }
        }
      }
      else {
        if (min < max){
          if (fact <= min) {
            percent = 0;
          }
          else {
            percent = fact <= targ ? (fact - min)/(targ - min) : 1;
          }
        }
        else {
          if (fact >= min){
            percent = 0;
          }
          else{
            percent = fact >= targ ? (fact - min)/(targ - min) : 1;
          }
        }
      }
    }
  }
  return Math.round(percent * 100);
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
		var percentComplete = getPercentComplete(t.fact, t.min, t.targ, t.max);
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