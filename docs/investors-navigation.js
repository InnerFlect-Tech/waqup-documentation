// Navigation structure for Investor Documentation
// This file defines the complete navigation structure for investor documentation pages

const investorsNavigationStructure = {
    groups: [
        {
            title: 'Overview',
            items: [
                {
                    id: '01-executive-summary',
                    name: 'Executive Summary',
                    path: '01-executive-summary/index.html',
                    subfolders: []
                }
            ]
        },
        {
            title: 'Problem',
            items: [
                {
                    id: '02-the-problem',
                    name: 'The Problem: Inner Change Is Poorly Tooled',
                    path: '02-the-problem/index.html',
                    subfolders: []
                }
            ]
        },
        {
            title: 'Insight',
            items: [
                {
                    id: '03-core-insight',
                    name: 'Core Insight: Ritual + Repetition + Self-Voice',
                    path: '03-core-insight/index.html',
                    subfolders: []
                }
            ]
        },
        {
            title: 'Science',
            items: [
                {
                    id: '04-scientific-foundations',
                    name: 'Scientific Foundations',
                    path: '04-scientific-foundations/index.html',
                    subfolders: []
                }
            ]
        },
        {
            title: 'Research',
            items: [
                {
                    id: '05-research-status',
                    name: 'Research Status & Knowledge Gap',
                    path: '05-research-status/index.html',
                    subfolders: []
                }
            ]
        },
        {
            title: 'Product',
            items: [
                {
                    id: '06-the-product',
                    name: 'The Product: What Exists vs What Is Being Built',
                    path: '06-the-product/index.html',
                    subfolders: []
                }
            ]
        }
    ]
};

// Generate sidebar navigation HTML for investor docs
function generateInvestorsSidebar(currentPagePath) {
    // Calculate relative path depth
    let depth, basePath, homePath;
    
    // Normalize path - remove 'investors/' prefix if present
    let normalizedPath = currentPagePath;
    if (normalizedPath.startsWith('investors/')) {
        normalizedPath = normalizedPath.replace('investors/', '');
    }
    
    // Handle root index.html specially (investors/index.html)
    if (normalizedPath === 'index.html' || normalizedPath === '' || normalizedPath.endsWith('/')) {
        depth = 1; // investors/index.html is depth 1 (relative to investors/)
        basePath = '';
        homePath = 'index.html';
    } else {
        // Calculate depth: number of directories (subtract 1 for filename)
        // e.g., '01-executive-summary/index.html' -> depth 2
        const pathParts = normalizedPath.split('/');
        depth = pathParts.length - 1;
        basePath = depth === 1 ? '' : '../'.repeat(depth - 1);
        homePath = depth === 1 ? 'index.html' : '../'.repeat(depth - 1) + 'index.html';
    }
    
    // Ensure homePath doesn't start with /
    let cleanHomePath = homePath;
    if (cleanHomePath.startsWith('/')) {
        cleanHomePath = cleanHomePath.substring(1);
    }
    
    const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';
    if (depth === 1 && cleanHomePath && !cleanHomePath.startsWith('./') && !cleanHomePath.startsWith('../')) {
        if (isFileProtocol) {
            cleanHomePath = './' + cleanHomePath;
        }
    }
    
    let html = `
            <div class="sidebar-header">
                <h1><a href="${cleanHomePath}">waQup</a></h1>
                <p>Investor Brief</p>
            </div>
            <nav>
                <ul class="nav-menu">`;
    
    investorsNavigationStructure.groups.forEach(group => {
        html += `
<li class="nav-group"><span class="nav-group-title">${group.title}</span><ul class="nav-group-items">`;
        
        group.items.forEach(item => {
            // Build path correctly based on current depth
            let itemPath;
            
            if (depth === 1) {
                // At investors/index.html level, use item.path as-is
                itemPath = item.path;
            } else {
                // At subfolder level, need to go up to investors/, then to item
                itemPath = basePath + item.path;
            }
            
            // Remove any double slashes
            itemPath = itemPath.replace(/\/+/g, '/');
            // Ensure it doesn't start with /
            if (itemPath.startsWith('/')) {
                itemPath = itemPath.substring(1);
            }
            
            // Handle protocol-specific path formatting
            if (depth === 1 && !itemPath.startsWith('./') && !itemPath.startsWith('../')) {
                if (isFileProtocol) {
                    itemPath = './' + itemPath;
                }
            }
            
            const isActive = currentPagePath.includes(item.id);
            const activeClass = isActive ? ' class="active"' : '';
            
            html += `<li><a href="${itemPath}"${activeClass}>${item.name}</a>`;
            
            if (item.subfolders && item.subfolders.length > 0) {
                html += `
                <ul class="nav-subgroup-items">`;
                
                item.subfolders.forEach(subfolder => {
                    let subfolderPath;
                    
                    if (depth === 1) {
                        subfolderPath = subfolder.path;
                    } else {
                        subfolderPath = basePath + subfolder.path;
                    }
                    
                    subfolderPath = subfolderPath.replace(/\/+/g, '/');
                    if (subfolderPath.startsWith('/')) {
                        subfolderPath = subfolderPath.substring(1);
                    }
                    
                    if (depth === 1 && !subfolderPath.startsWith('./') && !subfolderPath.startsWith('../')) {
                        if (isFileProtocol) {
                            subfolderPath = './' + subfolderPath;
                        }
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
    'use strict';
    
    function initSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) {
            console.warn('Sidebar element not found');
            return;
        }
        
        // Check if sidebar is already populated
        if (sidebar.innerHTML.trim() && !sidebar.innerHTML.includes('Sidebar generated by investors-navigation.js')) {
            return;
        }
        
        // Get current page path
        const currentPath = window.location.pathname;
        const currentHref = window.location.href;
        
        let cleanPath;
        if (currentHref.startsWith('file://')) {
            const filePath = currentHref.replace('file://', '');
            const docsIndex = filePath.indexOf('/docs/');
            if (docsIndex !== -1) {
                cleanPath = filePath.substring(docsIndex + 6);
            } else {
                cleanPath = currentPath.replace(/^\/+/, '').replace(/^docs\//, '');
            }
        } else {
            cleanPath = currentPath.replace(/^\/+/, '');
            const pathParts = cleanPath.split('/');
            if (pathParts.length > 1) {
                const firstPart = pathParts[0];
                if (firstPart !== 'docs' && !/^\d{2}-/.test(firstPart) && firstPart !== 'investors') {
                    cleanPath = pathParts.slice(1).join('/');
                }
            }
            cleanPath = cleanPath.replace(/^docs\//, '');
        }
        
        // Ensure we're tracking investors path correctly
        // If we're in investors folder, keep the path relative to investors/
        if (cleanPath.startsWith('investors/')) {
            cleanPath = cleanPath.replace('investors/', '');
        }
        
        if (!cleanPath || cleanPath === 'index.html' || cleanPath.endsWith('/')) {
            cleanPath = 'index.html';
        }
        
        console.log('Current URL:', currentHref);
        console.log('Pathname:', currentPath);
        console.log('Cleaned path:', cleanPath);
        
        try {
            if (typeof generateInvestorsSidebar === 'undefined') {
                console.error('generateInvestorsSidebar function not defined');
                sidebar.innerHTML = '<div class="sidebar-header"><h1><a href="index.html">waQup</a></h1><p>Investor Brief</p></div><nav><p style="padding: 20px; color: red;">Navigation script error</p></nav>';
                return;
            }
            
            console.log('Generating sidebar for path:', cleanPath);
            const sidebarHTML = generateInvestorsSidebar(cleanPath);
            sidebar.innerHTML = sidebarHTML;
        } catch (error) {
            console.error('Error generating sidebar:', error);
            sidebar.innerHTML = '<div class="sidebar-header"><h1><a href="index.html">waQup</a></h1><p>Investor Brief</p></div><nav><p style="padding: 20px; color: red;">Navigation error - check console</p></nav>';
        }
    }
    
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initSidebar();
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }
    
    setTimeout(initSidebar, 100);
    window.addEventListener('load', initSidebar);
})();
