function secondsToFormattedTime(durationInSeconds){
    // Formatted time is in hh:mm:ss format with no leading zeroes.
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor(durationInSeconds % 3600 / 60);
    const seconds = Math.floor(durationInSeconds % 3600 % 60);

    const formattedTime = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // https://stackoverflow.com/questions/42879023/remove-leading-zeros-from-time-format
    const removeLeadingZeroesRegex = /^0(?:0:0?)?/;
    return formattedTime.replace(removeLeadingZeroesRegex, '');
}

/**
 * @param { Date | string } dateInput
 */
function convertToInputDate(dateInput) {
  const properDate = returnDateObject(dateInput);
  let dateYear = properDate.getFullYear().toString().padStart(4,'0');
  let dateMonth = fixMonth(properDate);
  let dateDay = properDate.getDate().toString().padStart(2,'0');
  let dateString = `${dateYear}-${dateMonth}-${dateDay}`;

  return dateString;

  /**
   * https://stackoverflow.com/a/643827/14481500
   * @param {string | Date} date 
   * @returns {Date}
   */
  function returnDateObject(date) {

    // if `date` is not `Date` object
    if (!Object.prototype.toString.call(date) === '[object Date]') {

      return new Date(date);

    } else {

      return date;

    }
  }

  /**
   * The `value` attribute of `date` inputs count as 1-12, while `Date`'s are 0 - 11.
   * @param {Date} date 
   */
  function fixMonth(date) {
    let month = date.getMonth() + 1;

    return month.toString().padStart(2,'0');

  }
}

module.exports = {
  secondsToFormattedTime,
  convertToInputDate
};
