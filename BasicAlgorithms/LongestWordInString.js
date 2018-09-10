function findLongestWordLength(str) {
	//first let's split the sentence into words
	let array = str.split(' ');	
  //second let's find longest word
  let longest = array[0];
  for (let i=1; i<array.length; i++){
    if (longest.length<array[i].length){
      longest = array[i];
    }
  }
  console.log(longest.length); 
  return longest.length;//returns the length of the longest word
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");