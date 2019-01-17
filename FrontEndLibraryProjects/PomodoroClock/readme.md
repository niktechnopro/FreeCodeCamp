## Overview of Project:
Focus! is a timer, based on pomodoro technique,  designed to maximize your effectiveness and help with time management. 

There are only so many hours in a day! Let's Focus! 

## Developed as a FreeCodeCamp project:
* **[Nikolas Bogucharsky](https://github.com/niktechnopro)**: 

## Technologies, Frameworks, and Programming Languages used:
* **Markup Languages and Style Sheets**:
    * HTML5
    * CSS
    
* **Programming Languages**:
    * JavaScript
    
* **Libraries**:
    * jQuery



## MVP (Minimum Viable Product):
* Customizable timer based on user's time input for work and break.
* Timer display that begins countdown based upon user's input.
* Timer display includes Start, Stop and Reset buttons.
* Modal window opens up on long break with jokes for entartainment.
* Website layout is clean and easy to navigate.


## Code Snippets:
```javascript
function getJoke(){
    var url='https://api.icndb.com/jokes/random?exclude=[explicit]'
    $.getJSON(url, function(result) {
        $("#chuck-joke").html(result.value.joke);
    });
    jokeInt = setTimeout(getJoke, 10000); 
}
```

## Project Screenshots:
![screenshot 1](/images/screenshot1.png "project screenshot")
![screenshot 2](/images/screenshot2.png "project screenshot")
![screenshot 3](/images/screenshot3.png "project screenshot")


