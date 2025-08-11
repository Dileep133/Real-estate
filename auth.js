// Elite Realty Authentication System
// Simple and reliable authentication with localStorage

console.log('🔐 Authentication system loading...');

// ==================== DATABASE CLASS ====================
class SimpleDatabase {
    constructor() {
        this.initializeDatabase();
    }

    initializeDatabase() {
        console.log('📚 Initializing database...');
        
        // Create users database
        const users = {
            'user@example.com': {
                id: 'user_001',
                email: 'user@example.com',
                password: 'user123',
                name: 'John Doe',
                phone: '+91-9876543210',
                role: 'user'
            }
        };
        localStorage.setItem('elite_users', JSON.stringify(users));
        console.log('✅ Users database created');

        // Create admin database
        const admins = {
            'admin': {
                id: 'admin_001',
                username: 'admin',
                password: '123',
                name: 'Administrator',
                role: 'admin'
            }
        };
        localStorage.setItem('elite_admins', JSON.stringify(admins));
        console.log('✅ Admin database created with credentials: admin/123');

        // Create properties database with Indian locations
        const properties = [
            {
                id: 'prop_001',
                title: "Luxury Villa in Banjara Hills",
                location: "Banjara Hills, Hyderabad",
                price: 12500000,
                type: "villa",
                beds: 4,
                baths: 4,
                sqft: 3500,
                image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
                description: "Stunning luxury villa in the prestigious Banjara Hills area with modern amenities",
                features: ["Swimming Pool", "Garden", "Security", "Parking", "Gym"],
                agent: "Rajesh Kumar",
                agentPhone: "+91-98765-43210"
            },
            {
                id: 'prop_002',
                title: "Modern Apartment in Gurgaon",
                location: "Cyber City, Gurgaon, Delhi NCR",
                price: 8500000,
                type: "apartment",
                beds: 3,
                baths: 3,
                sqft: 1800,
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                description: "Contemporary 3BHK apartment in the heart of Cyber City",
                features: ["Balcony", "Lift", "Power Backup", "Security", "Club House"],
                agent: "Priya Sharma",
                agentPhone: "+91-99876-54321"
            },
            {
                id: 'prop_003',
                title: "Sea View Penthouse",
                location: "Marine Drive, Mumbai",
                price: 25000000,
                type: "penthouse",
                beds: 4,
                baths: 4,
                sqft: 2800,
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                description: "Exclusive penthouse with breathtaking sea views on Marine Drive",
                features: ["Sea View", "Terrace Garden", "Premium Finishes", "Concierge", "Valet Parking"],
                agent: "Amit Patel",
                agentPhone: "+91-98765-12345"
            },
            {
                id: 'prop_004',
                title: "Tech Park Villa",
                location: "Whitefield, Bangalore",
                price: 15000000,
                type: "villa",
                beds: 5,
                baths: 5,
                sqft: 4200,
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
                description: "Spacious villa near IT parks in Whitefield with modern architecture",
                features: ["Home Theater", "Study Room", "Garden", "Solar Panels", "Smart Home"],
                agent: "Sneha Reddy",
                agentPhone: "+91-99887-66554"
            },
            {
                id: 'prop_005',
                title: "Heritage Haveli",
                location: "Civil Lines, Delhi",
                price: 35000000,
                type: "house",
                beds: 6,
                baths: 6,
                sqft: 5500,
                image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=2132&q=80",
                description: "Restored heritage haveli in prime Civil Lines location",
                features: ["Heritage Architecture", "Courtyard", "Servant Quarters", "Parking", "Garden"],
                agent: "Vikram Singh",
                agentPhone: "+91-98765-99887"
            },
            {
                id: 'prop_006',
                title: "Lakeside Apartment",
                location: "HSR Layout, Bangalore",
                price: 9800000,
                type: "apartment",
                beds: 3,
                baths: 2,
                sqft: 1650,
                image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
                description: "Beautiful apartment with lake view in the popular HSR Layout",
                features: ["Lake View", "Club House", "Swimming Pool", "Gym", "Children's Play Area"],
                agent: "Meera Iyer",
                agentPhone: "+91-99665-44332"
            }
        ];
        localStorage.setItem('elite_properties', JSON.stringify(properties));
        console.log('✅ Properties database created with 6 properties');
    }

    // User methods
    getUserByEmail(email) {
        const users = JSON.parse(localStorage.getItem('elite_users') || '{}');
        return users[email] || null;
    }

    createUser(userData) {
        const users = JSON.parse(localStorage.getItem('elite_users') || '{}');
        users[userData.email] = {
            id: 'user_' + Date.now(),
            ...userData,
            role: 'user'
        };
        localStorage.setItem('elite_users', JSON.stringify(users));
        return users[userData.email];
    }

    // Admin methods
    getAdminByUsername(username) {
        const admins = JSON.parse(localStorage.getItem('elite_admins') || '{}');
        return admins[username] || null;
    }

    // Property methods
    getAllProperties() {
        return JSON.parse(localStorage.getItem('elite_properties') || '[]');
    }

    addProperty(propertyData) {
        const properties = this.getAllProperties();
        const newProperty = {
            id: 'prop_' + Date.now(),
            ...propertyData,
            dateAdded: new Date().toISOString()
        };
        properties.push(newProperty);
        localStorage.setItem('elite_properties', JSON.stringify(properties));
        return newProperty;
    }

    updateProperty(propertyId, propertyData) {
        const properties = this.getAllProperties();
        const index = properties.findIndex(p => p.id === propertyId);
        if (index !== -1) {
            properties[index] = { ...properties[index], ...propertyData };
            localStorage.setItem('elite_properties', JSON.stringify(properties));
            return true;
        }
        return false;
    }

    deleteProperty(propertyId) {
        try {
            if (!propertyId) {
                throw new Error('Property ID is required');
            }
            
            const properties = this.getAllProperties();
            const originalLength = properties.length;
            const filtered = properties.filter(p => p && p.id !== propertyId);
            
            if (filtered.length === originalLength) {
                throw new Error('Property not found or already deleted');
            }
            
            localStorage.setItem('elite_properties', JSON.stringify(filtered));
            console.log(`✅ Property ${propertyId} deleted successfully`);
            return true;
        } catch (error) {
            console.error('Database error deleting property:', error);
            throw error;
        }
    }
}

// Initialize database
const db = new SimpleDatabase();

// ==================== AUTHENTICATION FUNCTIONS ====================

function showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    // Remove existing notifications
    const existing = document.querySelector('.auth-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'auth-notification';
    notification.textContent = message;
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}

// User Login
function handleUserLogin(event) {
    event.preventDefault();
    console.log('🔐 Attempting user login...');
    
    const email = document.getElementById('user-email').value.trim();
    const password = document.getElementById('user-password').value.trim();
    
    console.log(`👤 Login attempt for: ${email}`);
    
    if (!email || !password) {
        showNotification('Please enter both email and password', 'error');
        return;
    }
    
    const user = db.getUserByEmail(email);
    console.log('👤 User found:', user ? 'Yes' : 'No');
    
    if (!user) {
        showNotification('User not found. Please check your email.', 'error');
        return;
    }
    
    if (user.password !== password) {
        console.log(`🔐 Password mismatch. Expected: "${user.password}", Got: "${password}"`);
        showNotification('Invalid password. Please try again.', 'error');
        return;
    }
    
    // Login successful
    console.log('✅ User login successful');
    localStorage.setItem('elite_current_user', JSON.stringify(user));
    localStorage.setItem('elite_session', JSON.stringify({
        userId: user.id,
        role: user.role,
        loginTime: new Date().toISOString()
    }));
    
    showNotification(`Welcome ${user.name}!`, 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Admin Login
function handleAdminLogin(event) {
    event.preventDefault();
    console.log('🔐 Attempting admin login...');
    
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();
    
    console.log(`👑 Admin login attempt for: ${username}`);
    
    if (!username || !password) {
        showNotification('Please enter both username and password', 'error');
        return;
    }
    
    const admin = db.getAdminByUsername(username);
    console.log('👑 Admin found:', admin ? 'Yes' : 'No');
    
    if (!admin) {
        showNotification('Admin not found. Please check your username.', 'error');
        return;
    }
    
    if (admin.password !== password) {
        console.log(`🔐 Password mismatch. Expected: "${admin.password}", Got: "${password}"`);
        showNotification('Invalid password. Please try again.', 'error');
        return;
    }
    
    // Admin login successful
    console.log('✅ Admin login successful');
    localStorage.setItem('elite_current_user', JSON.stringify(admin));
    localStorage.setItem('elite_session', JSON.stringify({
        userId: admin.id,
        role: admin.role,
        loginTime: new Date().toISOString()
    }));
    
    showNotification(`Welcome Administrator!`, 'success');
    
    setTimeout(() => {
        window.location.href = 'admin.html';
    }, 1500);
}

// User Registration
function handleUserRegistration(event) {
    event.preventDefault();
    console.log('📝 Attempting user registration...');
    
    const formData = {
        name: document.getElementById('register-name').value.trim(),
        email: document.getElementById('register-email').value.trim(),
        phone: document.getElementById('register-phone').value.trim(),
        password: document.getElementById('register-password').value.trim(),
        confirmPassword: document.getElementById('register-confirm-password').value.trim()
    };
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (formData.password !== formData.confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (formData.password.length < 3) {
        showNotification('Password must be at least 3 characters long', 'error');
        return;
    }
    
    if (db.getUserByEmail(formData.email)) {
        showNotification('User with this email already exists', 'error');
        return;
    }
    
    // Create user
    const newUser = db.createUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
    });
    
    console.log('✅ User registration successful');
    showNotification('Account created successfully! Redirecting to login...', 'success');
    
    event.target.reset();
    
    setTimeout(() => {
        window.location.href = 'user-login.html';
    }, 2000);
}

// Check Authentication Status
function checkAuthStatus() {
    const session = JSON.parse(localStorage.getItem('elite_session') || 'null');
    const currentUser = JSON.parse(localStorage.getItem('elite_current_user') || 'null');
    
    const isAuthenticated = session && currentUser;
    
    console.log('🔍 Auth Status Check:', {
        isAuthenticated,
        userRole: currentUser?.role,
        userId: currentUser?.id
    });
    
    return {
        isAuthenticated,
        user: currentUser,
        session
    };
}

// Logout
function logout() {
    console.log('👋 Logging out...');
    localStorage.removeItem('elite_current_user');
    localStorage.removeItem('elite_session');
    showNotification('Logged out successfully', 'info');
    
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1500);
}

// ==================== GLOBAL EXPORTS ====================
window.handleUserLogin = handleUserLogin;
window.handleAdminLogin = handleAdminLogin;
window.handleUserRegistration = handleUserRegistration;
window.checkAuthStatus = checkAuthStatus;
window.logout = logout;
window.showNotification = showNotification;
window.db = db;

console.log('✅ Authentication system loaded successfully');

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 