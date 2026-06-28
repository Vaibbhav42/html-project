function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);

    const lightBtn = document.getElementById('lightThemeBtn');
    const darkBtn = document.getElementById('darkThemeBtn');

    if (lightBtn && darkBtn) {
        lightBtn.classList.toggle('active', theme === 'light');
        darkBtn.classList.toggle('active', theme === 'dark');
    }
}

async function loadSharedLayout() {
    const sidebarContainer = document.getElementById('sidebar-container');
    const navbarContainer = document.getElementById('navbar-container');

    if (sidebarContainer) {
        const sidebarResponse = await fetch('components/sidebar.html');
        sidebarContainer.innerHTML = await sidebarResponse.text();
    }

    if (navbarContainer) {
        const navbarResponse = await fetch('components/navbar.html');
        navbarContainer.innerHTML = await navbarResponse.text();
    }

    const pageTitle = document.body.dataset.pageTitle || document.title;
    const pageTitleElement = document.getElementById('pageTitle');

    if (pageTitleElement) {
        pageTitleElement.textContent = pageTitle;
    }

    const activePage = document.body.dataset.activePage || '';
    document.querySelectorAll('.nav-item').forEach((item) => {
        item.classList.toggle('active', item.dataset.page === activePage);
    });

    const savedTheme = localStorage.getItem('site-theme') || 'light';
    setTheme(savedTheme);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSharedLayout);
} else {
    loadSharedLayout();
}

window.setTheme = setTheme;
window.loadSharedLayout = loadSharedLayout;