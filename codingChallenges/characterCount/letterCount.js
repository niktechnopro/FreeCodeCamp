function getCount(string) {
    var avoid = [',', '/', ' ', '&', '!', '<', '>', '?']//array of characters to ignore
    var letterCount = {};
    for (var i=0; i<string.length;i++) {
      var letter = string.charAt(i).toLowerCase();
      // if(avoid.indexOf(letter) == -1){
      if(!avoid.includes(letter)){//includes returns true or false
        (letterCount[letter]) ? letterCount[letter]++ : letterCount[letter] = 1;
      }
    }
  return letterCount;
};


console.log(getCount("Science, History, Travel, Health & Wellness, Professional Development, Photography, Cooking and much more!"))