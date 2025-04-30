// Sidebar Toggle
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const sidebar = document.getElementById('sidebar');

toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggleSidebarBtn.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});