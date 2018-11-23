let grades = [ 73, 67, 38, 33 ];

function gradingStudents(grades) {
    let newArray = [];
    let numberOfStudents = grades.legnth;
    //first we need to iterate through grades
    for (let i = 0; i<grades.length; i++){
      let currentGrade = grades[i];
      if (currentGrade >= 38 ){
        //let's check conditions of multiple of 5
        let possibleNumber = Math.round(Math.ceil(currentGrade /5));
        //let's find the difference 
        let diff = (possibleNumber * 5) - currentGrade;
        if (diff < 3){
          currentGrade = possibleNumber * 5;
        }
      }
      newArray[i] = currentGrade;
    }
    return newArray;
}


console.log(gradingStudents(grades));
