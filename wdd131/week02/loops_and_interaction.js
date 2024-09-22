const DAYS = 6;
const LIMIT = 30;
let studentReport = [11, 42, 33, 64, 29, 37, 44];

// for loop
for (let i = 0; i < studentReport.length; i++) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i]);
    }
}

// while loop
let i = 0;

while (i < studentReport.length) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i]);
    }
    i++;
}

// forEach loop
studentReport.forEach(value => {
    if (value < LIMIT) {
        console.log(value);
    }
});

// for...in loop
for (let i in studentReport) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i]);
    }
}

// Use any type of repetition (looping) statement to dynamically produce the day names
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let today = new Date();

for (let i = 0; i <= DAYS; i++) {
    let nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    let dayOfWeek = nextDay.getDay();
    console.log(dayNames[dayOfWeek]);
}