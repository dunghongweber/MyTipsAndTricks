//convert string of Date to readable format 'YYYY-MM-DD' to use for moment
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

/**
  Usage example:
    console.log(formatDate('Sun May 11,2014'));
  Output:
    2014-05-11
*/
