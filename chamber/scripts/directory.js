document.addEventListener('DOMContentLoaded', async () => {
    const gridbutton = document.querySelector("#grid");
    const listbutton = document.querySelector("#list");
    const display = document.querySelector(".members-container");
    const article = document.querySelector('article');

    gridbutton.addEventListener("click", () => {
        // example using arrow function
        display.classList.add("grid");
        display.classList.remove("list");
    });

    listbutton.addEventListener("click", showList);

    function showList() {
        display.classList.add("list");
        display.classList.remove("grid");
    }
    
    // Cargar datos de miembros
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const members = await response.json();
        displayMembers(members);
        
        // Event listeners para cambiar vista
        gridbutton.addEventListener("click", () => {
            display.classList.add("grid");
            display.classList.remove("list");
        });
        
        listbutton.addEventListener("click", () => {
            display.classList.add("list");
            display.classList.remove("grid");
        });
        
    } catch (error) {
        console.error('Error fetching members:', error);
        display.innerHTML = '<p>We are sorry, but there was an error loading members.</p>';
    }
});

function displayMembers(members) {
    const container = document.querySelector('.members-container');
    container.innerHTML = '';
    
    members.forEach(member => {
        const memberElement = document.createElement('section');
        memberElement.classList.add('member-card');
        
        // Determinar nivel de membresía
        let membershipLevel = '';
        switch(member.membership) {
            case 1: membershipLevel = 'Basic Member'; break;
            case 2: membershipLevel = 'Silver Member'; break;
            case 3: membershipLevel = 'Gold Member'; break;
            default: membershipLevel = 'Member'; break;
        }
        
        const imagePath = `https://christian-batista.github.io/wdd231/chamber/images/members/${member.image}`;
        const defaultImage = 'https://christian-batista.github.io/wdd231/chamber/images/members/default.jpg';
        
        memberElement.innerHTML = `
            <img src="${imagePath}" alt="${member.name}" loading="lazy"
                 onerror="this.onerror=null;this.src='${defaultImage}';">
            <h3>${member.name}</h3>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Go to Website</a>
            <p class="membership ${getMembershipClass(member.membership)}">${membershipLevel}</p>
            <p class="description">${member.description}</p>
        `;
        
        container.appendChild(memberElement);
    });
}


function getMembershipClass(level) {
    switch(level) {
        case 1: return 'basic-member';
        case 2: return 'silver-member';
        case 3: return 'gold-member';
        default: return '';
    }
}