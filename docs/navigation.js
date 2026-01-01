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
    // Handle root index.html specially
    if (currentPagePath === 'index.html' || currentPagePath === '' || currentPagePath.endsWith('/')) {
        const depth = 0;
        const basePath = '';
        const homePath = 'index.html';
    } else {
        const depth = currentPagePath.split('/').length - 2; // Subtract filename and current folder
        const basePath = depth === 0 ? '' : '../'.repeat(depth);
        const homePath = depth === 0 ? 'index.html' : '../'.repeat(depth) + 'index.html';
    }
    
    let html = `
            <div class="sidebar-header">
                <h1><a href="${homePath}">waQup</a></h1>
                <p>Documentation</p>
            </div>
            <nav>
                <ul class="nav-menu">`;
    
    navigationStructure.groups.forEach(group => {
        html += `
<li class="nav-group"><span class="nav-group-title">${group.title}</span><ul class="nav-group-items">`;
        
        group.items.forEach(item => {
            const itemPath = basePath + item.path;
            const isActive = currentPagePath.includes(item.id);
            const activeClass = isActive ? ' class="active"' : '';
            
            html += `<li><a href="${itemPath}"${activeClass}>${item.name}</a>`;
            
            if (item.subfolders && item.subfolders.length > 0) {
                html += `
                <ul class="nav-subgroup-items">`;
                
                item.subfolders.forEach(subfolder => {
                    const subfolderPath = basePath + subfolder.path;
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
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        // Get current page path - extract from URL
        const currentPath = window.location.pathname;
        // Remove leading slash and 'docs/' if present
        let cleanPath = currentPath.replace(/^\/+/, '').replace(/^docs\//, '');
        // If empty or just 'index.html', use root
        if (!cleanPath || cleanPath === 'index.html' || cleanPath.endsWith('/')) {
            cleanPath = 'index.html';
        }
        
        // Generate and inject sidebar
        const sidebarHTML = generateSidebar(cleanPath);
        sidebar.innerHTML = sidebarHTML;
    }
});

