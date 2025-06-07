// DOM Elements
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const promptsContainer = document.getElementById('prompts-container');
const categoryList = document.getElementById('category-list');

// State
let currentCategory = 'all';
let currentView = 'grid';
let searchTerm = '';
let prompts = [];

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
                renderPrompts();
            }, 300);
        });
    }
};

// Prompts Management
async function loadPrompts() {
    try {
        const response = await fetch('prompts/categories/all.json');
        const data = await response.json();
        prompts = data.prompts;
        renderPrompts();
    } catch (error) {
        console.error('Error loading prompts:', error);
        promptsContainer.innerHTML = '<p>Error loading prompts. Please try again later.</p>';
    }
}

function renderPrompts() {
    const filteredPrompts = prompts.filter(prompt => {
        const matchesSearch = prompt.title.toLowerCase().includes(searchTerm) ||
                            prompt.content.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'all' || prompt.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    promptsContainer.innerHTML = filteredPrompts.map(prompt => `
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
}

// Copy to Clipboard
async function copyPrompt(button) {
    const promptText = decodeURIComponent(button.dataset.prompt);
    try {
        await navigator.clipboard.writeText(promptText);
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.disabled = true;
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        button.innerHTML = '<i class="fas fa-times"></i> Failed to copy';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> Copy';
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
        renderPrompts();
    });
}

// Event Listeners
function initEventListeners() {
    themeToggle.addEventListener('click', () => theme.toggle());
    gridViewBtn.addEventListener('click', () => view.setView('grid'));
    listViewBtn.addEventListener('click', () => view.setView('list'));
}

// Initialize Application
function init() {
    theme.init();
    view.init();
    search.init();
    initCategories();
    initEventListeners();
    loadPrompts();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);