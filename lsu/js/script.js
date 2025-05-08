document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
    const closeSidebarBtn = document.querySelector('.close-sidebar-btn');
    const sidebar = document.querySelector('.sidebar');

    if (!toggleSidebarBtn || !closeSidebarBtn || !sidebar) {
        console.error('One or more sidebar elements not found:', {
            toggleSidebarBtn: !!toggleSidebarBtn,
            closeSidebarBtn: !!closeSidebarBtn,
            sidebar: !!sidebar
        });
        return;
    }

    function toggleSidebar() {
        if (window.innerWidth <= 768) {
            const isOpen = sidebar.classList.toggle('active');
            sidebar.setAttribute('aria-hidden', !isOpen);
            toggleSidebarBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : 'auto';
            console.log('Sidebar toggled, active:', isOpen, 'Position:', sidebar.style.right);
        }
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebar.setAttribute('aria-hidden', 'true');
        toggleSidebarBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
        console.log('Sidebar closed');
    }

    // Event Listeners
    toggleSidebarBtn.addEventListener('click', toggleSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);

    // Close sidebar when clicking outside with a slight delay
    let clickTimeout;
    document.addEventListener('click', (e) => {
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            if (!sidebar.contains(e.target) && 
                !toggleSidebarBtn.contains(e.target) && 
                sidebar.classList.contains('active')) {
                closeSidebar();
            }
        }, 100);
    });

    // Close sidebar with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            }
        });
    });

    // Handle window resize to close sidebar if screen becomes desktop-sized
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    console.log('Script loaded successfully');
});