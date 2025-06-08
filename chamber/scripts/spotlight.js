document.addEventListener('DOMContentLoaded', async () => {
    try {

        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const members = await response.json();
        const spotlightMembers = getRandomMembers(members, 3);
        displaySpotlightMembers(spotlightMembers);
        
    } catch (error) {
        console.error('Error loading spotlight members:', error);
        const container = document.querySelector('.business-spotlight-container');
        container.innerHTML = '<p class="error">Error loading featured businesses. Please try again later.</p>';
    }
});

    /**
     * Selects a random subset of eligible members based on membership level.
     * 
     * Filters the members to include only those with a membership level of 2 or higher.
     * Then shuffles the eligible members and returns a specified count of them.
     * 
     * @param {Array} members - An array of member objects to choose from.
     * @param {number} count - The number of random members to select.
     * @returns {Array} A random subset of eligible members.
     */


    /**
     * Selects a random subset of eligible members based on membership level.
     *
     * Filters the members to include only those with a membership level of 2 or higher.
     * Then shuffles the eligible members and returns a specified count of them.
     *
     * @param {Array} members - An array of member objects to choose from.
     * @param {number} count - The number of random members to select.
     * @returns {Array} A random subset of eligible members.
     */
    function getRandomMembers(members, count) {
        const eligibleMembers = members.filter(member => member.membership >= 2);
        const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    /**
     * Displays a set of spotlight members in the designated container on the page.
     * This function selects the container with the class 'business-spotlight-container'
     * and populates it with member information, including name, description, address,
     * phone, website, and membership level. Each member is displayed as a card with 
     * their details and an image. If the image fails to load, a default image is used.
     * 
     * @param {Array} members - An array of member objects to display. Each member object
     * should have properties: name, description, address, phone, website, image, and membership.
     */
    function displaySpotlightMembers(members) {
        const container = document.querySelector('.business-spotlight-container');
        if (!container) return;
        
        container.innerHTML = members.map(member => `
            <div class="business-spotlight-card">
                <div class="business-header">
                    <h2>${member.name}</h2>
                    <p class="tagline">${member.description}</p>
                    <div class="divider"></div>
                </div>
                <div class="business-content">
                    <div class="business-image">
                        <img src="https://christian-batista.github.io/wdd231/chamber/images/members/${member.image}" alt="${member.name}" 
                            onerror="this.onerror=null;this.src='images/members/default.jpg';">
                    </div>
                    <div class="business-info">
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Website:</strong> 
                            <a href="${member.website}" target="_blank" rel="noopener">${new URL(member.website).hostname}</a>
                        </p>
                    </div>
                </div>
                <div class="membership-badge ${getMembershipClass(member.membership)}">
                    ${getMembershipLevel(member.membership)}
                </div>
            </div>
        `).join('');
    }

    /**
     * Returns the class name for a membership level.
     * @param {number} level - The membership level.
     * @returns {string} The class name for the membership level.
     */
    function getMembershipClass(level) {
        return ['basic-member', 'silver-member', 'gold-member'][level - 1] || '';
    }

    /**
     * Returns the text for a membership level.
     * @param {number} level - The membership level.
     * @returns {string} The text for the membership level.
     */
    function getMembershipLevel(level) {
        return ['Basic', 'Silver', 'Gold'][level - 1] || '' + ' Member';
    }