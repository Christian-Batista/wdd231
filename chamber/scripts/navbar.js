document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const nav = document.querySelector('nav');

    // Veriffy if the hamburger button is clicked
    if (!hamburgerBtn || !nav) {
        return;
    }

    
    // Function to alternate the active class
    function toggleActiveClass() {
        nav.classList.toggle('active');

        hamburgerBtn.textContent = nav.classList.contains('active') ? 'X' : '☰';
    }

    // Event listener to the hamburger button
    hamburgerBtn.addEventListener('click', toggleActiveClass);

    // Close the manu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburgerBtn.textContent = '☰';
        });
    })
});