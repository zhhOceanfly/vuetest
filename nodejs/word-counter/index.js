module.exports.countWords = (str) => {
    //Creates an array of words by splitting the string whenever a space is encountered
    const arrayOfWords = str.split(' ');
 
    //Return the length of the array i.e. number of words in the string
    return arrayOfWords.length;
}