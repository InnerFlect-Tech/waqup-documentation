// Scroll to top on sidebar link clicks and ensure active state is visible
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        const navLinks = sidebar.querySelectorAll('a');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const currentUrl = window.location.href.split('#')[0];
                const linkUrl = this.href.split('#')[0];

                // If clicking the exact same page, prevent default and scroll to top
                // BUT: allow navigation if it's a parent link (even if marked active)
                // Parent links can be active when on subfolders, but should still navigate
                if (linkUrl === currentUrl) {
                    e.preventDefault();
                    // Scroll to top immediately
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return false;
                }
                
                // If it's an active link but NOT the same URL, allow navigation
                // This handles the case where parent link is active but we're on a subfolder

                // For other links, scroll to top after navigation
                // This will happen on the new page load
                sessionStorage.setItem('scrollToTop', 'true');
            });
        });

        // Scroll to top on page load if flag is set
        if (sessionStorage.getItem('scrollToTop') === 'true') {
            sessionStorage.removeItem('scrollToTop');
            // Multiple attempts to ensure scroll to top
            window.scrollTo({ top: 0, behavior: 'auto' });
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 50);
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 100);
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 200);
        }

        // Ensure active link is visible in sidebar
        const activeLink = sidebar.querySelector('a.active');
        if (activeLink) {
            // Scroll sidebar to show active link (only if it's not already visible)
            setTimeout(() => {
                const sidebarRect = sidebar.getBoundingClientRect();
                const linkRect = activeLink.getBoundingClientRect();

                // Check if link is outside visible area
                if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
                    activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                }
            }, 100);
        }
    });
})();