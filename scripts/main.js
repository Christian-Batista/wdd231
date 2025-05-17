document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav');
    
    hamburgerBtn.addEventListener('click', () => {
        const isOpen = hamburgerBtn.classList.toggle('open');
        primaryNav.classList.toggle('open');
        
        // Mejora accesibilidad
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
      });
    
      // Cerrar al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !primaryNav.contains(e.target)) {
          hamburgerBtn.classList.remove('open');
          primaryNav.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    
      // Cerrar al redimensionar
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          hamburgerBtn.classList.remove('open');
          primaryNav.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    
    // Add active class to current page link
    const navigationLinks = Array.from(document.querySelectorAll('#primary-nav a'));
    const currentPath = window.location.pathname;
    
    navigationLinks.forEach(menuLink => {
        const linkPath = new URL(menuLink.href).pathname;
        const isHomePage = currentPath.endsWith('/') || currentPath.endsWith('index.html');
        const isHomeLink = menuLink.getAttribute('href') === '#' || menuLink.getAttribute('href') === './';
        
        // Check if current page matches link
        const isActive = isHomePage && isHomeLink || 
                        linkPath === currentPath ||
                        currentPath.includes(linkPath) && linkPath !== '/';
        
        menuLink.classList.toggle('active', isActive);
    });
});