// Sidebar Toggle
const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const closeSidebarBtn = document.querySelector('.close-sidebar-btn');
const sidebar = document.querySelector('.sidebar');

function toggleSidebar() {
    const isOpen = sidebar.classList.toggle('active');
    sidebar.setAttribute('aria-hidden', !isOpen);
    toggleSidebarBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'; // Prevent scrolling when open
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    toggleSidebarBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';
}

// Event Listeners
toggleSidebarBtn.addEventListener('click', toggleSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (
        !sidebar.contains(e.target) &&
        !toggleSidebarBtn.contains(e.target) &&
        sidebar.classList.contains('active')
    ) {
        closeSidebar();
    }
});

// Keyboard Accessibility: Close sidebar with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});