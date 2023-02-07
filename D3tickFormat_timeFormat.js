/**
  https://github.com/d3/d3-time-format
  https://stackoverflow.com/questions/40173533/customize-the-d3-month-or-year-tick-format
*/

// basic format
var xAxis = d3.axisBottom(xScale)
  .tickFormat(d3.timeFormat("%b"));

//customize for more format
var xAxis = d3.axisBottom(xScale)
   .tickFormat(function(date){
       if (d3.timeYear(date) < date) {
         return d3.timeFormat('%b')(date);
       } else {
         return d3.timeFormat('%Y')(date);
       }
    });
