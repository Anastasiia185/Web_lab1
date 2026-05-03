(function() {
    'use strict';

    const sidebar = document.getElementById('sidebarMenu');
    const toggleBtn = document.getElementById('sidebarToggleBtn');

    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle('show');
        }
    }

    function closeSidebarOnMobile() {
        if (window.innerWidth < 768 && sidebar) {
            sidebar.classList.remove('show');
        }
    }

    // Обробник кліку на кнопку-бургер
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }

    // Закриття меню при кліку на посилання в сайдбарі (на мобільних)
    if (sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('.nav-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('show');
                }
            });
        });
    }

    // При зміні розміру вікна закриваємо меню
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && sidebar) {
            sidebar.classList.remove('show');
        }
    });

})();