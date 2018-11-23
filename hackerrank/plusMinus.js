function plusMinus(arr) {
    let returnArray = [];
    let devider = arr.length;
    let positive = 0;
    let negative = 0;
    let zero = 0;
    //let's filter arrays first
    for (let i=0; i<devider; i++){
      if(arr[i] < 0) negative++;
      if(arr[i] > 0) positive++;
      if(arr[i] === 0) zero++;
    }
    if(positive > 0){
      returnArray.push((Math.round(positive/arr.length*1000000)/1000000).toFixed(6));
    }else if(positive === 0){
      returnArray.push('0.000000');
    }
    if(negative > 0){
      returnArray.push((Math.round(negative/arr.length*1000000)/1000000).toFixed(6));
    }else if(negative === 0){
      returnArray.push('0.000000');
    }
    if(zero>0){
      returnArray.push((Math.round(zero/arr.length*1000000)/1000000).toFixed(6));
    }else if(zero === 0){
      returnArray.push('0.000000');
    }
    for (let i=0; i<returnArray.length; i++){
      console.log(returnArray[i]);
    }
}

//plusMinus([-4,3,-9,0,4,1]);
//plusMinus([1,-2,-7,9,1,-8,-5]);
//plusMinus([55,48,48,45,91,97,45,1,39,54,36,6,19,35,66,36,72,93,38,21,65,70,36,63,39,76,82,26,67,29,24,82,62,53,1,50,47,65,67,19,66,90,77]);
plusMinus([0,100,35,0,94,40,42,87,59,0])