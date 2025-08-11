// Simplified Elite Realty Authentication System
// Works directly in browser without any server requirements

console.log('🔐 Simple Auth System Loading...');

// ==================== SIMPLE DATABASE ====================
class SimpleDatabase {
    constructor() {
        this.init();
    }

    init() {
        console.log('📚 Initializing Simple Database...');
        
        // Create fresh users
        const users = {
            'user@example.com': {
                email: 'user@example.com',
                password: 'user123',
                name: 'John Doe',
                role: 'user'
            }
        };
        
        // Create fresh admin
        const admins = {
            'admin': {
                username: 'admin',
                password: '123',
                name: 'Administrator',
                role: 'admin'
            }
        };
        
        // Create fresh properties
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
                image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3",
                description: "Beautiful luxury villa in prestigious location",
                agent: "Rajesh Kumar",
                agentPhone: "+91-98765-43210"
            },
            {
                id: 'prop_002',
                title: "Modern Apartment in Gurgaon",
                location: "Cyber City, Gurgaon",
                price: 8500000,
                type: "apartment",
                beds: 3,
                baths: 3,
                sqft: 1800,
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3",
                description: "Contemporary apartment in IT hub",
                agent: "Priya Sharma",
                agentPhone: "+91-99876-54321"
            }
        ];
        
        // Store in localStorage
        localStorage.setItem('simple_users', JSON.stringify(users));
        localStorage.setItem('simple_admins', JSON.stringify(admins));
        localStorage.setItem('simple_properties', JSON.stringify(properties));
        
        console.log('✅ Simple Database Initialized');
    }

    getUser(email) {
        const users = JSON.parse(localStorage.getItem('simple_users') || '{}');
        return users[email] || null;
    }

    getAdmin(username) {
        const admins = JSON.parse(localStorage.getItem('simple_admins') || '{}');
        return admins[username] || null;
    }

    getAllProperties() {
        return JSON.parse(localStorage.getItem('simple_properties') || '[]');
    }

    addProperty(propertyData) {
        const properties = this.getAllProperties();
        const newProperty = {
            id: 'prop_' + Date.now(),
            ...propertyData,
            dateAdded: new Date().toISOString()
        };
        properties.push(newProperty);
        localStorage.setItem('simple_properties', JSON.stringify(properties));
        return newProperty;
    }

    setCurrentUser(user) {
        localStorage.setItem('simple_current_user', JSON.stringify(user));
        localStorage.setItem('simple_session', JSON.stringify({
            userId: user.id || user.username,
            role: user.role,
            loginTime: new Date().toISOString()
        }));
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('simple_current_user') || 'null');
    }

    clearSession() {
        localStorage.removeItem('simple_current_user');
        localStorage.removeItem('simple_session');
    }
}

// Initialize database
const simpleDB = new SimpleDatabase();

// ==================== AUTHENTICATION FUNCTIONS ====================

function showMessage(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Remove existing messages
    const existing = document.querySelector('.auth-message');
    if (existing) existing.remove();
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'auth-message';
    messageDiv.textContent = message;
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 3000);
}

// Simple User Login
function simpleUserLogin(event) {
    if (event) event.preventDefault();
    
    console.log('👤 Simple User Login Attempt');
    
    const email = document.getElementById('user-email')?.value || 'user@example.com';
    const password = document.getElementById('user-password')?.value || 'user123';
    
    console.log(`Attempting login with: ${email} / ${password}`);
    
    const user = simpleDB.getUser(email);
    
    if (!user) {
        showMessage('User not found!', 'error');
        return false;
    }
    
    if (user.password !== password) {
        showMessage('Wrong password!', 'error');
        return false;
    }
    
    // Login successful
    simpleDB.setCurrentUser(user);
    showMessage(`Welcome ${user.name}!`, 'success');
    
    console.log('✅ User login successful');
    
    // Redirect after delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
    
    return false;
}

// Simple Admin Login
function simpleAdminLogin(event) {
    if (event) event.preventDefault();
    
    console.log('🔐 Simple Admin Login Attempt');
    
    const username = document.getElementById('admin-username')?.value || 'admin';
    const password = document.getElementById('admin-password')?.value || '123';
    
    console.log(`Attempting admin login with: ${username} / ${password}`);
    
    const admin = simpleDB.getAdmin(username);
    
    if (!admin) {
        showMessage('Admin not found!', 'error');
        return false;
    }
    
    if (admin.password !== password) {
        showMessage('Wrong admin password!', 'error');
        return false;
    }
    
    // Login successful
    simpleDB.setCurrentUser(admin);
    showMessage(`Welcome Administrator!`, 'success');
    
    console.log('✅ Admin login successful');
    
    // Redirect after delay
    setTimeout(() => {
        window.location.href = 'admin.html';
    }, 1500);
    
    return false;
}

// Check if user is authenticated
function checkAuth() {
    const user = simpleDB.getCurrentUser();
    return {
        isAuthenticated: user !== null,
        user: user
    };
}

// Logout function
function simpleLogout() {
    simpleDB.clearSession();
    showMessage('Logged out successfully', 'info');
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}

// Export functions globally
window.simpleUserLogin = simpleUserLogin;
window.simpleAdminLogin = simpleAdminLogin;
window.checkAuth = checkAuth;
window.simpleLogout = simpleLogout;
window.simpleDB = simpleDB;
window.showMessage = showMessage;

// Auto-check authentication on protected pages
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html')) {
        const auth = checkAuth();
        if (!auth.isAuthenticated) {
            showMessage('Please login first!', 'error');
            setTimeout(() => {
                window.location.href = 'simple-user-login.html';
            }, 2000);
            return;
        }
        console.log('✅ User authenticated for main site');
    }
    
    if (currentPage.includes('admin.html')) {
        const auth = checkAuth();
        if (!auth.isAuthenticated || auth.user.role !== 'admin') {
            showMessage('Admin access required!', 'error');
            setTimeout(() => {
                window.location.href = 'simple-admin-login.html';
            }, 2000);
            return;
        }
        console.log('✅ Admin authenticated for admin panel');
    }
});

console.log('✅ Simple Auth System Ready');

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style); 