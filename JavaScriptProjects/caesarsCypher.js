//alphabet
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

var symbols = ['!', '?', '.'];

function rot13(str) {
  //let's break the string on break spaces
  //let's check if there is a known symbol at the end of the string
  if (symbols.includes(str.charAt(str.length-1))){
    var lastsymbol = str.charAt(str.length-1);
  }
  var brokenStr = str.split(' ');
  var newStr = '';
  var tempStr = '';
  //let's count how many spaces we need to add
  var empties = 1;
  for (let z of brokenStr){
    for (let i of z){
      let temp = i.toLowerCase();//let's lower case it
      if(alphabet.includes(temp)){
        let idx = alphabet.indexOf(temp);
        var newidx = idx - 13;
        if (newidx < 0){
          newidx = 26 - Math.abs(newidx);
        }
        tempStr += (alphabet[newidx]);
      }
    }
    newStr += tempStr;
    tempStr = '';
    if (empties < brokenStr.length){
      newStr += " ";
      empties += 1;
    }
  }
  if(empties === brokenStr.length && lastsymbol !== undefined){
      newStr += lastsymbol;  
    }
  let final = newStr.toUpperCase();
  console.log(`"${str}" decodes into: \n"${final}"`);
  return final;
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");//should decode to ('FREE CODE CAMP')

// rot13("SERR CVMMN!") //should decode to "FREE PIZZA!"

rot13("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK.") //should decode to "THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX."