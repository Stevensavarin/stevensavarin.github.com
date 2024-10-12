const navigation = document.querySelector('#menu');

menu.addEventListener('click', () => {
	toggleMenuButton();
});


function toggleMenuButton() {
	menu.classList.toggle('show');
	layout.classList.toggle('show');
};	


let pagename = "Home Page";

const temples = [
	{
		templeName: "Aba Nigeria",
		location: "Aba, Nigeria",
		dedicated: "2005, August, 7",
		area: 11500,
		imageUrl: "images/aba-nigeria-temple.png",
			// "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
	},
	{
		templeName: "Manti Utah",
		location: "Manti, Utah, United States",
		dedicated: "1888, May, 21",
		area: 74792,
		imageUrl: "images/manti-temple.png",
			// "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
	},
	{
		templeName: "Payson Utah",
		location: "Payson, Utah, United States",
		dedicated: "2015, June, 7",
		area: 96630,
		imageUrl: "images/payson-utah-temple.png",
			// "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
	},
	{
		templeName: "Yigo Guam",
		location: "Yigo, Guam",
		dedicated: "2020, May, 2",
		area: 6861,
		imageUrl: "images/yigo_guam_temple.png",
			// "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
	},
	{
		templeName: "Washington D.C.",
		location: "Kensington, Maryland, United States",
		dedicated: "1974, November, 19",
		area: 156558,
		imageUrl: "images/washington_dc_temple.png",
			// "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
	},
	{
		templeName: "Lima Perú",
		location: "Lima, Perú",
		dedicated: "1986, January, 10",
		area: 9600,
		imageUrl: "images/lima-peru-temple.png",
			// "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
	},
	{
		templeName: "Mexico City Mexico",
		location: "Mexico City, Mexico",
		dedicated: "1983, December, 2",
		area: 116642,
		imageUrl: "images/mexico-city-temple.png",
			// "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
	},

	{
		templeName: "Portland Oregon",
		location: "Lake Oswego, Oregon, United States",
		dedicated: "1989, August, 19",
		area: 80500,
		imageUrl: "https://newsroom.churchofjesuschrist.org/media/960x540/Portland-Oregon-Temple1.jpg"
	},
	{
		templeName: "Provo City Center",
		location: "Provo, Utah, United States",
		dedicated: "2016, March, 20",
		area: 85084,
		imageUrl: "https://newsroom.churchofjesuschrist.org/media/960x540/ProvoCCTemple-Exterior-south1-2015-resized.jpg"
	},
	{
		templeName: "Seattle Washington",
		location: "Bellevue, Washington, United States",
		dedicated: "1980, November, 17",
		area: 110000,
		imageUrl: "images/seatlle-temple.png",
			// "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
	},
	// Add more temple objects here...
];

createTempleCard(temples, "Home Page");

const homelink = document.querySelector("#home");
const oldlink = document.querySelector("#old");
const utahlink = document.querySelector("#utah");
const nonutahlink = document.querySelector("#nonutah");
const newlink = document.querySelector("#new");
const largelink = document.querySelector("#large");
const smalllink = document.querySelector("#small");


homelink.addEventListener('click', () => {
	let hometemple = temples;
	createTempleCard(hometemple, "Temples Home Page");
})

utahlink.addEventListener('click', () => {
	let utah = temples.filter(temples => temples.location.includes("Utah"));
	createTempleCard(utah, "Utah Temples");
})

nonutahlink.addEventListener('click', () => {
	let nonutah = temples.filter(temples => !temples.location.includes("Utah"));
	createTempleCard(nonutah, "Non-Utah Temples");
})

newlink.addEventListener('click', () => {
	let newtemple = temples.filter(temples => (new Date(temples.dedicated).getFullYear() > 2000));
	createTempleCard(newtemple, "New Temples");
})

oldlink.addEventListener('click', () => {
	let oldtemple = temples.filter(temples => (new Date(temples.dedicated).getFullYear() < 1990));
	createTempleCard(oldtemple, "Old Temples");
})

largelink.addEventListener('click', () => {
	let largetemple = temples.filter(temples => temples.area > 90000);
	createTempleCard(largetemple, "Larger Temples");
})

smalllink.addEventListener('click', () => {
	let smalltemple = temples.filter(temples => temples.area < 100000);
	createTempleCard(smalltemple, "Smaller Temples");
})

function createTempleCard(filteredTemples, pagename) {
	document.querySelector(".container").innerHTML="";
	document.querySelector("#pagename").innerHTML="";

	let h2Title = document.createElement("h2");
	h2Title.innerHTML = `<h2 class="home">${pagename}</h2>`;
	document.querySelector("#pagename").appendChild(h2Title);


	filteredTemples.forEach(temple => {
		let card = document.createElement("div");
		card.classList.add("card");

		let name = document.createElement("h3");
		let location  = document.createElement("p");
		let dedication = document.createElement("p");
		let area = document.createElement("p");
		let img = document.createElement("img");

		name.textContent = temple.templeName;
		location.innerHTML   = `<span class="label">Location: </span> ${temple.location}`;
		dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
		area.innerHTML       = `<span class="label">Size:     </span> ${temple.area} sq ft`;
		img.setAttribute("src", temple.imageUrl);
		img.setAttribute("alt", `${temple.templeName} Temple`);
		img.setAttribute("loading", "lazy");
		img.setAttribute("width", "398");
		img.setAttribute("height", "250");

		card.appendChild(img);
		card.appendChild(name);
		card.appendChild(location);
		card.appendChild(dedication);
		card.appendChild(area);

		document.querySelector(".container").appendChild(card);
	})
}