// Admin Panel JavaScript for Elite Realty
// This handles all admin panel functionality including property management, user management, and analytics

// ==================== GLOBAL VARIABLES ====================
let currentSection = 'dashboard';
let allProperties = [];
let allUsers = [];
let filteredProperties = [];

// ==================== AUTHENTICATION CHECK ====================
// Authentication is now handled in admin.html

// ==================== INITIALIZATION ====================
function initializeAdminPanel() {
    loadDashboardData();
    loadProperties();
    loadUsers();
    generateAnalytics();
    loadRecentActivity();
}

// ==================== NAVIGATION ====================
function showSection(sectionName) {
    // Remove active class from all menu items and sections
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
    
    // Add active class to clicked menu item and corresponding section
    event.target.closest('.menu-item').classList.add('active');
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    currentSection = sectionName;
    
    // Load section-specific data
    switch(sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'manage-properties':
            loadProperties();
            break;
        case 'users':
            loadUsers();
            break;
        case 'analytics':
            generateAnalytics();
            break;
    }
}

// ==================== DASHBOARD FUNCTIONS ====================
function loadDashboardData() {
    const properties = db.getAllProperties();
    const users = JSON.parse(localStorage.getItem('users_db'));
    
    // Update stats
    document.getElementById('total-properties').textContent = properties.length;
    document.getElementById('total-users').textContent = Object.keys(users).length;
    
    // Calculate average price
    const avgPrice = properties.reduce((sum, prop) => sum + prop.price, 0) / properties.length;
    document.getElementById('avg-price').textContent = formatPrice(avgPrice);
    
    // Featured properties (properties with price > $1M)
    const featuredCount = properties.filter(prop => prop.price > 1000000).length;
    document.getElementById('featured-properties').textContent = featuredCount;
}

function loadRecentActivity() {
    const activities = [
        { icon: '🏠', text: 'New property added: Luxury Villa', time: '2 hours ago' },
        { icon: '👤', text: 'New user registered: John Smith', time: '4 hours ago' },
        { icon: '📝', text: 'Property updated: Modern Apartment', time: '6 hours ago' },
        { icon: '🔍', text: 'Property viewed 50 times today', time: '8 hours ago' },
        { icon: '💰', text: 'New inquiry for Oceanfront Villa', time: '1 day ago' }
    ];
    
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// ==================== PROPERTY MANAGEMENT ====================
function handleAddProperty(event) {
    event.preventDefault();
    showLoading(true);
    
    const form = event.target;
    const editingId = form.getAttribute('data-editing');
    
    const formData = {
        title: document.getElementById('property-title').value,
        type: document.getElementById('property-type').value,
        price: parseInt(document.getElementById('property-price').value),
        location: document.getElementById('property-location').value,
        beds: parseInt(document.getElementById('property-beds').value),
        baths: parseInt(document.getElementById('property-baths').value),
        sqft: parseInt(document.getElementById('property-sqft').value),
        image: document.getElementById('property-image').value,
        description: document.getElementById('property-description').value,
        features: document.getElementById('property-features').value.split(',').map(f => f.trim()).filter(f => f),
        agent: document.getElementById('property-agent').value,
        agentPhone: document.getElementById('property-agent-phone').value
    };
    
    // Simulate API delay
    setTimeout(() => {
        try {
            if (editingId) {
                // Update existing property
                const success = db.updateProperty(editingId, formData);
                if (success) {
                    showNotification('Property updated successfully! Changes will appear on the main website immediately.', 'success');
                } else {
                    throw new Error('Failed to update property');
                }
            } else {
                // Add new property
                const newProperty = db.addProperty(formData);
                showNotification('Property added successfully! It will appear on the main website immediately.', 'success');
            }
            
            // Reset form and switch to manage properties
            event.target.reset();
            form.removeAttribute('data-editing');
            showSection('manage-properties');
            
            // Refresh dashboard data
            loadDashboardData();
            
            // Trigger real-time update for main website
            triggerWebsiteUpdate();
            
        } catch (error) {
            showNotification('Error saving property: ' + error.message, 'error');
        } finally {
            showLoading(false);
        }
    }, 1000);
}

function loadProperties() {
    try {
        allProperties = db.getAllProperties() || [];
        filteredProperties = allProperties;
        console.log('✅ Loaded', allProperties.length, 'properties');
        renderProperties();
    } catch (error) {
        console.error('Error loading properties:', error);
        allProperties = [];
        filteredProperties = [];
        showNotification('Error loading properties: ' + error.message, 'error');
    }
}

function renderProperties() {
    const propertiesList = document.getElementById('properties-list');
    
    if (filteredProperties.length === 0) {
        propertiesList.innerHTML = '<div class="no-results">No properties found.</div>';
        return;
    }
    
    propertiesList.innerHTML = filteredProperties.map(property => `
        <div class="property-item">
            <div class="property-item-header">
                <div class="property-item-image" style="background-image: url('${property.image}')"></div>
                <div class="property-item-info">
                    <h3>${property.title}</h3>
                    <p><strong>Location:</strong> ${property.location}</p>
                    <p><strong>Price:</strong> ${formatPrice(property.price)}</p>
                    <p><strong>Type:</strong> ${property.type} | ${property.beds} beds | ${property.baths} baths | ${property.sqft} sq ft</p>
                    <p><strong>Agent:</strong> ${property.agent} (${property.agentPhone})</p>
                </div>
                <div class="property-item-actions">
                    <button class="btn-small btn-view" onclick="viewProperty('${property.id}')">View</button>
                    <button class="btn-small btn-edit" onclick="editProperty('${property.id}')">Edit</button>
                    <button class="btn-small btn-delete" onclick="deleteProperty('${property.id}')">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProperties() {
    const searchTerm = document.getElementById('search-properties').value.toLowerCase();
    const typeFilter = document.getElementById('filter-type').value;
    
    filteredProperties = allProperties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm) ||
                            property.location.toLowerCase().includes(searchTerm);
        const matchesType = !typeFilter || property.type === typeFilter;
        
        return matchesSearch && matchesType;
    });
    
    renderProperties();
}

function viewProperty(propertyId) {
    // Ensure allProperties is loaded
    if (!allProperties || !Array.isArray(allProperties)) {
        allProperties = db.getAllProperties();
    }
    
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) {
        showNotification('Property not found!', 'error');
        return;
    }
    
    const modalContent = document.getElementById('property-modal-content');
    modalContent.innerHTML = `
        <h2>${property.title}</h2>
        <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin: 1rem 0;">
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
            <div><strong>Price:</strong> ${formatPrice(property.price)}</div>
            <div><strong>Type:</strong> ${property.type}</div>
            <div><strong>Location:</strong> ${property.location}</div>
            <div><strong>Bedrooms:</strong> ${property.beds}</div>
            <div><strong>Bathrooms:</strong> ${property.baths}</div>
            <div><strong>Square Feet:</strong> ${property.sqft}</div>
        </div>
        
        <div style="margin: 1rem 0;">
            <strong>Description:</strong>
            <p>${property.description}</p>
        </div>
        
        <div style="margin: 1rem 0;">
            <strong>Features:</strong>
            <p>${property.features ? property.features.join(', ') : 'None specified'}</p>
        </div>
        
        <div style="margin: 1rem 0;">
            <strong>Agent:</strong> ${property.agent} (${property.agentPhone})
        </div>
        
        <div style="margin: 1rem 0;">
            <strong>Date Added:</strong> ${new Date(property.dateAdded).toLocaleDateString()}
        </div>
    `;
    
    document.getElementById('property-modal').classList.add('active');
}

function editProperty(propertyId) {
    // Ensure allProperties is loaded
    if (!allProperties || !Array.isArray(allProperties)) {
        allProperties = db.getAllProperties();
    }
    
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) {
        showNotification('Property not found!', 'error');
        return;
    }
    
    // Pre-fill the add property form with existing data
    document.getElementById('property-title').value = property.title;
    document.getElementById('property-type').value = property.type;
    document.getElementById('property-price').value = property.price;
    document.getElementById('property-location').value = property.location;
    document.getElementById('property-beds').value = property.beds;
    document.getElementById('property-baths').value = property.baths;
    document.getElementById('property-sqft').value = property.sqft;
    document.getElementById('property-image').value = property.image;
    document.getElementById('property-description').value = property.description;
    document.getElementById('property-features').value = property.features ? property.features.join(', ') : '';
    document.getElementById('property-agent').value = property.agent;
    document.getElementById('property-agent-phone').value = property.agentPhone;
    
    // Change form to edit mode
    const form = document.getElementById('add-property-form');
    form.setAttribute('data-editing', propertyId);
    
    // Switch to add property section
    showSection('add-property');
    
    showNotification('Property loaded for editing. Update the fields and submit.', 'info');
}

function deleteProperty(propertyId) {
    console.log('🗑️ Delete property called with ID:', propertyId);
    console.log('📊 Current allProperties state:', allProperties);
    
    // Ensure allProperties is loaded
    if (!allProperties || !Array.isArray(allProperties)) {
        console.log('⚠️ allProperties not initialized, loading from database...');
        allProperties = db.getAllProperties();
        console.log('✅ Loaded allProperties:', allProperties.length, 'items');
    }
    
    console.log('🔍 Searching for property with ID:', propertyId);
    const property = allProperties.find(p => p && p.id === propertyId);
    console.log('🏠 Found property:', property ? property.title : 'Not found');
    
    if (!property) {
        showNotification('Property not found!', 'error');
        return;
    }
    
    const modal = document.getElementById('confirmation-modal');
    const message = document.getElementById('confirmation-message');
    const confirmBtn = document.getElementById('confirm-action-btn');
    
    message.textContent = `Are you sure you want to delete "${property.title}"? This action cannot be undone.`;
    
    confirmBtn.onclick = () => {
        showLoading(true);
        
        setTimeout(() => {
            try {
                console.log('🚀 Calling db.deleteProperty with ID:', propertyId);
                db.deleteProperty(propertyId);
                console.log('✅ Database deletion successful');
                showNotification('Property deleted successfully!', 'success');
                loadProperties();
                loadDashboardData();
                closeModal();
                
                // Trigger real-time update for main website
                triggerWebsiteUpdate();
            } catch (error) {
                console.error('❌ Error deleting property:', error);
                console.error('❌ Error stack:', error.stack);
                showNotification('Error deleting property: ' + error.message, 'error');
            } finally {
                showLoading(false);
            }
        }, 500);
    };
    
    modal.classList.add('active');
}

function resetForm() {
    const form = document.getElementById('add-property-form');
    form.reset();
    form.removeAttribute('data-editing');
}

// ==================== USER MANAGEMENT ====================
function loadUsers() {
    const usersDb = JSON.parse(localStorage.getItem('users_db'));
    allUsers = Object.values(usersDb);
    
    renderUsers();
}

function renderUsers() {
    const usersList = document.getElementById('users-list');
    
    usersList.innerHTML = allUsers.map(user => `
        <div class="user-item">
            <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
            <div class="user-info">
                <h4>${user.name}</h4>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Registered:</strong> ${new Date(user.dateRegistered).toLocaleDateString()}</p>
                <p><strong>Role:</strong> ${user.role}</p>
            </div>
        </div>
    `).join('');
}

// ==================== ANALYTICS ====================
function generateAnalytics() {
    generatePropertyTypeChart();
    generatePriceRangeChart();
}

function generatePropertyTypeChart() {
    const properties = db.getAllProperties();
    const typeCount = {};
    
    properties.forEach(property => {
        typeCount[property.type] = (typeCount[property.type] || 0) + 1;
    });
    
    const chart = document.getElementById('property-type-chart');
    chart.innerHTML = `
        <div style="text-align: center;">
            ${Object.entries(typeCount).map(([type, count]) => `
                <div style="margin: 0.5rem 0; padding: 0.5rem; background: #e3f2fd; border-radius: 5px;">
                    <strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${count} properties
                </div>
            `).join('')}
        </div>
    `;
}

function generatePriceRangeChart() {
    const properties = db.getAllProperties();
    const priceRanges = {
        'Under $500K': 0,
        '$500K - $1M': 0,
        '$1M - $2M': 0,
        'Over $2M': 0
    };
    
    properties.forEach(property => {
        if (property.price < 500000) {
            priceRanges['Under $500K']++;
        } else if (property.price < 1000000) {
            priceRanges['$500K - $1M']++;
        } else if (property.price < 2000000) {
            priceRanges['$1M - $2M']++;
        } else {
            priceRanges['Over $2M']++;
        }
    });
    
    const chart = document.getElementById('price-range-chart');
    chart.innerHTML = `
        <div style="text-align: center;">
            ${Object.entries(priceRanges).map(([range, count]) => `
                <div style="margin: 0.5rem 0; padding: 0.5rem; background: #f0f8ff; border-radius: 5px;">
                    <strong>${range}:</strong> ${count} properties
                </div>
            `).join('')}
        </div>
    `;
}

// ==================== UTILITY FUNCTIONS ====================
function formatPrice(price) {
    if (price >= 1000000) {
        return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
        return `$${(price / 1000).toFixed(0)}K`;
    } else {
        return `$${price.toLocaleString()}`;
    }
}

function showLoading(show = true) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        if (show) {
            overlay.style.display = 'flex';
            overlay.classList.add('active');
        } else {
            overlay.style.display = 'none';
            overlay.classList.remove('active');
        }
    } else {
        console.log(`Loading: ${show ? 'ON' : 'OFF'}`);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function closePropertyModal() {
    document.getElementById('property-modal').classList.remove('active');
}

// ==================== GLOBAL FUNCTION EXPORTS ====================
window.showSection = showSection;
window.handleAddProperty = handleAddProperty;
window.filterProperties = filterProperties;
window.viewProperty = viewProperty;
window.editProperty = editProperty;
window.deleteProperty = deleteProperty;
window.resetForm = resetForm;
window.closeModal = closeModal;
window.closePropertyModal = closePropertyModal;

// ==================== REAL-TIME SYNC FUNCTIONS ====================
function triggerWebsiteUpdate() {
    // Trigger storage event for real-time updates on main website
    console.log('🔄 Triggering website update...');
    
    // Create a temporary storage event trigger
    const updateData = {
        timestamp: new Date().toISOString(),
        action: 'properties_updated',
        propertyCount: db.getAllProperties().length
    };
    
    // Store and immediately remove to trigger storage event
    localStorage.setItem('website_update_trigger', JSON.stringify(updateData));
    
    // Small delay then remove to ensure event fires
    setTimeout(() => {
        localStorage.removeItem('website_update_trigger');
        console.log('✅ Website update notification sent');
    }, 100);
}

// ==================== SAFETY CHECK ====================
// Ensure initialization happens even if called multiple times
if (typeof window !== 'undefined') {
    // Make functions globally available
    window.deleteProperty = deleteProperty;
    window.editProperty = editProperty;
    window.viewProperty = viewProperty;
    window.initializeAdminPanel = initializeAdminPanel;
    
    // Add a backup initialization in case of issues
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Safety check: ensure allProperties is initialized
            if (!allProperties || !Array.isArray(allProperties)) {
                console.log('🔄 Safety check: Re-initializing allProperties');
                allProperties = db.getAllProperties() || [];
            }
        });
    }
} 