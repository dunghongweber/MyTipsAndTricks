//In our case if two elements are a and b we want to compare a.firstname and b.firstname

users.sort(function(a, b){
    if(a.firstname < b.firstname) { return -1; }
    if(a.firstname > b.firstname) { return 1; }
    return 0;
})

/**
    OR using String.prototype.localeCompare()
    read more about localeCompare here
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
*/
users.sort((a, b) => a.firstname.localeCompare(b.firstname))
