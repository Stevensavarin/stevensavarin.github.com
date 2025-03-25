const thankyou = document.querySelector("#thankyou");
const timestamp = new(Date);

const currentUrl = window.location.href;
console.log(currentUrl);

const everything=currentUrl.split('?');
// console.log(everything);

let formData = everything[1].split("&");
// console.log(formData);

function show(info) {
    // console.log(info);
    formData.forEach((element) => {
        // console.log(element);
        if (element.startsWith(info)) {
            // console.log("Found a Match");
            result=element.split('=')[1].replace("%40","@").replace("+"," ");
        }
    });
    return (result);
}

function thanksData () {
    thankyou.innerHTML = `
        <h1>YOUR APPLICATION HAS BEEN RECEIVED</h1>
        <p>Thank you for applying for Membership Level: ${show("level")}</p>
        <p>Name: ${show("firstname")} ${show("lastname")}</p>
        <p>Your Phone: ${show("mobile")}</p>
        <p>Your Email: <a href="${show("email")}"> ${show("email")}</a></p>
        <p>Business/Organization: ${show("orgname")}</p>
        <p>Submitted on:</p>
        <p>${timestamp}</p>
        `
};

console.log("Going to execute thanksData() function")
thanksData();