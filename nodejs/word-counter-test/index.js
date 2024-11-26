const { countWords } =  require('./node_modules/zhh-counter');
 
const str = 'This is a string to test the word counter';
const noOfWords = countWords(str);
console.log('No of words', noOfWords);