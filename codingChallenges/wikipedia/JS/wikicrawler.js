console.log('sanity check')
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
            totalsum = '';
            ulel.remove();
        } 
     	// console.log('userInput', userInput);
     	var results = fetcher(userInput);
        $('[name="inputText"]').val('').css('color', 'black');
    }
}

function fetcher(userInput){
	console.log('we are in fetcher function', userInput)
	var apiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
	var remoteUrlWithOrigin = apiUrl + userInput;
	fetch( remoteUrlWithOrigin, {
	    method: 'POST',
	    headers: new Headers( {
	        'Api-User-Agent': 'Example/1.0'
	    } )
    // Other init settings such as 'credentials'
	} ).then( function ( response ) {
	    if ( response.ok ) {
	        return response.json();
	    }
	    throw new Error( 'Network response was not ok: ' + response.statusText );
	} ).then( function ( data ) {
    	// do something with data
    	console.log(data)
    	let pagess = data.query.pages;
    	parsingData(pagess, userInput);
	});
}

function parsingData(pagess, userInput){
	// console.log(pagess)
	let fullString = '';
	let keys = Object.keys(pagess)
    	console.log(keys)
    	keys.forEach((pageid, index)=>{
    		var string = infoExtraction(pagess[pageid], userInput);
    		fullString += string;
    	})
    let count = getCount(fullString)
    presentation(count, userInput)
}

function infoExtraction(info, userInput){
	var totalsum = '';
	var title = info.title;
	var body = info.extract;
	var info = {
		title,
		body
	}
	totalsum = title + body;
	return totalsum
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
    var stringEl = document.createTextNode(`for wikipedia on: ${userInput}`);
    ulElement.appendChild(stringEl);
    article.appendChild(ulElement);
    keys.forEach((key)=>{
        let liElement = document.createElement('li');
        ulElement.appendChild(liElement);
        let textRow = document.createTextNode(`'${key}' => ${count[key]}`)
        liElement.appendChild(textRow);
    })
}



