const filterUniqueArray = (array) => {

    //filter array for only unique value
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    }
    const uniqueArray = array.filter(onlyUnique).sort()

    return uniqueArray
  }
