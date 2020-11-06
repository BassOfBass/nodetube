// TODO: research it deeper and rewrite, probably as a single class
/**
 * 
 * @param {number} page 
 */
function getPreviousNumber(page) {
  let previousNumber;

  if (page == 1) {
    previousNumber = 1
  } else if (page == 2) {
    previousNumber = 1
  } else {
    previousNumber = page - 1
  }

  return previousNumber

};

/**
 * 
 * @param {number} page 
 */
function getNextNumber(page) {
  let nextNumber;

  if (page == 1) {
    nextNumber = 2
  } else if (page == 2){
    nextNumber = 3
  } else {
    nextNumber = page + 1
  }

  return nextNumber

};

/**
 * 
 * @param {number} startingNumber 
 */
function getMiddleNumber(startingNumber){
  if (startingNumber == 1) {
    return 3
  } else if (startingNumber == 2) {
    return 3
  } else {
    return startingNumber
  }
}

/**
 * 
 * @param {number} middleNumber 
 */
function createArray(middleNumber){
  let array = [];

  for (let x=0; x < 5; x++) {
    let newNumber = middleNumber - (x-2);
    array.push(newNumber)
  }

  return array.reverse()

}

/**
 * TODO: rewrite in switch case
 * @param {string} timeRange 
 */
function createEnglishString(timeRange){
  let englishString;

  if (timeRange == '1hour'){
    englishString = 'Last Hour';
  } else if(timeRange == '24hour' || timeRange == '1day'){
    englishString = 'Last Day';
  } else if (timeRange == '1week'){
    englishString = 'Last Week';
  } else if (timeRange == '1month'){
    englishString = 'Last Month';
  } else {
    return 'All Time'
  }

  return englishString
}

/**
 * 
 * @param {string} queryWithin 
 */
function createWithinString(queryWithin){
  // console.log('QUERY WITHIN' + queryWithin) ;
  let timeAgoDate;

  if (queryWithin == '1hour'){
    timeAgoDate = '?within=1hour';
  } else if(queryWithin == '24hour' || queryWithin == '1day'){
    timeAgoDate = '?within=24hour';
  } else if (queryWithin == '1week'){
    timeAgoDate = '?within=1week';
  } else if (queryWithin == '1month'){
    timeAgoDate = '?within=1month';
  } else {
    timeAgoDate = '?within=alltime';
  }

  return timeAgoDate

}

/**
 * 
 * @param {number} page 
 */
function buildPaginationObject(page) {

  return  {
    startingNumber: getMiddleNumber(page),
    numbersArray: createArray(startingNumber),
    previousNumber: getPreviousNumber(page),
    nextNumber: getNextNumber(page)
  }

}



// const pages = pagination.getPaginationArray();
// const pagination = {
//   startingNumber: pagination.getMiddleNumber(page),
//   numbersArray : pagination.createArray(startingNumber),
//   previousNumber : pagination.getPreviousNumber(page),
//   nextNumber : pagination.getNextNumber(page)
// }

module.exports = {
  getPreviousNumber,
  getNextNumber,
  getMiddleNumber,
  createArray,
  createEnglishString,
  createWithinString,
  buildPaginationObject
};