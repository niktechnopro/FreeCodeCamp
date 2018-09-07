
var mainImage = document.querySelector('[data-frame]');
var link = document.querySelector('[data-link]');
var image = document.querySelector('[data-pic]');
var iframe = document.createElement('iFrame');
var main = document.querySelector('[name="bigPic"]');
var pEl = document.createElement('p');
var text = document.createTextNode("Click on 'amazing story' link again to comeback to picture mode");
link.addEventListener('click', youTube);
var count = 1;
function youTube(){
    if (count % 2 != 0){
        image.classList.add('hide');
        mainImage.appendChild(iframe);
        iframe.setAttribute('src', 'https://www.youtube.com/embed/kd3bA1mRAn8');
        iframe.setAttribute('allowFullScreen', '');
        mainImage.appendChild(pEl);
        pEl.appendChild(text);
    }else{
        mainImage.removeChild(iframe);
        mainImage.removeChild(pEl);
        image.classList.remove('hide');
        main.setAttribute('src', "http://nola.space/wp-content/uploads/2018/02/arnold-blueprint-ebook-new-young-arnold-schwarzenegger-posing-900c2971328.png")
    }
    count ++;
}