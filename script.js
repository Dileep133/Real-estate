
const citiesDatabase = {
    hyderabad: {
        name: "Hyderabad",
        state: "Telangana",
        properties: [
            { id: 1, title: "Luxury  in Banjara Hills", price: 85000000, type: "villa", beds: 4, baths: 4, sqft: 3500, image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80" },
            { id: 2, title: "Modern Apartment in Gachibowli", price: 6500000, type: "apartment", beds: 3, baths: 2, sqft: 1800, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
            { id: 3, title: "Tech City Condo in HITEC City", price: 8200000, type: "condo", beds: 2, baths: 2, sqft: 1400, image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" }
        ]
    },
    bangalore: {
        name: "Bangalore",
        state: "Karnataka",
        properties: [
            { id: 4, title: "Garden City Villa in Koramangala", price: 95000000, type: "villa", beds: 5, baths: 4, sqft: 4000, image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
            { id: 5, title: "IT Hub Apartment in Whitefield", price: 7200000, type: "apartment", beds: 3, baths: 3, sqft: 2000, image: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80" },
            { id: 6, title: "Silicon Valley House in Electronic City", price: 5800000, type: "house", beds: 3, baths: 2, sqft: 1600, image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80" }
        ]
    },
    mumbai: {
        name: "Mumbai",
        state: "Maharashtra",
        properties: [
            { id: 7, title: "Marine Drive Luxury Penthouse", price: 180000000, type: "apartment", beds: 4, baths: 5, sqft: 2800, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80" },
            { id: 8, title: "Bandra West Modern Condo", price: 125000000, type: "condo", beds: 3, baths: 3, sqft: 2200, image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
            { id: 9, title: "Powai Lake View Villa", price: 220000000, type: "villa", beds: 6, baths: 6, sqft: 5000, image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80" }
        ]
    },
    delhi: {
        name: "New Delhi",
        state: "Delhi",
        properties: [
            { id: 10, title: "South Delhi Designer Villa", price: 150000000, type: "villa", beds: 5, baths: 5, sqft: 4500, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
            { id: 11, title: "Connaught Place Heritage Apartment", price: 95000000, type: "apartment", beds: 3, baths: 3, sqft: 2500, image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80" },
            { id: 12, title: "Gurgaon Corporate House", price: 78000000, type: "house", beds: 4, baths: 3, sqft: 3000, image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" }
        ]
    },
    chennai: {
        name: "Chennai",
        state: "Tamil Nadu",
        properties: [
            { id: 13, title: "Marina Beach Luxury Apartment", price: 72000000, type: "apartment", beds: 3, baths: 3, sqft: 2200, image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2096&q=80" },
            { id: 14, title: "IT Corridor Villa in OMR", price: 85000000, type: "villa", beds: 4, baths: 4, sqft: 3200, image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80" }
        ]
    },
    pune: {
        name: "Pune",
        state: "Maharashtra",
        properties: [
            { id: 15, title: "Pune Hills Modern Villa", price: 68000000, type: "villa", beds: 4, baths: 3, sqft: 2800, image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
            { id: 16, title: "IT Park Luxury Condo", price: 52000000, type: "condo", beds: 2, baths: 2, sqft: 1500, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" }
        ]
    }
};

// ==================== GLOBAL VARIABLES ====================
let currentProperties = [];
let filteredProperties = [];
let currentPage = 1;
const propertiesPerPage = 6;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// ==================== UTILITY FUNCTIONS ====================

// Format currency in Indian Rupees
function formatPrice(price) {
    if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
        return `₹${(price / 100000).toFixed(1)} L`;
    } else {
        return `₹${price.toLocaleString('en-IN')}`;
    }
}

// Show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== INITIALIZATION ====================

// Initialize the application
function initializeApp() {
    console.log('🏠 Elite Realty Application Initialized');
    
    // Load all properties
    loadAllProperties();
    
    // Setup city autocomplete
    setupCityAutocomplete();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup navigation
    setupNavigation();
    
    // Setup property interactions
    setupPropertyInteractions();
    
    // Setup search functionality
    setupSearchFunctionality();
    
    // Load user preferences
    loadUserPreferences();
    
    showNotification('Elite Realty loaded successfully!', 'success');
}

// Load all properties from database
function loadAllProperties() {
    currentProperties = [];
    Object.values(citiesDatabase).forEach(city => {
        currentProperties = currentProperties.concat(city.properties.map(prop => ({
            ...prop,
            city: city.name,
            state: city.state
        })));
    });
    filteredProperties = [...currentProperties];
    displayProperties(filteredProperties);
}

// ==================== CITY AUTOCOMPLETE ====================

function setupCityAutocomplete() {
    const locationInput = document.getElementById('location');
    const citiesList = Object.values(citiesDatabase).map(city => city.name);
    
    locationInput.addEventListener('input', function(e) {
        const value = e.target.value.toLowerCase();
        const suggestions = citiesList.filter(city => 
            city.toLowerCase().includes(value)
        );
        
        showCitySuggestions(suggestions, locationInput);
    });
}

function showCitySuggestions(suggestions, inputElement) {
    // Remove existing suggestions
    const existingSuggestions = document.querySelector('.city-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
    
    if (suggestions.length === 0 || inputElement.value === '') return;
    
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'city-suggestions';
    suggestionsDiv.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 5px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    `;
    
    suggestions.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = city;
        suggestionItem.style.cssText = `
            padding: 0.8rem;
            cursor: pointer;
            border-bottom: 1px solid #eee;
            transition: background 0.3s;
        `;
        
        suggestionItem.addEventListener('mouseenter', () => {
            suggestionItem.style.background = '#f8f9fa';
        });
        
        suggestionItem.addEventListener('mouseleave', () => {
            suggestionItem.style.background = 'white';
        });
        
        suggestionItem.addEventListener('click', () => {
            inputElement.value = city;
            suggestionsDiv.remove();
            filterPropertiesByCity(city);
        });
        
        suggestionsDiv.appendChild(suggestionItem);
    });
    
    inputElement.parentElement.style.position = 'relative';
    inputElement.parentElement.appendChild(suggestionsDiv);
}

// ==================== SEARCH FUNCTIONALITY ====================

function setupSearchFunctionality() {
    const searchForm = document.querySelector('.search-form');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });
    
    // Real-time filtering
    const inputs = searchForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', performSearch);
    });
}

function performSearch() {
    const location = document.getElementById('location').value.toLowerCase();
    const propertyType = document.getElementById('property-type').value;
    const priceRange = document.getElementById('price-range').value;
    const bedrooms = document.getElementById('bedrooms').value;
    
    let filtered = [...currentProperties];
    
    // Filter by location
    if (location) {
        filtered = filtered.filter(prop => 
            prop.city.toLowerCase().includes(location) ||
            prop.state.toLowerCase().includes(location)
        );
    }
    
    // Filter by property type
    if (propertyType) {
        filtered = filtered.filter(prop => prop.type === propertyType);
    }
    
    // Filter by price range
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(p => parseInt(p) || Infinity);
        filtered = filtered.filter(prop => {
            if (max === Infinity) return prop.price >= min;
            return prop.price >= min && prop.price <= max;
        });
    }
    
    // Filter by bedrooms
    if (bedrooms) {
        const minBeds = parseInt(bedrooms);
        filtered = filtered.filter(prop => prop.beds >= minBeds);
    }
    
    filteredProperties = filtered;
    displayProperties(filteredProperties);
    
    showNotification(`Found ${filteredProperties.length} properties matching your criteria`, 'success');
}

function filterPropertiesByCity(cityName) {
    const cityData = Object.values(citiesDatabase).find(city => 
        city.name.toLowerCase() === cityName.toLowerCase()
    );
    
    if (cityData) {
        filteredProperties = cityData.properties.map(prop => ({
            ...prop,
            city: cityData.name,
            state: cityData.state
        }));
        displayProperties(filteredProperties);
        showNotification(`Showing properties in ${cityName}`, 'success');
    }
}

// ==================== PROPERTY DISPLAY ====================

function displayProperties(properties) {
    const propertiesGrid = document.querySelector('.properties-grid');
    
    if (properties.length === 0) {
        propertiesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria</p>
                <button onclick="loadAllProperties()" class="cta-button" style="margin-top: 1rem;">
                    View All Properties
                </button>
            </div>
        `;
        return;
    }
    
    propertiesGrid.innerHTML = properties.map(property => `
        <div class="property-card" data-property-id="${property.id}">
            <div class="property-image" style="background-image: url('${property.image}');">
                <div class="property-price">${formatPrice(property.price)}</div>
                <div class="property-actions">
                    <button class="favorite-btn ${favorites.includes(property.id) ? 'active' : ''}" 
                            onclick="toggleFavorite(${property.id})">
                        ❤️
                    </button>
                    <button class="share-btn" onclick="shareProperty(${property.id})">
                        📤
                    </button>
                </div>
            </div>
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">📍 ${property.city}, ${property.state}</p>
                <div class="property-features">
                    <span class="feature">🛏️ ${property.beds} Beds</span>
                    <span class="feature">🚿 ${property.baths} Baths</span>
                    <span class="feature">📐 ${property.sqft} sq ft</span>
                </div>
                <div class="property-actions-bottom">
                    <button class="view-details-btn" onclick="viewPropertyDetails(${property.id})">
                        View Details
                    </button>
                    <button class="contact-btn" onclick="contactForProperty(${property.id})">
                        Contact Agent
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add enhanced styles for new elements
    addPropertyCardStyles();
}

function addPropertyCardStyles() {
    if (document.getElementById('dynamic-property-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'dynamic-property-styles';
    style.textContent = `
        .property-actions {
            position: absolute;
            top: 1rem;
            left: 1rem;
            display: flex;
            gap: 0.5rem;
        }
        
        .favorite-btn, .share-btn {
            background: rgba(255,255,255,0.9);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }
        
        .favorite-btn.active {
            background: #e74c3c;
            color: white;
        }
        
        .property-actions-bottom {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .view-details-btn, .contact-btn {
            flex: 1;
            padding: 0.6rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
        }
        
        .view-details-btn {
            background: #3498db;
            color: white;
        }
        
        .contact-btn {
            background: #27ae60;
            color: white;
        }
        
        .view-details-btn:hover {
            background: #2980b9;
        }
        
        .contact-btn:hover {
            background: #229954;
        }
    `;
    
    document.head.appendChild(style);
}

// ==================== PROPERTY INTERACTIONS ====================

function setupPropertyInteractions() {
    // Property card hover effects
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.property-card')) {
            const card = e.target.closest('.property-card');
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.property-card')) {
            const card = e.target.closest('.property-card');
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        }
    });
}

function toggleFavorite(propertyId) {
    const index = favorites.indexOf(propertyId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removed from favorites', 'info');
    } else {
        favorites.push(propertyId);
        showNotification('Added to favorites', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Update the button
    const btn = document.querySelector(`[data-property-id="${propertyId}"] .favorite-btn`);
    if (btn) {
        btn.classList.toggle('active');
    }
}

function shareProperty(propertyId) {
    if (!currentProperties || !Array.isArray(currentProperties)) {
        showNotification('Property information not available', 'error');
        return;
    }
    const property = currentProperties.find(p => p && p.id === propertyId);
    
    if (navigator.share) {
        navigator.share({
            title: property.title,
            text: `Check out this amazing property: ${property.title} in ${property.city}`,
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        const url = `${window.location.href}?property=${propertyId}`;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Property link copied to clipboard!', 'success');
        });
    }
}

function viewPropertyDetails(propertyId) {
    if (!currentProperties || !Array.isArray(currentProperties)) {
        showNotification('Property information not available', 'error');
        return;
    }
    const property = currentProperties.find(p => p && p.id === propertyId);
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'property-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div class="modal-image" style="background-image: url('${property.image}');"></div>
            <div class="modal-info">
                <h2>${property.title}</h2>
                <p class="modal-location">📍 ${property.city}, ${property.state}</p>
                <p class="modal-price">${formatPrice(property.price)}</p>
                <div class="modal-features">
                    <div class="feature-item">
                        <strong>🛏️ Bedrooms:</strong> ${property.beds}
                    </div>
                    <div class="feature-item">
                        <strong>🚿 Bathrooms:</strong> ${property.baths}
                    </div>
                    <div class="feature-item">
                        <strong>📐 Area:</strong> ${property.sqft} sq ft
                    </div>
                    <div class="feature-item">
                        <strong>🏠 Type:</strong> ${property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="schedule-visit-btn" onclick="scheduleVisit(${property.id})">
                        Schedule Visit
                    </button>
                    <button class="get-loan-btn" onclick="getLoanInfo(${property.id})">
                        Get Loan Info
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    addModalStyles();
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        .property-modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background: white;
            border-radius: 10px;
            max-width: 800px;
            width: 90%;
            max-height: 90%;
            overflow-y: auto;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1001;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .modal-image {
            height: 300px;
            background-size: cover;
            background-position: center;
        }
        
        .modal-info {
            padding: 2rem;
        }
        
        .modal-price {
            font-size: 2rem;
            color: #3498db;
            font-weight: bold;
            margin: 1rem 0;
        }
        
        .modal-features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .feature-item {
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 5px;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .schedule-visit-btn, .get-loan-btn {
            flex: 1;
            padding: 1rem;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .schedule-visit-btn {
            background: #3498db;
            color: white;
        }
        
        .get-loan-btn {
            background: #27ae60;
            color: white;
        }
    `;
    
    document.head.appendChild(style);
}

function contactForProperty(propertyId) {
    if (!currentProperties || !Array.isArray(currentProperties)) {
        showNotification('Property information not available', 'error');
        return;
    }
    const property = currentProperties.find(p => p && p.id === propertyId);
    
    // Create contact form modal
    const modal = document.createElement('div');
    modal.className = 'property-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div class="modal-info">
                <h2>Contact Agent</h2>
                <p>Interested in: ${property.title}</p>
                <form class="contact-form" onsubmit="submitContactForm(event, ${property.id})">
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone:</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Message:</label>
                        <textarea name="message" rows="4" placeholder="I'm interested in this property..."></textarea>
                    </div>
                    <button type="submit" class="submit-contact-btn">Send Message</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function submitContactForm(event, propertyId) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        propertyId,
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage (in real app, send to server)
    const contacts = JSON.parse(localStorage.getItem('propertyContacts')) || [];
    contacts.push(contactData);
    localStorage.setItem('propertyContacts', JSON.stringify(contacts));
    
    showNotification('Your message has been sent! An agent will contact you soon.', 'success');
    event.target.closest('.property-modal').remove();
}

function scheduleVisit(propertyId) {
    showNotification('Visit scheduling feature will be available soon!', 'info');
}

function getLoanInfo(propertyId) {
    if (!currentProperties || !Array.isArray(currentProperties)) {
        showNotification('Property information not available', 'error');
        return;
    }
    const property = currentProperties.find(p => p && p.id === propertyId);
    
    if (!property) {
        showNotification('Property not found', 'error');
        return;
    }
    
    const loanAmount = property.price * 0.8; // 80% loan
    const emi = calculateEMI(loanAmount, 8.5, 20); // 8.5% interest, 20 years
    
    alert(`Loan Information for ${property.title}:\n\nProperty Price: ${formatPrice(property.price)}\nLoan Amount (80%): ${formatPrice(loanAmount)}\nEstimated EMI: ${formatPrice(emi)}/month\n\nContact our loan specialist for detailed information.`);
}

function calculateEMI(principal, rate, years) {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
}

// ==================== NAVIGATION ====================

function setupNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(44, 62, 80, 0.98)';
        } else {
            header.style.background = 'rgba(44, 62, 80, 0.95)';
        }
    });
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    // Service card interactions
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            showNotification(`Learn more about our ${serviceName} service!`, 'info');
        });
    });
    
    // CTA button interactions
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#properties') {
                e.preventDefault();
                document.querySelector('#properties').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== USER PREFERENCES ====================

function loadUserPreferences() {
    const preferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
    
    // Apply saved search filters
    if (preferences.lastSearch) {
        const { location, propertyType, priceRange, bedrooms } = preferences.lastSearch;
        
        if (location) document.getElementById('location').value = location;
        if (propertyType) document.getElementById('property-type').value = propertyType;
        if (priceRange) document.getElementById('price-range').value = priceRange;
        if (bedrooms) document.getElementById('bedrooms').value = bedrooms;
    }
}

function saveUserPreferences() {
    const preferences = {
        lastSearch: {
            location: document.getElementById('location').value,
            propertyType: document.getElementById('property-type').value,
            priceRange: document.getElementById('price-range').value,
            bedrooms: document.getElementById('bedrooms').value
        },
        favorites: favorites,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

// ==================== SERVICES DATABASE ====================

const servicesDatabase = {
    'property-sales': {
        title: 'Property Sales',
        icon: '🏠',
        description: 'Complete end-to-end property buying and selling solutions',
        fullDescription: `Our Property Sales service provides comprehensive support throughout your real estate journey. Whether you're a first-time buyer or an experienced investor, our expert team ensures a smooth and successful transaction.`,
        features: [
            'Property Search & Discovery',
            'Market Price Analysis',
            'Negotiation Support',
            'Documentation Assistance',
            'Legal Verification',
            'Registration Support',
            'Home Loan Assistance',
            'Post-Sale Support'
        ],
        benefits: [
            'Expert market knowledge across major Indian cities',
            'Verified property listings with clear titles',
            'Professional photography and virtual tours',
            'Dedicated relationship manager',
            'End-to-end transaction management',
            'Legal compliance and documentation'
        ],
        pricing: {
            buying: '1% of property value (minimum ₹50,000)',
            selling: '2% of property value (minimum ₹1,00,000)'
        },
        timeline: '15-45 days depending on property type and documentation',
        contact: {
            phone: '+91-9876543210',
            email: 'sales@eliterealty.com',
            whatsapp: '+91-9876543210'
        }
    },
    'property-management': {
        title: 'Property Management',
        icon: '🔑',
        description: 'Professional property management for maximum returns',
        fullDescription: `Maximize your property investment returns with our comprehensive property management services. We handle everything from tenant screening to maintenance, ensuring your property generates optimal income.`,
        features: [
            'Tenant Screening & Verification',
            'Rent Collection & Management',
            'Property Maintenance & Repairs',
            'Legal Compliance Management',
            'Market Rent Analysis',
            'Tenant Relations Management',
            'Property Insurance Coordination',
            'Financial Reporting'
        ],
        benefits: [
            'Guaranteed rent collection',
            'Professional tenant screening',
            '24/7 maintenance support',
            'Detailed monthly reports',
            'Legal protection and compliance',
            'Property value enhancement'
        ],
        pricing: {
            residential: '8-10% of monthly rent',
            commercial: '6-8% of monthly rent',
            setup: 'One-time setup fee: ₹25,000'
        },
        timeline: 'Immediate service activation after agreement',
        contact: {
            phone: '+91-9876543211',
            email: 'management@eliterealty.com',
            whatsapp: '+91-9876543211'
        }
    },
    'investment-consulting': {
        title: 'Investment Consulting',
        icon: '💰',
        description: 'Strategic real estate investment guidance',
        fullDescription: `Build wealth through strategic real estate investments with our expert consulting services. Our team analyzes market trends, identifies profitable opportunities, and guides you toward smart investment decisions.`,
        features: [
            'Market Research & Analysis',
            'Investment Opportunity Identification',
            'ROI Calculation & Projections',
            'Risk Assessment',
            'Portfolio Diversification Strategy',
            'Tax Planning Guidance',
            'Exit Strategy Planning',
            'Investment Performance Tracking'
        ],
        benefits: [
            'Data-driven investment decisions',
            'Market timing expertise',
            'Risk mitigation strategies',
            'Tax optimization guidance',
            'Portfolio performance monitoring',
            'Access to exclusive deals'
        ],
        pricing: {
            consultation: '₹5,000 per hour',
            monthly: '₹25,000 per month (unlimited consultations)',
            project: '0.5% of investment value (for specific projects)'
        },
        timeline: 'Ongoing consultation and support',
        contact: {
            phone: '+91-9876543212',
            email: 'invest@eliterealty.com',
            whatsapp: '+91-9876543212'
        }
    },
    'market-analysis': {
        title: 'Market Analysis',
        icon: '📊',
        description: 'Comprehensive real estate market insights',
        fullDescription: `Make informed decisions with our detailed market analysis reports. We provide comprehensive data on property trends, pricing patterns, and market forecasts across major Indian cities.`,
        features: [
            'Comparative Market Analysis (CMA)',
            'Price Trend Reports',
            'Neighborhood Analysis',
            'Infrastructure Development Impact',
            'Market Forecast Reports',
            'Investment Hotspot Identification',
            'Rental Yield Analysis',
            'Market Timing Recommendations'
        ],
        benefits: [
            'Accurate property valuations',
            'Market trend predictions',
            'Investment timing guidance',
            'Competitive analysis',
            'Location-specific insights',
            'Regular market updates'
        ],
        pricing: {
            basic: '₹15,000 per report',
            comprehensive: '₹35,000 per report',
            subscription: '₹1,00,000 per year (monthly reports)'
        },
        timeline: '7-10 business days for report delivery',
        contact: {
            phone: '+91-9876543213',
            email: 'research@eliterealty.com',
            whatsapp: '+91-9876543213'
        }
    },
    'property-development': {
        title: 'Property Development',
        icon: '🏗️',
        description: 'End-to-end property development solutions',
        fullDescription: `Transform your vision into reality with our comprehensive property development services. From concept to completion, we manage every aspect of residential and commercial property development.`,
        features: [
            'Project Planning & Design',
            'Government Approvals & Permits',
            'Construction Management',
            'Quality Control & Supervision',
            'Timeline & Budget Management',
            'Vendor & Contractor Coordination',
            'Material Procurement',
            'Project Marketing & Sales'
        ],
        benefits: [
            'Turnkey development solutions',
            'Expert project management',
            'Quality construction standards',
            'Timely project delivery',
            'Cost-effective solutions',
            'Compliance with regulations'
        ],
        pricing: {
            residential: '₹1,800-2,500 per sq ft',
            commercial: '₹2,200-3,200 per sq ft',
            consultation: '₹2,00,000 for feasibility study'
        },
        timeline: '12-36 months depending on project scope',
        contact: {
            phone: '+91-9876543214',
            email: 'development@eliterealty.com',
            whatsapp: '+91-9876543214'
        }
    },
    'legal-support': {
        title: 'Legal Support',
        icon: '⚖️',
        description: 'Professional legal assistance for real estate',
        fullDescription: `Navigate complex real estate legal requirements with confidence. Our experienced legal team provides comprehensive support for all types of property transactions and disputes.`,
        features: [
            'Title Verification & Due Diligence',
            'Contract Drafting & Review',
            'Registration Assistance',
            'Legal Documentation',
            'Dispute Resolution',
            'Property Litigation Support',
            'Compliance Advisory',
            'Tax Planning Guidance'
        ],
        benefits: [
            'Expert legal guidance',
            'Risk mitigation',
            'Proper documentation',
            'Compliance assurance',
            'Dispute prevention',
            'Legal protection'
        ],
        pricing: {
            consultation: '₹8,000 per hour',
            documentation: '₹25,000-75,000 per transaction',
            litigation: '₹1,50,000+ depending on complexity'
        },
        timeline: 'Variable based on service requirements',
        contact: {
            phone: '+91-9876543215',
            email: 'legal@eliterealty.com',
            whatsapp: '+91-9876543215'
        }
    }
};

// ==================== SERVICE OPERATIONS ====================

function openServiceDetails(serviceId) {
    const service = servicesDatabase[serviceId];
    
    if (!service) {
        showNotification('Service information not available', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="service-modal-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            
            <div class="service-header">
                <div class="service-icon-large">${service.icon}</div>
                <div class="service-title-section">
                    <h2>${service.title}</h2>
                    <p class="service-subtitle">${service.description}</p>
                </div>
            </div>
            
            <div class="service-content">
                <div class="service-description">
                    <h3>Overview</h3>
                    <p>${service.fullDescription}</p>
                </div>
                
                <div class="service-features">
                    <h3>What We Offer</h3>
                    <ul>
                        ${service.features.map(feature => `<li>✅ ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="service-benefits">
                    <h3>Why Choose Us</h3>
                    <ul>
                        ${service.benefits.map(benefit => `<li>🌟 ${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="service-pricing">
                    <h3>Pricing</h3>
                    <div class="pricing-grid">
                        ${Object.entries(service.pricing).map(([key, value]) => `
                            <div class="pricing-item">
                                <strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                                <span>${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="service-timeline">
                    <h3>Timeline</h3>
                    <p>⏱️ ${service.timeline}</p>
                </div>
                
                <div class="service-contact">
                    <h3>Get Started Today</h3>
                    <div class="contact-options">
                        <a href="tel:${service.contact.phone}" class="contact-btn phone-btn">
                            📞 Call Now
                        </a>
                        <a href="mailto:${service.contact.email}" class="contact-btn email-btn">
                            📧 Send Email
                        </a>
                        <a href="https://wa.me/${service.contact.whatsapp.replace(/[^0-9]/g, '')}" 
                           target="_blank" class="contact-btn whatsapp-btn">
                            📱 WhatsApp
                        </a>
                    </div>
                </div>
                
                <div class="service-actions">
                    <button class="book-consultation-btn" onclick="bookServiceConsultation('${serviceId}')">
                        📅 Book Free Consultation
                    </button>
                    <button class="request-quote-btn" onclick="requestServiceQuote('${serviceId}')">
                        💼 Request Quote
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add service modal styles
    addServiceModalStyles();
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Analytics tracking
    trackServiceView(serviceId);
}

function addServiceModalStyles() {
    if (document.getElementById('service-modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'service-modal-styles';
    style.textContent = `
        .service-modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            align-items: center;
            justify-content: center;
            overflow-y: auto;
        }
        
        .service-modal-content {
            background: white;
            border-radius: 15px;
            max-width: 900px;
            width: 95%;
            max-height: 95vh;
            overflow-y: auto;
            position: relative;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .service-header {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 2rem;
            border-radius: 15px 15px 0 0;
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        
        .service-icon-large {
            font-size: 4rem;
            background: rgba(255,255,255,0.2);
            padding: 1rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .service-title-section h2 {
            font-size: 2.5rem;
            margin: 0;
        }
        
        .service-subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            margin: 0.5rem 0 0 0;
        }
        
        .service-content {
            padding: 2rem;
        }
        
        .service-content h3 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 0.5rem;
            margin: 2rem 0 1rem 0;
        }
        
        .service-content ul {
            list-style: none;
            padding: 0;
        }
        
        .service-content li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #ecf0f1;
        }
        
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        
        .pricing-item {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .contact-options {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin: 1rem 0;
        }
        
        .contact-btn {
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s;
            flex: 1;
            text-align: center;
            min-width: 150px;
        }
        
        .phone-btn {
            background: #27ae60;
            color: white;
        }
        
        .email-btn {
            background: #3498db;
            color: white;
        }
        
        .whatsapp-btn {
            background: #25d366;
            color: white;
        }
        
        .contact-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .service-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 2px solid #ecf0f1;
        }
        
        .book-consultation-btn, .request-quote-btn {
            flex: 1;
            padding: 1rem;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 1.1rem;
        }
        
        .book-consultation-btn {
            background: #e74c3c;
            color: white;
        }
        
        .request-quote-btn {
            background: #f39c12;
            color: white;
        }
        
        .book-consultation-btn:hover {
            background: #c0392b;
        }
        
        .request-quote-btn:hover {
            background: #e67e22;
        }
        
        .service-cta {
            margin-top: 1rem;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .service-card:hover .service-cta {
            opacity: 1;
        }
        
        .learn-more-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
            width: 100%;
        }
        
        .learn-more-btn:hover {
            background: #2980b9;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .service-header {
                flex-direction: column;
                text-align: center;
            }
            
            .service-icon-large {
                font-size: 3rem;
            }
            
            .contact-options {
                flex-direction: column;
            }
            
            .service-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(style);
}

function bookServiceConsultation(serviceId) {
    const service = servicesDatabase[serviceId];
    
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="service-modal-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            
            <div class="consultation-header">
                <h2>📅 Book Free Consultation</h2>
                <p>Schedule a free consultation for ${service.title}</p>
            </div>
            
            <form class="consultation-form" onsubmit="submitConsultationRequest(event, '${serviceId}')">
                <div class="form-row">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" name="phone" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Email Address *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Preferred City</label>
                        <select name="city">
                            <option value="">Select City</option>
                            <option value="hyderabad">Hyderabad</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">Delhi</option>
                            <option value="chennai">Chennai</option>
                            <option value="pune">Pune</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Preferred Date & Time</label>
                    <input type="datetime-local" name="datetime" required>
                </div>
                
                <div class="form-group">
                    <label>Consultation Type</label>
                    <select name="type" required>
                        <option value="">Select Type</option>
                        <option value="phone">Phone Call</option>
                        <option value="video">Video Call</option>
                        <option value="office">Office Visit</option>
                        <option value="site">Site Visit</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Specific Requirements</label>
                    <textarea name="requirements" rows="4" placeholder="Please describe your specific needs..."></textarea>
                </div>
                
                <button type="submit" class="submit-consultation-btn">
                    📅 Book Consultation
                </button>
            </form>
        </div>
    `;
    
    // Close previous modal
    const existingModal = document.querySelector('.service-modal');
    if (existingModal) existingModal.remove();
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    addConsultationFormStyles();
}

function requestServiceQuote(serviceId) {
    const service = servicesDatabase[serviceId];
    
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="service-modal-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            
            <div class="quote-header">
                <h2>💼 Request Quote</h2>
                <p>Get a detailed quote for ${service.title}</p>
            </div>
            
            <form class="quote-form" onsubmit="submitQuoteRequest(event, '${serviceId}')">
                <div class="form-row">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Company/Organization</label>
                        <input type="text" name="company">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Email Address *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" name="phone" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Project Location</label>
                    <input type="text" name="location" placeholder="City, Area">
                </div>
                
                <div class="form-group">
                    <label>Project Budget Range</label>
                    <select name="budget">
                        <option value="">Select Budget Range</option>
                        <option value="under-50l">Under ₹50 Lakh</option>
                        <option value="50l-1cr">₹50 Lakh - ₹1 Crore</option>
                        <option value="1cr-5cr">₹1 Crore - ₹5 Crore</option>
                        <option value="5cr-10cr">₹5 Crore - ₹10 Crore</option>
                        <option value="above-10cr">Above ₹10 Crore</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Timeline</label>
                    <select name="timeline">
                        <option value="">Select Timeline</option>
                        <option value="urgent">Immediate (Within 1 month)</option>
                        <option value="short">Short-term (1-3 months)</option>
                        <option value="medium">Medium-term (3-6 months)</option>
                        <option value="long">Long-term (6+ months)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Project Details *</label>
                    <textarea name="details" rows="5" required placeholder="Please provide detailed information about your project requirements..."></textarea>
                </div>
                
                <button type="submit" class="submit-quote-btn">
                    💼 Request Quote
                </button>
            </form>
        </div>
    `;
    
    // Close previous modal
    const existingModal = document.querySelector('.service-modal');
    if (existingModal) existingModal.remove();
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    addConsultationFormStyles();
}

function addConsultationFormStyles() {
    if (document.getElementById('consultation-form-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'consultation-form-styles';
    style.textContent = `
        .consultation-header, .quote-header {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 2rem;
            border-radius: 15px 15px 0 0;
            text-align: center;
        }
        
        .consultation-form, .quote-form {
            padding: 2rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .form-group input, .form-group select, .form-group textarea {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #e0e0e0;
            border-radius: 5px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
            outline: none;
            border-color: #3498db;
        }
        
        .submit-consultation-btn, .submit-quote-btn {
            width: 100%;
            padding: 1rem;
            background: #27ae60;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 1rem;
        }
        
        .submit-consultation-btn:hover, .submit-quote-btn:hover {
            background: #229954;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(style);
}

function submitConsultationRequest(event, serviceId) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const consultationData = {
        serviceId,
        serviceName: servicesDatabase[serviceId].title,
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        city: formData.get('city'),
        datetime: formData.get('datetime'),
        type: formData.get('type'),
        requirements: formData.get('requirements'),
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    // Store in localStorage (in real app, send to server)
    const consultations = JSON.parse(localStorage.getItem('consultationRequests')) || [];
    consultations.push(consultationData);
    localStorage.setItem('consultationRequests', JSON.stringify(consultations));
    
    showNotification('Consultation booked successfully! We will contact you soon.', 'success');
    event.target.closest('.service-modal').remove();
    
    // Send confirmation email (simulation)
    setTimeout(() => {
        showNotification('Confirmation email sent to ' + consultationData.email, 'info');
    }, 2000);
}

function submitQuoteRequest(event, serviceId) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const quoteData = {
        serviceId,
        serviceName: servicesDatabase[serviceId].title,
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        location: formData.get('location'),
        budget: formData.get('budget'),
        timeline: formData.get('timeline'),
        details: formData.get('details'),
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    // Store in localStorage (in real app, send to server)
    const quotes = JSON.parse(localStorage.getItem('quoteRequests')) || [];
    quotes.push(quoteData);
    localStorage.setItem('quoteRequests', JSON.stringify(quotes));
    
    showNotification('Quote request submitted successfully! We will respond within 24 hours.', 'success');
    event.target.closest('.service-modal').remove();
    
    // Send confirmation email (simulation)
    setTimeout(() => {
        showNotification('Detailed quote will be sent to ' + quoteData.email, 'info');
    }, 2000);
}

function trackServiceView(serviceId) {
    const serviceViews = JSON.parse(localStorage.getItem('serviceViews')) || {};
    serviceViews[serviceId] = (serviceViews[serviceId] || 0) + 1;
    serviceViews[`${serviceId}_lastViewed`] = new Date().toISOString();
    localStorage.setItem('serviceViews', JSON.stringify(serviceViews));
}

// ==================== 3D VIEW FUNCTIONALITY ====================

// 3D Images Database for each property
const property3DImages = {
    1: { // Modern Family Home
        images: [
            'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Living room
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Kitchen
            'https://images.unsplash.com/photo-1540518614846-7eded47fa296?ixlib=rb-4.0.3&auto=format&fit=crop&w=2057&q=80', // Master Bedroom
            'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80', // Bathroom
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Kids Bedroom
            'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Dining Room
            'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Home Office
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80'  // Exterior
        ],
        descriptions: ['Spacious Living Room', 'Modern Kitchen', 'Master Bedroom', 'Luxury Bathroom', 'Kids Bedroom', 'Dining Room', 'Home Office', 'Beautiful Exterior']
    },
    2: { // Luxury Penthouse
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80', // Penthouse living
            'https://images.unsplash.com/photo-1574614709384-8f8e0151c95b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Modern kitchen
            'https://images.unsplash.com/photo-1631679706909-faf1c2834e85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80', // Master bedroom
            'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80', // Spa bathroom
            'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Wine Cellar
            'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Formal Dining
            'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80', // Private Balcony
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'  // City view
        ],
        descriptions: ['Luxury Living Area', 'Gourmet Kitchen', 'Master Suite', 'Spa Bathroom', 'Wine Cellar', 'Formal Dining', 'Private Balcony', 'City Views']
    },
    3: { // Cozy Suburban House
        images: [
            'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=2026&q=80', // Cozy living
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Family kitchen
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Cozy bedroom
            'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Family bathroom
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'  // Garden view
        ],
        descriptions: ['Cozy Living Room', 'Family Kitchen', 'Comfortable Bedroom', 'Family Bathroom', 'Garden View']
    },
    4: { // Oceanfront Villa
        images: [
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2085&q=80', // Villa interior
            'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Ocean view kitchen
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2012&q=80', // Ocean bedroom
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Luxury bath
            'https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80', // Swimming Pool
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Beach Access
            'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Outdoor Kitchen
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80'  // Ocean terrace
        ],
        descriptions: ['Grand Living Area', 'Ocean View Kitchen', 'Master Bedroom', 'Luxury Bathroom', 'Swimming Pool', 'Beach Access', 'Outdoor Kitchen', 'Ocean Terrace']
    },
    5: { // Contemporary Loft
        images: [
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Loft space
            'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Industrial kitchen
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Loft bedroom
            'https://images.unsplash.com/photo-1584622781564-1d987212c930?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80', // Modern bathroom
            'https://images.unsplash.com/photo-1529408632839-a54952c491e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'  // Urban view
        ],
        descriptions: ['Open Loft Space', 'Industrial Kitchen', 'Loft Bedroom', 'Modern Bathroom', 'Urban Views']
    },
    6: { // Garden Apartment
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80', // Apartment living
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Bright kitchen
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Garden bedroom
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Fresh bathroom
            'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'  // Garden balcony
        ],
        descriptions: ['Bright Living Area', 'Garden Kitchen', 'Peaceful Bedroom', 'Fresh Bathroom', 'Garden Balcony']
    }
};

function open3DView(propertyId) {
    const property = getCurrentProperty(propertyId);
    const images3D = property3DImages[propertyId];
    
    if (!property || !images3D) {
        showNotification('3D view not available for this property', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'view-3d-modal';
    modal.innerHTML = `
        <div class="view-3d-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            
            <div class="view-3d-header">
                <h2>🏠 3D Virtual Tour</h2>
                <h3>${property.title}</h3>
                <p>Explore every corner of this amazing property</p>
            </div>
            
            <div class="view-3d-main">
                <div class="view-3d-viewer">
                    <img id="main3DImage" src="${images3D.images[0]}" alt="3D View">
                    <div class="view-3d-controls">
                        <button onclick="rotate3DView('left')" class="rotate-btn">⬅️ Rotate Left</button>
                        <button onclick="toggle3DFullscreen()" class="fullscreen-btn">🔍 Fullscreen</button>
                        <button onclick="rotate3DView('right')" class="rotate-btn">➡️ Rotate Right</button>
                    </div>
                    <div class="view-3d-info">
                        <span id="current3DInfo">${images3D.descriptions[0]}</span>
                        <span class="view-counter">1 / ${images3D.images.length}</span>
                    </div>
                </div>
                
                <div class="view-3d-thumbnails">
                    <h4>Room Views</h4>
                    <div class="thumbnails-grid">
                        ${images3D.images.map((img, index) => `
                            <div class="thumbnail-item ${index === 0 ? 'active' : ''}" 
                                 onclick="switch3DView(${index}, '${images3D.descriptions[index]}')">
                                <img src="${img}" alt="${images3D.descriptions[index]}">
                                <span>${images3D.descriptions[index]}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="view-3d-features">
                <div class="feature-3d">
                    <h4>🎮 Interactive Features</h4>
                    <ul>
                        <li>360° Room Views</li>
                        <li>High-Resolution Images</li>
                        <li>Zoom & Pan Controls</li>
                        <li>Virtual Room Tour</li>
                    </ul>
                </div>
                
                <div class="feature-3d">
                    <h4>📐 Property Measurements</h4>
                    <ul>
                        <li>Total Area: ${property.sqft || 'N/A'} sq ft</li>
                        <li>Bedrooms: ${property.beds || 'N/A'}</li>
                        <li>Bathrooms: ${property.baths || 'N/A'}</li>
                        <li>Property Type: ${property.type || 'N/A'}</li>
                    </ul>
                </div>
                
                <div class="feature-3d">
                    <h4>🗓️ Schedule Visit</h4>
                    <button onclick="scheduleVirtualTour(${propertyId})" class="schedule-tour-btn">
                        📅 Book Virtual Tour
                    </button>
                    <button onclick="requestFloorPlan(${propertyId})" class="floor-plan-btn">
                        📋 Get Floor Plan
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add 3D modal styles
    add3DModalStyles();
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Initialize 3D viewer
    initialize3DViewer(images3D);
    
    // Track 3D view
    track3DView(propertyId);
}

function getCurrentProperty(propertyId) {
    // First check if it's from the featured properties (1-6)
    const featuredProperties = [
        { id: 1, title: "Modern Family Home", beds: 4, baths: 3, sqft: 2500, type: "house" },
        { id: 2, title: "Luxury Penthouse", beds: 3, baths: 2, sqft: 1800, type: "apartment" },
        { id: 3, title: "Cozy Suburban House", beds: 3, baths: 2, sqft: 1600, type: "house" },
        { id: 4, title: "Oceanfront Villa", beds: 5, baths: 4, sqft: 3200, type: "villa" },
        { id: 5, title: "Contemporary Loft", beds: 2, baths: 2, sqft: 1400, type: "loft" },
        { id: 6, title: "Garden Apartment", beds: 2, baths: 1, sqft: 1200, type: "apartment" }
    ];
    
    const featured = featuredProperties.find(p => p.id === propertyId);
    if (featured) return featured;
    
    // Otherwise check the database properties
    if (!currentProperties || !Array.isArray(currentProperties)) {
        return null;
    }
    return currentProperties.find(p => p && p.id === propertyId);
}

function add3DModalStyles() {
    if (document.getElementById('view-3d-modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'view-3d-modal-styles';
    style.textContent = `
        .view-3d-modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0,0,0,0.9), rgba(44,62,80,0.95));
            align-items: center;
            justify-content: center;
            overflow-y: auto;
        }
        
                 .view-3d-content {
             background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
             border-radius: 20px;
             max-width: 1200px;
             width: 95%;
             max-height: 95vh;
             overflow-y: auto;
             position: relative;
             color: white;
             animation: modal3DSlideIn 0.5s ease-out;
             border: 2px solid rgba(255,255,255,0.1);
         }
        
        @keyframes modal3DSlideIn {
            from { transform: scale(0.8) rotateY(-10deg); opacity: 0; }
            to { transform: scale(1) rotateY(0deg); opacity: 1; }
        }
        
        .view-3d-header {
            text-align: center;
            padding: 2rem;
            background: rgba(0,0,0,0.3);
            border-radius: 20px 20px 0 0;
        }
        
        .view-3d-header h2 {
            font-size: 2.5rem;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .view-3d-main {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
            padding: 2rem;
        }
        
        .view-3d-viewer {
            position: relative;
            background: rgba(0,0,0,0.2);
            border-radius: 15px;
            overflow: hidden;
        }
        
        #main3DImage {
            width: 100%;
            height: 400px;
            object-fit: cover;
            transition: transform 0.5s ease;
            cursor: grab;
        }
        
        #main3DImage:active {
            cursor: grabbing;
        }
        
        .view-3d-controls {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 1rem;
        }
        
        .rotate-btn, .fullscreen-btn {
            background: rgba(255,255,255,0.9);
            color: #333;
            border: none;
            padding: 0.8rem 1rem;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }
        
        .rotate-btn:hover, .fullscreen-btn:hover {
            background: white;
            transform: scale(1.05);
        }
        
        .view-3d-info {
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(0,0,0,0.7);
            padding: 1rem;
            border-radius: 10px;
        }
        
        .view-counter {
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 1rem;
            border-radius: 20px;
        }
        
        .view-3d-thumbnails h4 {
            margin-bottom: 1rem;
            color: white;
        }
        
        .thumbnails-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .thumbnail-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.8rem;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            border: 2px solid transparent;
        }
        
        .thumbnail-item.active {
            background: rgba(255,255,255,0.3);
            border-color: white;
            transform: scale(1.02);
        }
        
        .thumbnail-item:hover {
            background: rgba(255,255,255,0.2);
        }
        
        .thumbnail-item img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
        }
        
        .view-3d-features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            padding: 2rem;
            background: rgba(0,0,0,0.2);
            border-radius: 0 0 20px 20px;
        }
        
        .feature-3d {
            background: rgba(255,255,255,0.1);
            padding: 1.5rem;
            border-radius: 15px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .feature-3d h4 {
            margin: 0 0 1rem 0;
            color: #fff;
        }
        
        .feature-3d ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .feature-3d li {
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .schedule-tour-btn, .floor-plan-btn {
            width: 100%;
            padding: 1rem;
            border: none;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
            margin: 0.5rem 0;
            transition: all 0.3s;
        }
        
        .schedule-tour-btn {
            background: #e74c3c;
            color: white;
        }
        
        .floor-plan-btn {
            background: #f39c12;
            color: white;
        }
        
        .schedule-tour-btn:hover {
            background: #c0392b;
            transform: translateY(-2px);
        }
        
        .floor-plan-btn:hover {
            background: #e67e22;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .view-3d-main {
                grid-template-columns: 1fr;
            }
            
            .view-3d-controls {
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .rotate-btn, .fullscreen-btn {
                padding: 0.6rem;
                font-size: 0.9rem;
            }
        }
    `;
    
    document.head.appendChild(style);
}

let current3DIndex = 0;
let current3DImages = [];

function initialize3DViewer(images3D) {
    current3DIndex = 0;
    current3DImages = images3D;
    
    // Add mouse drag functionality
    const mainImage = document.getElementById('main3DImage');
    let isDragging = false;
    let startX = 0;
    
    mainImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        mainImage.style.cursor = 'grabbing';
    });
    
    mainImage.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const rotateY = deltaX * 0.5;
        mainImage.style.transform = `rotateY(${rotateY}deg)`;
    });
    
    mainImage.addEventListener('mouseup', () => {
        isDragging = false;
        mainImage.style.cursor = 'grab';
        mainImage.style.transform = 'rotateY(0deg)';
    });
    
    mainImage.addEventListener('mouseleave', () => {
        isDragging = false;
        mainImage.style.cursor = 'grab';
        mainImage.style.transform = 'rotateY(0deg)';
    });
}

function switch3DView(index, description) {
    current3DIndex = index;
    
    const mainImage = document.getElementById('main3DImage');
    const infoElement = document.getElementById('current3DInfo');
    const counter = document.querySelector('.view-counter');
    
    // Add fade transition
    mainImage.style.opacity = '0.5';
    
    setTimeout(() => {
        mainImage.src = current3DImages.images[index];
        infoElement.textContent = description;
        counter.textContent = `${index + 1} / ${current3DImages.images.length}`;
        mainImage.style.opacity = '1';
    }, 200);
    
    // Update thumbnail active state
    document.querySelectorAll('.thumbnail-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function rotate3DView(direction) {
    const newIndex = direction === 'left' 
        ? (current3DIndex - 1 + current3DImages.images.length) % current3DImages.images.length
        : (current3DIndex + 1) % current3DImages.images.length;
    
    switch3DView(newIndex, current3DImages.descriptions[newIndex]);
}

function toggle3DFullscreen() {
    const mainImage = document.getElementById('main3DImage');
    
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        mainImage.requestFullscreen().catch(err => {
            showNotification('Fullscreen not supported on this device', 'info');
        });
    }
}

function scheduleVirtualTour(propertyId) {
    const property = getCurrentProperty(propertyId);
    
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="service-modal-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            
            <div class="consultation-header">
                <h2>📅 Schedule Virtual Tour</h2>
                <p>Book a live virtual tour for ${property.title}</p>
            </div>
            
            <form class="consultation-form" onsubmit="submitVirtualTourRequest(event, ${propertyId})">
                <div class="form-row">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" name="phone" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Preferred Date & Time *</label>
                        <input type="datetime-local" name="datetime" required>
                    </div>
                    <div class="form-group">
                        <label>Tour Type *</label>
                        <select name="tourType" required>
                            <option value="">Select Tour Type</option>
                            <option value="live-video">Live Video Tour</option>
                            <option value="vr-headset">VR Headset Tour</option>
                            <option value="360-walkthrough">360° Walkthrough</option>
                            <option value="guided-call">Guided Phone Call</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Special Requests</label>
                    <textarea name="requests" rows="3" placeholder="Any specific areas you'd like to focus on..."></textarea>
                </div>
                
                <button type="submit" class="submit-consultation-btn">
                    🎥 Schedule Virtual Tour
                </button>
            </form>
        </div>
    `;
    
    // Close existing 3D modal
    const existing3D = document.querySelector('.view-3d-modal');
    if (existing3D) existing3D.remove();
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function requestFloorPlan(propertyId) {
    const property = getCurrentProperty(propertyId);
    
    showNotification(`Floor plan for ${property.title} will be emailed to you within 24 hours!`, 'success');
    
    // Simulate floor plan request
    const floorPlanData = {
        propertyId,
        propertyTitle: property.title,
        requestTime: new Date().toISOString(),
        status: 'pending'
    };
    
    const floorPlanRequests = JSON.parse(localStorage.getItem('floorPlanRequests')) || [];
    floorPlanRequests.push(floorPlanData);
    localStorage.setItem('floorPlanRequests', JSON.stringify(floorPlanRequests));
}

function submitVirtualTourRequest(event, propertyId) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const tourData = {
        propertyId,
        propertyTitle: getCurrentProperty(propertyId).title,
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        datetime: formData.get('datetime'),
        tourType: formData.get('tourType'),
        requests: formData.get('requests'),
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    const virtualTours = JSON.parse(localStorage.getItem('virtualTourRequests')) || [];
    virtualTours.push(tourData);
    localStorage.setItem('virtualTourRequests', JSON.stringify(virtualTours));
    
    showNotification('Virtual tour scheduled successfully! You will receive a confirmation email shortly.', 'success');
    event.target.closest('.service-modal').remove();
}

function track3DView(propertyId) {
    const views3D = JSON.parse(localStorage.getItem('3DViews')) || {};
    views3D[propertyId] = (views3D[propertyId] || 0) + 1;
    views3D[`${propertyId}_lastViewed`] = new Date().toISOString();
    localStorage.setItem('3DViews', JSON.stringify(views3D));
    
    showNotification('🏠 3D View activated! Use controls to explore the property.', 'success');
}

// ==================== ADDITIONAL FEATURES ====================

// Price range updater for Indian market
function updatePriceRanges() {
    const priceSelect = document.getElementById('price-range');
    priceSelect.innerHTML = `
        <option value="">Any Price</option>
        <option value="0-5000000">Under ₹50 Lakh</option>
        <option value="5000000-10000000">₹50L - ₹1 Crore</option>
        <option value="10000000-25000000">₹1 Cr - ₹2.5 Cr</option>
        <option value="25000000-50000000">₹2.5 Cr - ₹5 Cr</option>
        <option value="50000000-100000000">₹5 Cr - ₹10 Cr</option>
        <option value="100000000+">₹10 Cr+</option>
    `;
}

// Add comparison feature
function addToComparison(propertyId) {
    let comparison = JSON.parse(localStorage.getItem('propertyComparison')) || [];
    
    if (comparison.length >= 3) {
        showNotification('You can compare maximum 3 properties', 'error');
        return;
    }
    
    if (!comparison.includes(propertyId)) {
        comparison.push(propertyId);
        localStorage.setItem('propertyComparison', JSON.stringify(comparison));
        showNotification('Property added to comparison', 'success');
    }
}

// ==================== DATABASE INTEGRATION FUNCTIONS ====================
function viewPropertyDetails(propertyId) {
    // Get property from database
    const properties = db.getAllProperties();
    const property = properties.find(p => p.id === propertyId);
    
    if (!property) {
        showNotification('Property not found', 'error');
        return;
    }
    
    // Create and show property details modal
    showPropertyDetailsModal(property);
}

function open3DView(propertyId) {
    // Get property from database
    const properties = db.getAllProperties();
    const property = properties.find(p => p.id === propertyId);
    
    if (!property) {
        showNotification('Property not found', 'error');
        return;
    }
    
    // Show 3D view (can be enhanced with actual 3D functionality)
    show3DModal(property);
}

function contactForProperty(propertyId) {
    // Get property from database
    const properties = db.getAllProperties();
    const property = properties.find(p => p.id === propertyId);
    
    if (!property) {
        showNotification('Property not found', 'error');
        return;
    }
    
    // Show contact modal with agent information
    showContactModal(property);
}

function showPropertyDetailsModal(property) {
    const modal = document.createElement('div');
    modal.className = 'property-details-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 15px; max-width: 800px; width: 90%; max-height: 90%; overflow-y: auto; position: relative;">
            <button onclick="this.closest('.property-details-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: #e74c3c; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem; z-index: 10001;">×</button>
            
            <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px 15px 0 0;">
            
            <div style="padding: 2rem;">
                <h2 style="color: #2c3e50; margin-bottom: 1rem;">${property.title}</h2>
                <p style="color: #e74c3c; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">${formatPropertyPrice(property.price)}</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 1rem 0; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
                    <div><strong>Type:</strong> ${property.type}</div>
                    <div><strong>Location:</strong> ${property.location}</div>
                    <div><strong>Bedrooms:</strong> ${property.beds}</div>
                    <div><strong>Bathrooms:</strong> ${property.baths}</div>
                    <div><strong>Square Feet:</strong> ${property.sqft}</div>
                </div>
                
                <div style="margin: 1rem 0;">
                    <h3 style="color: #2c3e50;">Description</h3>
                    <p style="line-height: 1.6;">${property.description}</p>
                </div>
                
                ${property.features && property.features.length > 0 ? `
                    <div style="margin: 1rem 0;">
                        <h3 style="color: #2c3e50;">Features</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${property.features.map(feature => `<span style="background: #3498db; color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.875rem;">${feature}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div style="margin: 1rem 0; padding: 1rem; background: #e8f4f8; border-radius: 10px;">
                    <h3 style="color: #2c3e50; margin-bottom: 0.5rem;">Contact Agent</h3>
                    <p><strong>Agent:</strong> ${property.agent}</p>
                    <p><strong>Phone:</strong> ${property.agentPhone}</p>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                    <button onclick="open3DView('${property.id}')" style="flex: 1; background: #f39c12; color: white; border: none; padding: 0.75rem; border-radius: 8px; cursor: pointer;">🏠 3D Tour</button>
                    <button onclick="contactForProperty('${property.id}')" style="flex: 1; background: #27ae60; color: white; border: none; padding: 0.75rem; border-radius: 8px; cursor: pointer;">📞 Contact Agent</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function show3DModal(property) {
    showNotification('🏠 3D Tour feature will be available soon! Contact the agent for a virtual tour.', 'info');
}

function showContactModal(property) {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 15px; max-width: 500px; width: 90%; padding: 2rem; position: relative;">
            <button onclick="this.closest('.contact-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: #e74c3c; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem;">×</button>
            
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">Contact Agent</h2>
            <p style="margin-bottom: 1rem;">Get in touch with the agent for <strong>${property.title}</strong></p>
            
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                <p><strong>Agent:</strong> ${property.agent}</p>
                <p><strong>Phone:</strong> <a href="tel:${property.agentPhone}" style="color: #3498db;">${property.agentPhone}</a></p>
                <p><strong>Email:</strong> <a href="mailto:agent@eliterealty.com" style="color: #3498db;">agent@eliterealty.com</a></p>
            </div>
            
            <form onsubmit="submitContactForm(event, '${property.id}')">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Your Name</label>
                    <input type="text" required style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Your Phone</label>
                    <input type="tel" required style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Message</label>
                    <textarea rows="4" required style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;" placeholder="I'm interested in this property..."></textarea>
                </div>
                <button type="submit" style="width: 100%; background: #27ae60; color: white; border: none; padding: 0.75rem; border-radius: 8px; cursor: pointer; font-weight: bold;">Send Message</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function submitContactForm(event, propertyId) {
    event.preventDefault();
    
    // In a real application, this would send the form data to a server
    showNotification('Your message has been sent to the agent! They will contact you soon.', 'success');
    
    // Close the modal
    event.target.closest('.contact-modal').remove();
}

function formatPropertyPrice(price) {
    if (price >= 1000000) {
        return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
        return `$${(price / 1000).toFixed(0)}K`;
    } else {
        return `$${price.toLocaleString()}`;
    }
}

// ==================== INITIALIZATION ====================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if user is authenticated (already checked in index.html)
    if (typeof checkAuthStatus !== 'undefined') {
        const authStatus = checkAuthStatus();
        if (authStatus.isAuthenticated) {
            initializeApp();
            updatePriceRanges();
            
            // Auto-save preferences on form changes
            const searchForm = document.querySelector('.search-form');
            if (searchForm) {
                searchForm.addEventListener('change', saveUserPreferences);
            }
            
            console.log('🎉 Elite Realty JavaScript fully loaded with Indian cities database!');
        }
    }
}); 