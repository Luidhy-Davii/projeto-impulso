// menu
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav--list');
const navLinks = document.querySelectorAll('.nav--list__links');

if (mobileMenu && navList) {

    // Alternar menu
    function toggleMenu() {
        const isActive = navList.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // abrir menu
    function openMenu() {
        mobileMenu.classList.add('active');
        navList.classList.add('active');
        mobileMenu.setAttribute('aria-expanded', 'true');
    }

    // fechar
    function closeMenu() {
        // Só executa se estiver realmente aberto (evita processamento desnecessário no scroll)
        if (navList.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navList.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    }

    // Click do Mouse
    mobileMenu.addEventListener('click', toggleMenu);

    // Acessibilidade: Navegação via Teclado (Tab + Enter ou Espaço)
    mobileMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Evita scroll de página com espaço
            toggleMenu();
        }
    });

    // Fechar ao clicar nos links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fechar ao Rolar a página (Scroll)
    window.addEventListener('scroll', () => {
        closeMenu();
    });

    // Fechar ao apertar ESC (Acessibilidade)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}