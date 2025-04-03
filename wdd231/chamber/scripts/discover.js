// Days since last visit
let daysBetweenVisits = 0;
const millisecs2Days = 86400000;

let lastVisit = new Date(0);
lastVisit = JSON.parse(localStorage.getItem("visited")) || [];
const todaysDate = Date.now();
console.log(todaysDate);

const message = document.querySelector(".visit-msg");
let msg = "";

daysBetweenVisits = ((todaysDate - lastVisit) / millisecs2Days).toFixed(0);

msg = "Welcome! Let us know if you have any questions";
if (lastVisit.length !== 0) {
  if (daysBetweenVisits==0) {
    msg = "Back so soon! Awesome!";
} else {
    msg = `You last visited ${daysBetweenVisits} day(s) ago.`;
  }
}

message.innerHTML = msg;

localStorage.setItem("visited", Date.now());