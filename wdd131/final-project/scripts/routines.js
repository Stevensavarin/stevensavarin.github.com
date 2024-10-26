// Get the DOM elements for the "Next" and "Previous" buttons
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

// Get the main carousel DOM element and specific elements within it
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

// Append the first thumbnail item to the thumbnail container initially
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

// Time settings: how long the transition effect lasts and auto-slide interval
let timeRunning = 3000;
let timeAutoNext = 700000;

// Set the onclick event for the "Next" button to trigger the next slide
nextDom.onclick = function(){
    showSlider('next');  // Call showSlider() function with 'next' argument
}

// Set the onclick event for the "Previous" button to trigger the previous slide
prevDom.onclick = function(){
    showSlider('prev');
}

let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext);

// Function to handle sliding the carousel in "next" or "prev" direction
function showSlider(type){
    // Get all the current slider items and thumbnail items
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    // If 'next' is clicked, move the first item to the end of the list (carousel and thumbnails)
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    // Clear any existing timeout for the transition effect removal
    clearTimeout(runTimeOut);
    
    // After the transition (timeRunning), remove the 'next' and 'prev' classes to reset state
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    // Clear the existing auto-slide timeout
    clearTimeout(runNextAuto);
    
    // Restart the auto-slide to next after timeAutoNext interval
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext);
}
