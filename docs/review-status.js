// Review Status System - Auto-adds review status to all h2 sections
// This script automatically adds review status checkboxes to all h2 headings in documentation
// Now supports online storage via GitHub API

(function() {
    'use strict';
    
    const STORAGE_KEY = 'waqup-review-status';
    const GITHUB_REPO = 'InnerFlect-Tech/waqup-documentation';
    const DATA_FILE_PATH = 'docs/review-data.json';
    const GITHUB_API_BASE = 'https://api.github.com';
    
    // Initialize state
    let reviewState = {};
    let isOnlineMode = false;
    let githubToken = null;
    
    // Check if we should use online mode (GitHub API)
    function initStorageMode() {
        // Check for GitHub token in URL or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        githubToken = urlParams.get('token') || localStorage.getItem('github-token');
        
        if (githubToken) {
            isOnlineMode = true;
            localStorage.setItem('github-token', githubToken);
            console.log('Using online storage mode with GitHub API');
        } else {
            isOnlineMode = false;
            console.log('Using local storage mode. Add ?token=YOUR_TOKEN to URL to enable online storage');
        }
    }
    
    // Load state from GitHub API
    async function loadStateFromGitHub() {
        if (!githubToken) return {};
        
        try {
            const url = `${GITHUB_API_BASE}/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`;
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${githubToken}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                const content = JSON.parse(atob(data.content.replace(/\s/g, '')));
                return content.reviewStatus || {};
            } else if (response.status === 404) {
                // File doesn't exist yet, return empty state
                return {};
            } else {
                console.error('Error loading from GitHub:', response.statusText);
                return {};
            }
        } catch (error) {
            console.error('Error loading from GitHub:', error);
            // Fallback to localStorage
            return loadStateFromLocal();
        }
    }
    
    // Load state from localStorage
    function loadStateFromLocal() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error loading review state:', e);
                return {};
            }
        }
        return {};
    }
    
    // Save state to GitHub API
    async function saveStateToGitHub(state) {
        if (!githubToken) {
            saveStateToLocal(state);
            return;
        }
        
        try {
            // First, get the current file to get its SHA (required for update)
            const getUrl = `${GITHUB_API_BASE}/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`;
            const getResponse = await fetch(getUrl, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${githubToken}`
                }
            });
            
            let sha = null;
            if (getResponse.ok) {
                const data = await getResponse.json();
                sha = data.sha;
            }
            
            // Prepare the data
            const fileData = {
                reviewStatus: state,
                lastUpdated: new Date().toISOString()
            };
            
            const content = btoa(JSON.stringify(fileData, null, 2));
            
            // Create or update the file
            const putUrl = `${GITHUB_API_BASE}/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`;
            const putResponse = await fetch(putUrl, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${githubToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Update review status data - ${new Date().toISOString()}`,
                    content: content,
                    sha: sha // Include SHA if updating, omit if creating
                })
            });
            
            if (putResponse.ok) {
                console.log('Review status saved to GitHub');
                // Also save to localStorage as backup
                saveStateToLocal(state);
                return true;
            } else {
                const error = await putResponse.json();
                console.error('Error saving to GitHub:', error);
                // Fallback to localStorage
                saveStateToLocal(state);
                return false;
            }
        } catch (error) {
            console.error('Error saving to GitHub:', error);
            // Fallback to localStorage
            saveStateToLocal(state);
            return false;
        }
    }
    
    // Save state to localStorage
    function saveStateToLocal(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    
    // Load state (tries online first, falls back to local)
    async function loadState() {
        initStorageMode();
        
        if (isOnlineMode) {
            const onlineState = await loadStateFromGitHub();
            if (Object.keys(onlineState).length > 0) {
                reviewState = onlineState;
                return reviewState;
            }
        }
        
        // Fallback to local storage
        reviewState = loadStateFromLocal();
        return reviewState;
    }
    
    // Save state (tries online first, falls back to local)
    async function saveState() {
        if (isOnlineMode) {
            await saveStateToGitHub(reviewState);
        } else {
            saveStateToLocal(reviewState);
        }
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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
                ${isOnlineMode ? '<div style="font-size: 0.75rem; color: #10b981; margin-top: 0.5rem;">💾 Online storage enabled</div>' : '<div style="font-size: 0.75rem; color: #f59e0b; margin-top: 0.5rem;">💾 Local storage only. <a href="?token=YOUR_TOKEN" style="color: #2563eb;">Enable online storage</a></div>'}
                <div class="section-comments">
                    <button class="comment-toggle" onclick="toggleSectionComment('${reviewId}')">
                        💬 <span id="comment-count-${reviewId}">0</span> Comments
                    </button>
                    <div class="comment-form" id="comment-form-${reviewId}">
                        <input type="text" class="comment-name-input" id="comment-name-${reviewId}" placeholder="Your name" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid var(--border-color); border-radius: 6px; font-size: 0.875rem;">
                        <textarea class="comment-input" id="comment-input-${reviewId}" placeholder="Add a comment..."></textarea>
                        <button class="comment-submit" onclick="addSectionComment('${reviewId}')">Add Comment</button>
                    </div>
                    <div class="comments-list" id="comments-${reviewId}"></div>
                </div>
            </div>
        `;
    }
    
    // Update review status
    window.updateSectionReviewStatus = async function(reviewId, type, checked) {
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
        
        await saveState();
        renderReviewStatus(reviewId);
    };
    
    // Toggle comment form
    window.toggleSectionComment = function(reviewId) {
        const form = document.getElementById(`comment-form-${reviewId}`);
        if (form) {
            form.classList.toggle('active');
        }
    };
    
    // Add comment to section
    window.addSectionComment = async function(reviewId) {
        const nameInput = document.getElementById(`comment-name-${reviewId}`);
        const commentInput = document.getElementById(`comment-input-${reviewId}`);
        
        const name = nameInput ? nameInput.value.trim() : '';
        const text = commentInput ? commentInput.value.trim() : '';
        
        if (!text) {
            alert('Please enter a comment');
            return;
        }
        
        if (!name) {
            alert('Please enter your name');
            return;
        }
        
        // Initialize comments array if needed
        if (!reviewState[reviewId]) {
            reviewState[reviewId] = {};
        }
        if (!reviewState[reviewId].comments) {
            reviewState[reviewId].comments = [];
        }
        
        // Add comment
        const comment = {
            name: name,
            text: text,
            date: new Date().toISOString()
        };
        
        reviewState[reviewId].comments.push(comment);
        await saveState();
        
        // Clear inputs
        if (nameInput) nameInput.value = '';
        if (commentInput) commentInput.value = '';
        
        // Update UI
        renderComments(reviewId);
    };
    
    // Delete comment
    window.deleteSectionComment = async function(reviewId, index) {
        if (!reviewState[reviewId] || !reviewState[reviewId].comments) return;
        if (confirm('Are you sure you want to delete this comment?')) {
            reviewState[reviewId].comments.splice(index, 1);
            if (reviewState[reviewId].comments.length === 0) {
                delete reviewState[reviewId].comments;
            }
            await saveState();
            renderComments(reviewId);
        }
    };
    
    // Render comments for a section
    function renderComments(reviewId) {
        const container = document.getElementById(`comments-${reviewId}`);
        const countEl = document.getElementById(`comment-count-${reviewId}`);
        
        if (!container || !countEl) return;
        
        const comments = (reviewState[reviewId] && reviewState[reviewId].comments) || [];
        
        countEl.textContent = comments.length;
        
        if (comments.length === 0) {
            container.innerHTML = '';
            return;
        }
        
        container.innerHTML = comments.map((comment, index) => {
            const date = new Date(comment.date).toLocaleDateString();
            return `
                <div class="comment-item">
                    <div class="comment-author">${escapeHtml(comment.name)}</div>
                    <p class="comment-text">${escapeHtml(comment.text)}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="comment-date">${date}</div>
                        <button class="comment-delete" onclick="deleteSectionComment('${reviewId}', ${index})">🗑️ Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
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
        const dates = Object.values(status).filter(s => s && s.date && !Array.isArray(s)).map(s => new Date(s.date).toLocaleDateString());
        if (dates.length > 0 && dateEl) {
            dateEl.textContent = `Last updated: ${dates[dates.length - 1]}`;
        } else if (dateEl) {
            dateEl.textContent = '';
        }
        
        // Render comments
        renderComments(reviewId);
    }
    
    // Initialize review status on all h2 sections
    async function initReviewStatus() {
        await loadState();
        
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
