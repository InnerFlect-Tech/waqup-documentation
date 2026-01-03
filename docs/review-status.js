// Review Status System - Auto-adds review status to all h2 sections
// This script automatically adds review status checkboxes to all h2 headings in documentation

(function() {
    'use strict';
    
    const STORAGE_KEY = 'waqup-review-status';
    
    // Initialize state from localStorage
    let reviewState = {};
    
    function loadState() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                reviewState = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading review state:', e);
                reviewState = {};
            }
        }
        return reviewState;
    }
    
    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewState));
    }
    
    // Get unique review ID for a section
    function getReviewId(h2Element) {
        const pagePath = window.location.pathname.replace(/^.*\//, '').replace('.html', '') || 'index';
        const sectionId = h2Element.id || h2Element.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        return `${pagePath}-${sectionId}`;
    }
    
    // Create review status HTML
    function createReviewStatusHTML(reviewId) {
        return `
            <div class="section-review-status" data-review-id="${reviewId}">
                <div class="review-checkboxes">
                    <label class="review-checkbox-label">
                        <input type="checkbox" data-review-type="read-indias" onchange="updateSectionReviewStatus('${reviewId}', 'read-indias', this.checked)">
                        <span>Read by Indias</span>
                    </label>
                    <label class="review-checkbox-label">
                        <input type="checkbox" data-review-type="read-john" onchange="updateSectionReviewStatus('${reviewId}', 'read-john', this.checked)">
                        <span>Read by John</span>
                    </label>
                    <label class="review-checkbox-label">
                        <input type="checkbox" data-review-type="verified" onchange="updateSectionReviewStatus('${reviewId}', 'verified', this.checked)">
                        <span>Verified</span>
                    </label>
                </div>
                <div class="review-date" id="review-date-${reviewId}"></div>
            </div>
        `;
    }
    
    // Update review status
    window.updateSectionReviewStatus = function(reviewId, type, checked) {
        if (!reviewState[reviewId]) {
            reviewState[reviewId] = {};
        }
        
        if (checked) {
            reviewState[reviewId][type] = {
                checked: true,
                date: new Date().toISOString()
            };
        } else {
            delete reviewState[reviewId][type];
            if (Object.keys(reviewState[reviewId]).length === 0) {
                delete reviewState[reviewId];
            }
        }
        
        saveState();
        renderReviewStatus(reviewId);
    };
    
    // Render review status for a section
    function renderReviewStatus(reviewId) {
        const container = document.querySelector(`[data-review-id="${reviewId}"]`);
        if (!container) return;
        
        const status = reviewState[reviewId] || {};
        const dateEl = document.getElementById(`review-date-${reviewId}`);
        
        // Update checkboxes
        ['read-indias', 'read-john', 'verified'].forEach(type => {
            const checkbox = container.querySelector(`input[data-review-type="${type}"]`);
            if (checkbox) {
                checkbox.checked = !!status[type];
            }
        });
        
        // Update date display
        const dates = Object.values(status).map(s => new Date(s.date).toLocaleDateString());
        if (dates.length > 0 && dateEl) {
            dateEl.textContent = `Last updated: ${dates[dates.length - 1]}`;
        } else if (dateEl) {
            dateEl.textContent = '';
        }
    }
    
    // Initialize review status on all h2 sections
    function initReviewStatus() {
        loadState();
        
        // Find all h2 elements with IDs (or create IDs for them)
        const h2Elements = document.querySelectorAll('h2');
        
        h2Elements.forEach(h2 => {
            // Skip if already has review status
            if (h2.nextElementSibling && h2.nextElementSibling.classList.contains('section-review-status')) {
                return;
            }
            
            // Ensure h2 has an ID
            if (!h2.id) {
                const text = h2.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                h2.id = text;
            }
            
            const reviewId = getReviewId(h2);
            
            // Create and insert review status element
            const reviewHTML = createReviewStatusHTML(reviewId);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = reviewHTML;
            const reviewElement = tempDiv.firstElementChild;
            
            // Insert after h2
            h2.parentNode.insertBefore(reviewElement, h2.nextSibling);
            
            // Render existing state
            renderReviewStatus(reviewId);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReviewStatus);
    } else {
        initReviewStatus();
    }
})();

