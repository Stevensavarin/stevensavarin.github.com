const url = "data/discover.json";

const discoverContainer = document.querySelector("#discover-container");

async function itemsDataFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayDataInfo(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayDataInfo(data) {
    data.items.forEach(item => {
        const placeCard = document.createElement("div");
        placeCard.classList.add("card-item");

        const title = document.createElement('h2');
        title.textContent = item.name;
        placeCard.appendChild(title);

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.setAttribute('src', item.image);
        img.setAttribute('alt', item.name);
        img.setAttribute('width', '300');
        img.setAttribute('height', '200');
        img.setAttribute('loading', 'lazy');
        figure.appendChild(img);
        placeCard.appendChild(figure);

        const address = document.createElement('address');
        address.textContent = item.address;
        placeCard.appendChild(address);

        const description = document.createElement('p');
        description.textContent = item.description;
        placeCard.appendChild(description);

        const button = document.createElement('button');
        button.textContent = "Click Here";
        button.classList.add("btn")
        button.classList.add("click-here")
        placeCard.appendChild(button);

        button.addEventListener('click', () => {
            const visitMessage = generateVisitMessage(item.name);
            button.classList.add("hide-button");
            button.classList.remove("show-button");

            if (placeCard.querySelector('.visit-popup')) return;

            const popup = document.createElement('div');
            popup.classList.add('visit-popup');
            popup.textContent = visitMessage;

            const closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.classList.add('close-btn');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                popup.remove();
                button.classList.add("show-button");
            });

            popup.appendChild(closeBtn);
            placeCard.appendChild(popup);

            setTimeout(() => {
                if (placeCard.contains(popup)) {
                    popup.remove();
                    button.classList.add("show-button");
                }
            }, 5000);

            setLastVisitTime(item.name);
        });

        discoverContainer.appendChild(placeCard);
    });
}

function getLastVisitTime(cardName) {
    return localStorage.getItem(cardName);
}

function setLastVisitTime(cardName) {
    localStorage.setItem(cardName, Date.now());
}

function generateVisitMessage(cardName) {
    const storedVisit = localStorage.getItem(cardName);
    const now = Date.now();

    if (!storedVisit) {
        return "Welcome! Let us know if you have any questions.";
    }

    const timeDiff = now - storedVisit;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysAgo < 1) {
        return "Back so soon! Awesome!";
    } else {
        return `You last visited ${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    }
}

itemsDataFetch(url);