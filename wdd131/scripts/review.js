const reviewsDisplay = document.querySelector("#review");

let numberReviews = Number(window.localStorage.getItem("numberReviews-ls")) || 0;

reviewsDisplay.textContent = numberReviews;
numberReviews++;

localStorage.setItem("numberReviews-ls", numberReviews);

// script for name and date

let year = new Date().getFullYear();
let lastModified = document.lastModified;
const author = "Steven Savarin";
const place = "Valencia, Venezuela";

document.getElementById("names").innerHTML = `© ${year} 💻 ${author} 💻 ${place}`;
document.getElementById("changes").innerHTML = `Last Modified: ${lastModified}`;