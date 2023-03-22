/**
  Convert milliseconds into date and time
*/
//Moment parser
moment(1454521239279).format("DD MMM YYYY hh:mm a") //parse integer
moment("1454521239279", "x").format("DD MMM YYYY hh:mm a") //parse string
//Moment unix method
moment.unix(1454521239279/1000).format("DD MMM YYYY hh:mm a")

/**
  Moment Add
  https://momentjscom.readthedocs.io/en/latest/moment/03-manipulating/01-add/
*/
