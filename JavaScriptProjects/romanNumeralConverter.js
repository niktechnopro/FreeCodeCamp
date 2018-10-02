

//version 1
let convertToRoman = function(num) {

  var decimalValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
  var romanNumeral = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

  var romanized = '';

  for (let i=0; i<decimalValue.length; i++){
    while(num>=decimalValue[i]){
      romanized += romanNumeral[i];
      num -= decimalValue[i]
    }
  }
  console.log(romanized);
  return romanized;
}


convertToRoman(36);

//version2 - using the object
// let convertToRoman = function(num) {
//   const conversions = {
// 	'1': 'I',
//   	'4': 'IV',
// 	'5': 'V',
//   	'9': 'IX',
// 	'10': 'X',
// 	'40': 'XL',
// 	'50': 'L',
//   	'90': 'XC',
// 	'100': 'C',
//   	'400': 'CD',
// 	'500': 'D',
// 	'900': 'CM',
// 	'1000': 'M' 
//   }
//   var romanized = '';
//   //let's extract keys
//   let numbers = Object.keys(conversions);
//   for (let i=numbers.length-1; i>=0; i--){
//     while(num >= numbers[i]){

//       romanized += conversions[numbers[i]];
//       num -= numbers[i]
//     }
//   }
//   console.log(romanized);
//   return romanized;
// }

// // test here
// // convertToRoman(4);
// convertToRoman(798);// should return "DCCXCVIII"