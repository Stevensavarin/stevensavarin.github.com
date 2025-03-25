const url="data/memberLevels.json";

const dialogBox = document.querySelector("#dialogBox");
const dialogH4 = document.querySelector("#dialogBox h4");
const dialogP = document.querySelector("#dialogBox p");
const closeButton = document.querySelector("#closeButton");

const memberLevel = document.querySelector("#memberlevels");


closeButton.addEventListener("click", () => dialogBox.close());

async function apiFetch(url) {
// First:  await fetch(weatherUrl);      for the web page to responsd
// Second: await response.json(); for the web page to send us the requested data
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);    // testing
            displayMemberInfo(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
};

function displayMemberInfo(data) {
    console.log(data);

    data.memberLevels.forEach(item => {
        const levelDiv = document.createElement("div");
        levelDiv.classList.add("card");
        levelDiv.setAttribute("class", `${item.level}`);
        console.log(`memberLevels: ${item.level}`);

        levelDiv.innerHTML = `
        <h4>${item.name}</h4>
        <button>More Level Infomation</button>
        `;


        memberLevel.appendChild(levelDiv);

        levelDiv.addEventListener("click", () => {
            console.log(item);
            displayLevelDetails(item);
        });
    });
};

function displayLevelDetails(item) {
    console.log("This displayLevelsData One!");
    console.log(item);

    let memberStr = `
        <p>Membership Cost:     ${item.cost}</p>
        <p>Membership Benefits: ${item.benefits}</p>
        <p>------------------------------</p>
    `;
    console.log(`memberStr = ${memberStr}`);
    
    dialogH4.innerHTML = `${item.name}`;
    dialogP.innerHTML = `${memberStr}`;

    dialogBox.showModal();
};

apiFetch(url);