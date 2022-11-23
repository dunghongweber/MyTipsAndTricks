//use this hook or install lodash and use lodash.startCase()
const useCapitalizeText = () => {

  const capitalizeText = (text) => {
    
    const words = text.split(' ') //split text of sentence into words

    //capitalize first letter of every word
    if (words.length > 1) {
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1)
      }

      return words.join(' ') //join all words back into a sentence
    } else {
      //just capitalize 1st letter of a single word
      return text.charAt(0).toUpperCase() + text.slice(1)
    }
  }
  
  return { capitalizeText }
}

export default useCapitalizeText
