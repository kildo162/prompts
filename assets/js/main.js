// DOM Elements
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const promptsContainer = document.getElementById('prompts-container');
const categoryList = document.getElementById('category-list');
const sortSelect = document.getElementById('sort-select');
const loadMoreBtn = document.getElementById('load-more');
const newsletterForm = document.getElementById('newsletter-form');

// State
let currentCategory = 'all';
let currentView = 'grid';
let currentSort = 'popular';
let searchTerm = '';
let prompts = [];
let displayedPrompts = 0;
const promptsPerPage = 9;

// Theme Management
const theme = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    },
    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
};

// View Management
const view = {
    init() {
        const savedView = localStorage.getItem('view') || 'grid';
        this.setView(savedView);
    },
    setView(viewType) {
        currentView = viewType;
        promptsContainer.className = `${viewType}-view`;
        gridViewBtn.classList.toggle('active', viewType === 'grid');
        listViewBtn.classList.toggle('active', viewType === 'list');
        localStorage.setItem('view', viewType);
    }
};

// Search & Filter
const search = {
    debounceTimer: null,
    init() {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                searchTerm = e.target.value.toLowerCase();
                resetPrompts();
                renderPrompts();
            }, 300);
        });
    }
};

// Loading State
function setLoading(isLoading) {
    if (isLoading) {
        promptsContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner"></i>
                <p>Loading prompts...</p>
            </div>`;
    }
}

// Prompts Management
async function loadPrompts() {
    try {
        setLoading(true);
        const response = await fetch('prompts/categories/all.json');
        const data = await response.json();
        prompts = data.prompts;
        displayedPrompts = 0;
        renderPrompts();
    } catch (error) {
        console.error('Error loading prompts:', error);
        promptsContainer.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-circle"></i>
                <p>Error loading prompts. Please try again later.</p>
            </div>`;
    }
}

function resetPrompts() {
    displayedPrompts = 0;
    promptsContainer.innerHTML = '';
}

function sortPrompts(prompts) {
    switch (currentSort) {
        case 'popular':
            return prompts; // Assuming prompts are pre-sorted by popularity
        case 'recent':
            return [...prompts].reverse(); // Simple reverse for demo
        case 'az':
            return [...prompts].sort((a, b) => a.title.localeCompare(b.title));
        default:
            return prompts;
    }
}

function renderPrompts() {
    const filteredPrompts = prompts.filter(prompt => {
        const matchesSearch = prompt.title.toLowerCase().includes(searchTerm) ||
                            prompt.content.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'all' || prompt.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    const sortedPrompts = sortPrompts(filteredPrompts);
    const promptsToShow = sortedPrompts.slice(displayedPrompts, displayedPrompts + promptsPerPage);
    
    if (displayedPrompts === 0) {
        promptsContainer.innerHTML = '';
    }

    const promptsHTML = promptsToShow.map(prompt => `
        <div class="prompt-card" data-category="${prompt.category}">
            <h3>${prompt.title}</h3>
            <div class="prompt-meta">
                <span class="category-tag">${prompt.category}</span>
            </div>
            <pre class="prompt-content">${prompt.content}</pre>
            <div class="prompt-actions">
                <button class="copy-btn" onclick="copyPrompt(this)" data-prompt="${encodeURIComponent(prompt.content)}">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </div>
        </div>
    `).join('');

    promptsContainer.insertAdjacentHTML('beforeend', promptsHTML);
    displayedPrompts += promptsToShow.length;
    
    // Update load more button visibility
    loadMoreBtn.style.display = displayedPrompts < sortedPrompts.length ? 'flex' : 'none';
}

// Copy to Clipboard
async function copyPrompt(button) {
    const promptText = decodeURIComponent(button.dataset.prompt);
    try {
        await navigator.clipboard.writeText(promptText);
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.classList.add('success');
        button.disabled = true;
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('success');
            button.disabled = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        button.innerHTML = '<i class="fas fa-times"></i> Failed to copy';
        button.classList.add('error');
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> Copy';
            button.classList.remove('error');
        }, 2000);
    }
}

// Category Management
function initCategories() {
    categoryList.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryLink = e.target.closest('a');
        if (!categoryLink) return;

        // Update active category
        document.querySelector('.categories a.active')?.classList.remove('active');
        categoryLink.classList.add('active');
        currentCategory = categoryLink.dataset.category;
        resetPrompts();
        renderPrompts();
    });
}

// Newsletter Subscription
function initNewsletter() {
    newsletterForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        const originalText = submitBtn.textContent;

        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            emailInput.value = '';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Event Listeners
function initEventListeners() {
    themeToggle.addEventListener('click', () => theme.toggle());
    gridViewBtn.addEventListener('click', () => view.setView('grid'));
    listViewBtn.addEventListener('click', () => view.setView('list'));
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        resetPrompts();
        renderPrompts();
    });
    loadMoreBtn.addEventListener('click', () => renderPrompts());
}

// Initialize Application
function init() {
    theme.init();
    view.init();
    search.init();
    initCategories();
    initNewsletter();
    initEventListeners();
    loadPrompts();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);