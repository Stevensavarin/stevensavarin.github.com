let year = new Date().getFullYear();
let lastModified = document.lastModified;
const author = "Steven Savarin";
const place = "Valencia, Venezuela";

document.getElementById("name").innerHTML = `© ${year} 💻 ${author} 💻 ${place}`;
document.getElementById("changes").innerHTML = `Last Modified: ${lastModified}`;