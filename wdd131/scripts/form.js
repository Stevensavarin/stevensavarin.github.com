const products = [
    {
      id: "el-3021",
      name: "Energy Loop",
      averagerating: 4.8
    },
    {
      id: "gr-2077",
      name: "Gravity Boots",
      averagerating: 4.2
    },
    {
      id: "ct-2099",
      name: "Chrono Tracker",
      averagerating: 4.0
    },
    {
      id: "ss-2100",
      name: "Solar Shield",
      averagerating: 3.8
    },
    {
      id: "hv-1985",
      name: "Hyper Velocity Engine",
      averagerating: 5.0
    }
  ];

products.forEach(product => {
  let productHTML = document.createElement("option");
  productHTML.setAttribute("value", `${product.name}`);
  productHTML.innerHTML = product.name;
  document.getElementById("prodName").appendChild(productHTML);
});


let numberReviews = Number(window.localStorage.getItem("numberReviews-ls"));
numberReviews.textContent = `Number of reviews submitted: ${numberReviews}`;

numberReviews++;
localStorage.setItem("numberReviews-ls", numberReviews);

// script for name and date

let year = new Date().getFullYear();
let lastModified = document.lastModified;
const author = "Steven Savarin";
const place = "Valencia, Venezuela";

document.getElementById("names").innerHTML = `© ${year} 💻 ${author} 💻 ${place}`;
document.getElementById("changes").innerHTML = `Last Modified: ${lastModified}`;