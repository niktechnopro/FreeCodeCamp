//Given a time in -hour AM/PM format, convert it to military (24-hour) time.

// Note: Midnight is 12:00:00AM on a 12-hour clock, and 00:00:00 on a 24-hour clock. Noon is 12:00:00PM on a 12-hour clock, and 12:00:00 on a 24-hour clock.

let replacements = {
  '01' : '13',
  '02' : '14',
  '03' : '15',
  '04' : '16',
  '05' : '17',
  '06' : '18',
  '07' : '19',
  '08' : '20',
  '09' : '21',
  '10' : '22',
  '11' : '23'
}

function timeConversion(s) {
  //first let's hunt for AM or PM
  let result;
  let re = /PM/;
  let asArray = s.split(':');
  if(s.match(re)){
    if(asArray[0] !== '12'){
      let replacement = replacements[asArray[0]];
      console.log('this is PM', replacement)
      asArray.splice(0, 1, replacement);
      let backToString = asArray.join(':');
      result = backToString.replace(re, '');
    }else{
      result = s.replace(re, '');
    }
  }else{
    if (asArray[0] === '12'){
      asArray.splice(0, 1, '00');
      let backToString = asArray.join(':');
      result = backToString.replace(/AM/gi, '');
    }else{
      result = s.replace(/AM/gi, '');
    }
  }
  return (result)
}

//input 07:05:45PM

//output 19:05:45

console.log(timeConversion('12:45:54PM'));