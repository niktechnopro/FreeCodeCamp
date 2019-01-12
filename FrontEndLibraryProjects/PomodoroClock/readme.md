## Overview of Project:
Focus! is a timer, based on pomodoro technique,  designed to maximize your effectiveness and help with time management. 

There are only so many hours in a day! Let's Focus! 

## The Team:
* **[Nikolas Bogucharsky](https://github.com/niktechnopro)**: 
	* **Primary team role**: Timer logic, design contributor
  	* **Contributions**:  Timer, event listeners, jQuery effects, audio notification, jokes API 
  	* **Key code portions**: JavaScript, portion of HTML and CSS effects

* **[Taylor Whitlatch](https://github.com/TaylorWhitlatch)**: 
	* **Primary team role**: Front-End Styling
  	* **Contributions**:  HTML, CSS, Modal 
  	* **Key code portions**: Most of the HTML and CSS

* **[Saif Mahmud](https://github.com/saiftg)**:
	* **Primary team role**: Logic contributor
  	* **Contributions**:  Debugging, refactoring
  	* **Key code portions**: JavaScript, Some HTML, CSS 

* **[Zach Dunn](https://github.com/ZachDunn8)**: 
	* **Primary team role**: design contributor
  	* **Contributions**:  Spotify widget(was not included)
  	* **Key code portions**: JavaScript, Some CSS and HTML

* **[Jennifer Menze](https://github.com/jamenze)**: 
  	* **Primary team role**: Prototype, Styling
  	* **Contributions**:  Website name, layout, icon and technical writing. Assisted with implementing design.
  	* **Key code portions**: Website wireframe, README file, Some HTML and CSS


## Technologies, Frameworks, and Programming Languages used:
* **Markup Languages and Style Sheets**:
    * HTML (HTML5)
    * CSS

* **Frameworks**:
    * Bootstrap
    
* **Programming Languages**:
	* JavaScript
    
* **Libraries**:
    * jQuery



## MVP (Minimum Viable Product):
* Customizable timer based on user's time input for work and break.
* Timer display that begins countdown based upon user's input.
* Timer display includes Start and Reset buttons.
* Modal window opens up on long break with jokes for entartainment.
* Website layout is clean and easy to navigate.


## Code Snippets:
```javascript
function getJoke(){
    var url='https://api.icndb.com/jokes/random?exclude=[explicit]'
    $.getJSON(url, function(result) {
        $("#chuck-joke").html(result.value.joke);
        console.log("new joke", result)
    });
    jokeInt = setTimeout(getJoke, 10000); 
}
```

## Project Screenshots:
![screenshot](/images/screenshot2.png "project screenshot")
![screenshot 2](/images/screenshot.png "project screenshot")
![screenshot 1](/images/screenshot1.png "project screenshot")
![screenshot 3](/images/screenshot3.png "project screenshot")


## 3 Contributions We’d Like to See:
1. Incorporate periodic displays of encouraging quotes and messages to inspire the user to keep working hard!
2. User is given an option to log work and rest time for later retrieval.
3. Add animations to timer display with canvas.

