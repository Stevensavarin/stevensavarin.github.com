const doc = document;
 const hamburgerElement = doc.querySelector('#myButton');
 const navElement = doc.querySelector('#animate');
 
 hamburgerElement.addEventListener('click', () => {
     navElement.classList.toggle('open');
     hamburgerElement.classList.toggle('open');
 });

 const url = 'data/members.json';
 const cards = document.querySelector('#cards');
   
 console.log("Going to GET business data");
 getBusinessData();
 
 async function getBusinessData() {
     const response = await fetch(url);
     if (response.ok) {
         const data = await response.json();
         //console.log("RESPONSE data");
         //console.table(data.companies);
         console.log("AWAITING RESPONSE data");
         displayBusinesses(data.companies);
    }
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
       //card.appendChild(level);  // to do
       //card.appendChild(address); // to do
       card.appendChild(web);
       card.appendChild(phone);  
       card.appendChild(logo);
   
       cards.appendChild(card);
    });
}
 
const gridButton = doc.querySelector('#select_grid');
const listButton = doc.querySelector('#select_list');
 
let gridChoice = "grid";
console.log("DEFAULT: grid");
 
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