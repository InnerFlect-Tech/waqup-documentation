// Navigation structure - Single Source of Truth
// This file defines the complete navigation structure for all documentation pages

const navigationStructure = {
    groups: [
        {
            title: 'Foundation',
            items: [
                {
                    id: '01-product-constitution',
                    name: 'Product Constitution',
                    path: '01-product-constitution/index.html',
                    subfolders: []
                },
                {
                    id: '02-scientific-foundations',
                    name: 'Scientific Foundations',
                    path: '02-scientific-foundations/index.html',
                    subfolders: [
                        { name: 'Core Principles', path: '02-scientific-foundations/core-principles/index.html' },
                        { name: 'Application', path: '02-scientific-foundations/application/index.html' }
                    ]
                }
            ]
        },
        {
            title: 'User Experience',
            items: [
                {
                    id: '03-conversational-and-ritual-system',
                    name: 'Conversational & Ritual System',
                    path: '03-conversational-and-ritual-system/index.html',
                    subfolders: [
                        { name: 'Content Types', path: '03-conversational-and-ritual-system/content-types/index.html' },
                        { name: 'Features And Journeys', path: '03-conversational-and-ritual-system/features-and-journeys/index.html' },
                        { name: 'State Machine', path: '03-conversational-and-ritual-system/state-machine/index.html' }
                    ]
                },
                {
                    id: '04-ai-voice-and-ethics',
                    name: 'AI Voice & Ethics',
                    path: '04-ai-voice-and-ethics/index.html',
                    subfolders: [
                        { name: 'Voice And Tone', path: '04-ai-voice-and-ethics/voice-and-tone/index.html' },
                        { name: 'Ethical Boundaries', path: '04-ai-voice-and-ethics/ethical-boundaries/index.html' },
                        { name: 'Privacy And Consent', path: '04-ai-voice-and-ethics/privacy-and-consent/index.html' }
                    ]
                }
            ]
        },
        {
            title: 'Technical',
            items: [
                {
                    id: '05-system-architecture',
                    name: 'System Architecture',
                    path: '05-system-architecture/index.html',
                    subfolders: [
                        { name: 'Core Architecture And Apis', path: '05-system-architecture/core-architecture-and-apis/index.html' },
                        { name: 'Data Systems', path: '05-system-architecture/data-systems/index.html' },
                        { name: 'Security', path: '05-system-architecture/security/index.html' },
                        { name: 'Deployment', path: '05-system-architecture/deployment/index.html' },
                        { name: 'Scalability', path: '05-system-architecture/scalability/index.html' }
                    ]
                }
            ]
        },
        {
            title: 'Business',
            items: [
                {
                    id: '06-value-and-growth-economy',
                    name: 'Value & Growth Economy',
                    path: '06-value-and-growth-economy/index.html',
                    subfolders: [
                        { name: 'Credits System', path: '06-value-and-growth-economy/credits-system/index.html' },
                        { name: 'Token Reward System', path: '06-value-and-growth-economy/token-reward-system/index.html' },
                        { name: 'Marketplace Economics', path: '06-value-and-growth-economy/marketplace-economics/index.html' }
                    ]
                }
            ]
        },
        {
            title: 'Planning',
            items: [
                {
                    id: '07-roadmap-and-releases',
                    name: 'Roadmap & Releases',
                    path: '07-roadmap-and-releases/index.html',
                    subfolders: [
                        { name: 'Phases', path: '07-roadmap-and-releases/phases/index.html' },
                        { name: 'Principles', path: '07-roadmap-and-releases/principles/index.html' },
                        { name: 'Metrics', path: '07-roadmap-and-releases/metrics/index.html' }
                    ]
                }
            ]
        }
    ]
};

// Generate sidebar navigation HTML
function generateSidebar(currentPagePath) {
    // Calculate relative path depth
    let depth, basePath, homePath;
    
    // Handle root index.html specially
    if (currentPagePath === 'index.html' || currentPagePath === '' || currentPagePath.endsWith('/')) {
        depth = 0;
        basePath = '';
        homePath = 'index.html';
    } else {
        depth = currentPagePath.split('/').length - 2; // Subtract filename and current folder
        basePath = depth === 0 ? '' : '../'.repeat(depth);
        homePath = depth === 0 ? 'index.html' : '../'.repeat(depth) + 'index.html';
    }
    
    // Ensure homePath doesn't start with / and is relative
    let cleanHomePath = homePath;
    if (cleanHomePath.startsWith('/')) {
        cleanHomePath = cleanHomePath.substring(1);
    }
    // For root level, use relative paths - ./ for file://, plain relative for HTTP/HTTPS
    const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';
    if (depth === 0 && cleanHomePath && !cleanHomePath.startsWith('./') && !cleanHomePath.startsWith('../')) {
        // Only add ./ for file:// protocol, not for HTTP/HTTPS (GitHub Pages)
        if (isFileProtocol) {
            cleanHomePath = './' + cleanHomePath;
        }
        // For HTTP/HTTPS, keep as-is (relative path without ./)
    }
    
    let html = `
            <div class="sidebar-header">
                <h1><a href="${cleanHomePath}">waQup</a></h1>
                <p>Documentation</p>
            </div>
            <nav>
                <ul class="nav-menu">`;
    
    navigationStructure.groups.forEach(group => {
        html += `
<li class="nav-group"><span class="nav-group-title">${group.title}</span><ul class="nav-group-items">`;
        
        group.items.forEach(item => {
            // Ensure path doesn't start with / and is properly relative
            let itemPath = basePath + item.path;
            // Remove any double slashes
            itemPath = itemPath.replace(/\/+/g, '/');
            // Ensure it doesn't start with /
            if (itemPath.startsWith('/')) {
                itemPath = itemPath.substring(1);
            }
            // For root level, use relative paths without ./ for GitHub Pages compatibility
            // file:// protocol works with ./ but GitHub Pages HTTP needs paths without ./
            const isFileProtocol = window.location.protocol === 'file:';
            if (depth === 0 && !itemPath.startsWith('./') && !itemPath.startsWith('../')) {
                // Only add ./ for file:// protocol, not for HTTP/HTTPS (GitHub Pages)
                if (isFileProtocol) {
                    itemPath = './' + itemPath;
                }
                // For HTTP/HTTPS, keep as-is (relative path without ./)
            }
            
            // Debug: log the generated path (remove in production)
            if (depth === 0) {
                console.log(`Generated link for ${item.name}: ${itemPath} (protocol: ${window.location.protocol})`);
            }
            
            const isActive = currentPagePath.includes(item.id);
            const activeClass = isActive ? ' class="active"' : '';
            
            html += `<li><a href="${itemPath}"${activeClass}>${item.name}</a>`;
            
            if (item.subfolders && item.subfolders.length > 0) {
                html += `
                <ul class="nav-subgroup-items">`;
                
                item.subfolders.forEach(subfolder => {
                    let subfolderPath = basePath + subfolder.path;
                    // Remove any double slashes
                    subfolderPath = subfolderPath.replace(/\/+/g, '/');
                    // Ensure it doesn't start with /
                    if (subfolderPath.startsWith('/')) {
                        subfolderPath = subfolderPath.substring(1);
                    }
                    // For root level, use relative paths without ./ for GitHub Pages compatibility
                    const isFileProtocol = window.location.protocol === 'file:';
                    if (depth === 0 && !subfolderPath.startsWith('./') && !subfolderPath.startsWith('../')) {
                        // Only add ./ for file:// protocol, not for HTTP/HTTPS (GitHub Pages)
                        if (isFileProtocol) {
                            subfolderPath = './' + subfolderPath;
                        }
                        // For HTTP/HTTPS, keep as-is (relative path without ./)
                    }
                    
                    const isSubfolderActive = currentPagePath === subfolder.path || currentPagePath.endsWith(subfolder.path);
                    const subActiveClass = isSubfolderActive ? ' class="active"' : '';
                    html += `
                    <li><a href="${subfolderPath}"${subActiveClass}>${subfolder.name}</a></li>`;
                });
                
                html += `
                </ul>`;
            }
            
            html += `
            </li>`;
        });
        
        html += `</ul></li>`;
    });
    
    html += `
                </ul>
            </nav>`;
    
    return html;
}

// Auto-generate sidebar on page load
(function() {
    function initSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) {
            console.warn('Sidebar element not found');
            return;
        }
        
        // Get current page path - extract from URL
        const currentPath = window.location.pathname;
        const currentHref = window.location.href;
        
        // For file:// protocol, extract the actual file path
        let cleanPath;
        if (currentHref.startsWith('file://')) {
            // Extract path after file://
            const filePath = currentHref.replace('file://', '');
            // Get just the filename and relative path from docs/
            const docsIndex = filePath.indexOf('/docs/');
            if (docsIndex !== -1) {
                cleanPath = filePath.substring(docsIndex + 6); // +6 for '/docs/'
            } else {
                // Fallback to pathname method
                cleanPath = currentPath.replace(/^\/+/, '').replace(/^docs\//, '');
            }
        } else {
            // For HTTP/HTTPS (GitHub Pages), extract path after repository name
            // URL format: https://user.github.io/repo-name/path/to/file.html
            // pathname: /repo-name/path/to/file.html
            cleanPath = currentPath.replace(/^\/+/, '');
            
            // Remove repository name prefix (e.g., 'waqup-documentation/')
            // Try to detect repo name from pathname
            const pathParts = cleanPath.split('/');
            if (pathParts.length > 1 && pathParts[0] !== 'docs') {
                // First part is likely repo name, remove it
                cleanPath = pathParts.slice(1).join('/');
            }
            
            // Also remove 'docs/' if present
            cleanPath = cleanPath.replace(/^docs\//, '');
        }
        
        // If empty or just 'index.html', use root
        if (!cleanPath || cleanPath === 'index.html' || cleanPath.endsWith('/')) {
            cleanPath = 'index.html';
        }
        
        console.log('Current URL:', currentHref);
        console.log('Pathname:', currentPath);
        console.log('Cleaned path:', cleanPath);
        
        // Generate and inject sidebar
        try {
            if (typeof generateSidebar === 'undefined') {
                console.error('generateSidebar function not defined');
                sidebar.innerHTML = '<div class="sidebar-header"><h1><a href="index.html">waQup</a></h1><p>Documentation</p></div><nav><p style="padding: 20px; color: red;">Navigation script error</p></nav>';
                return;
            }
            
            console.log('Generating sidebar for path:', cleanPath);
            const sidebarHTML = generateSidebar(cleanPath);
            sidebar.innerHTML = sidebarHTML;
            
            // Debug: verify the generated links
            setTimeout(() => {
                const links = sidebar.querySelectorAll('a');
                console.log('Generated sidebar links:');
                links.forEach(link => {
                    console.log(`  ${link.textContent.trim()}: ${link.getAttribute('href')}`);
                });
            }, 100);
        } catch (error) {
            console.error('Error generating sidebar:', error);
            // Fallback: show basic sidebar
            sidebar.innerHTML = '<div class="sidebar-header"><h1><a href="index.html">waQup</a></h1><p>Documentation</p></div><nav><p style="padding: 20px; color: red;">Navigation error - check console</p></nav>';
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        // DOM is already ready
        initSidebar();
    }
})();

