const doc = document;
 const hamburgerElement = doc.querySelector('#myButton');
 const navElement = doc.querySelector('#animate');
 
 hamburgerElement.addEventListener('click', () => {
     navElement.classList.toggle('open');
     hamburgerElement.classList.toggle('open');
 });

 const membersURL = 'data/members.json';
 const cards = document.querySelector('#cards');
   
 console.log("Going to GET business data");
 getBusinessData();
 
 async function getBusinessData() {
    const response = await fetch(membersURL);
    if (response.ok) {
        const data = await response.json();
        console.log("AWAITING RESPONSE data");
        console.table(data.companies);

        if (spotlight == true) {
            let newList = createGoldSilverArray(data.companies);
            console.table(newList);
            let randList = create3RandomBusinesses(newList);
            displayBusinesses(randList);
        } else {
            displayBusinesses(data.companies);
        };
    };
}   
 
const displayBusinesses = (companies) => {
     console.log("Going to DISPLAY business data");
     console.table(companies);
     console.log(`Current grid choise is: ${gridChoice}`);

 	cards.innerHTML = "";
     
     companies.forEach((company) => {
         //console.table(company);

        let card = doc.createElement('section');
        let h2 = doc.createElement('h2');
        let level = doc.createElement('p');
        let address = doc.createElement('p');
        let web = doc.createElement('p');
        let phone = doc.createElement('p');
        let logo = doc.createElement('img');
   
       h2.innerHTML = `${company.name}`;
       h2.setAttribute("class", "buss_name");
       if (company.memberLevel == 3) {
            level.innerHTML = `Gold Level - &#x2605&#x2605&#x2605`;
       } else if (company.memberLevel == 2) {
            level.innerHTML = `Silver Level - &#x2605&#x2605`;           
       }
    address.innerHTML = `${company.address}`;
    address.setAttribute("class", "addr");
       web.innerHTML = `${company.url}`;
       web.setAttribute("class", "web_url");
       phone.innerHTML = `${company.phoneNumber}`
       phone.setAttribute("class", "phone");
       
       logo.setAttribute('src', company.imageurl);
       logo.setAttribute('alt', `logo of ${company.name}`);
       logo.setAttribute('loading', 'lazy');
       //logo.setAttribute('width', '140'); // to check
       //logo.setAttribute('height', 'auto'); // to check
       logo.setAttribute('class', 'business-logo'); // to check
   
       card.appendChild(h2);
       card.appendChild(level);
       card.appendChild(address);
       card.appendChild(web);
       card.appendChild(phone);  
       card.appendChild(logo);
   
       cards.appendChild(card);
    });
}
 
const gridButton = doc.querySelector('#select_grid');
const listButton = doc.querySelector('#select_list');
 
function createGoldSilverArray(companies) {
    console.log("Going to create GoldSilver array");

    let goldSilver = [];
    companies.forEach((company) => {
        if (company.memberLevel>1)
            goldSilver.push(company);
    });
    console.log(goldSilver);
    return goldSilver;
};

let gridChoice = "grid";
console.log("DEFAULT: grid");

function create3RandomBusinesses(array) {
    // Using Fisher-Yates shuffle algorithm for unique random values
    let businesses = [];

    for (let i = array.length -1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    businesses = array.slice(0,3);
    return businesses;
}
 
gridButton.addEventListener('click', () => {
    console.log("gridButton clicked");
    gridChoice = "grid";
    cards.setAttribute('class', gridChoice);
});

listButton.addEventListener('click', () => {
    console.log("listButton clicked");
    gridChoice = "list";
    cards.setAttribute('class', gridChoice);
});