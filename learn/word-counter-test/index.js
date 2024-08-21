const { countWords } =  require('./node_modules.bak/word-counter');
 
const str = 'This is a string to test the word counter';
const noOfWords = countWords(str);
console.log('No of words', noOfWords);