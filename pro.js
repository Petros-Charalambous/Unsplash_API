const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoadet = 0;
let totalimg = 0;
//API
const count = 10;
const apiKey = '_HtB2gfugf_8IOMzGZLuHCtiCzEJlvppnYJNp5zNP68';
const apiUrl =`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


//check loader img
function imageLoaded(){
    imagesLoadet++;
    if (imagesLoadet === totalimg){
        ready=true;
        loader.hidden = true;
    }
}

//helper function element
function setAttributes(element,attributes){
    for (const key in  attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// create elements
function displayPhotos(){
    totalimg = photosArray.length;
    photosArray.forEach((photo) => {
        // <a?
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank');
        // other way to creat elements
        setAttributes(item, {
            href :photo.links.html,
            target:'_blank',
        })
        
        //img
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);

        img.addEventListener('load',imageLoaded);

        //put img inside a
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

//load


//get photos

async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    } catch (error) {
      // Catch Error Here
    }
  }


  //check to see if scrolling near bottom of page load more photos
  window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000){
       ready = false;
       getPhotos(); 
    }
  })


//onload
getPhotos();