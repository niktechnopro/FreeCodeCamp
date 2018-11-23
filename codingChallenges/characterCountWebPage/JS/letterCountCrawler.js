console.log('letter count module');
var bttn = document.querySelector('[name="button"]');

bttn.addEventListener('click', validation);

function validation(){
    var userInput = document.querySelector('[name="inputText"]').value.trim();
    if (userInput == ''){
        console.log('field is empty');
        bttn.removeEventListener('click', validation);
        $('[name="inputText"]').val('this field can not be empty').css('color', 'red');
        $('[name="inputText"]').on('focus', function(){
            $(this).val('').css('color', 'black')
            bttn.addEventListener('click', validation);
        })
    }else{
        let ulel = document.querySelector('ul');
        if (ulel){
            console.log('removing <ul> ulelement');
            ulel.remove();
        } 
        let count = getCount(userInput);
        presentation(count, userInput);
        $('[name="inputText"]').val('').css('color', 'black');
    }
}

function fetching(userInput){
    // var url = "http://crossorigin.me/" + "https://" + (userInput);
    var url = "https://my-little-cors-proxy.herokuapp.com/" + "https://" + (userInput);
    // console.log('getting url from the field', url);
    var promiseOne = $.get(url)
    promiseOne.then(result => parser(result));
}

function parser(data){
    var parser = new DOMParser();//reassembles DOM from string
    var doc = parser.parseFromString(data, "text/html");
    console.log(doc);
}

function getCount(string) {
    var letterCount = {};
    var avoid = [' ']; //leave it just in case if later want to filter some characters
    // var avoid = [',', '/', ' ', '&', '!', '<', '>', '?']//array of characters to ignore
    for (var i=0; i<string.length;i++) {
      var letter = string.charAt(i);
      if(avoid.indexOf(letter) == -1){
        (letterCount[letter]) ? letterCount[letter]++ : letterCount[letter] = 1;
      }
    }
  return letterCount;
};


function presentation(count, userInput){
    console.log('presentation envoked', count, userInput);
    var keys = Object.keys(count);
    var article = document.querySelector('article');
    var ulElement = document.createElement('ul');
    var stringEl = document.createTextNode(`for string: ${userInput}`);
    ulElement.appendChild(stringEl);
    article.appendChild(ulElement);
    keys.forEach((key)=>{
        let liElement = document.createElement('li');
        ulElement.appendChild(liElement);
        let textRow = document.createTextNode(`'${key}' => ${count[key]}`)
        liElement.appendChild(textRow);
    })
}