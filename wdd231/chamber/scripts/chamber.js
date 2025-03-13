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
         console.log("RESPONSE data");
         console.table(data.companies);
 
         displayBusinesses(data.companies);
    }
}   
 
const displayBusinesses = (companies) => {
     console.log("Going to DISPLAY business data");
     console.table(companies);
 
 	cards.innerHTML = "";
     
     companies.forEach((company) => {
         console.table(company);

       let card = doc.createElement('section');
       let h2 = doc.createElement('h2');
       let web = doc.createElement('p');
       let phone = doc.createElement('p');
       let logo = doc.createElement('img');
   

       h2.innerHTML = `${company.name}`;
       web.innerHTML = `${company.url}`;
       phone.innerHTML = `${company.phoneNumber}`

       logo.setAttribute('src', company.imageurl);
       logo.setAttribute('alt', `logo of ${company.name}`);
       logo.setAttribute('loading', 'lazy');
       logo.setAttribute('width', '140');
       logo.setAttribute('height', 'auto');
   
       card.appendChild(h2);
       card.appendChild(web);
       card.appendChild(phone);  
       card.appendChild(logo);
   
       cards.appendChild(card);
    });
}

