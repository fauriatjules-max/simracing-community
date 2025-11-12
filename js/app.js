// Navigation et fonctions générales
function redirectToHome() {
    window.location.href = 'home.html';
}

function redirectToChat() {
    window.location.href = 'chat.html';
}

function redirectToProfile() {
    window.location.href = 'profile.html';
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

function redirectToRegister() {
    window.location.href = 'register.html';
}

function goBack() {
    window.history.back();
}

// Gestion de l'état de connexion
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn;
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Animation d'entrée
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
    
    // Gestion du profil selon la connexion
    if (window.location.pathname.includes('profile.html')) {
        updateProfileDisplay();
    }
});

function updateProfileDisplay() {
    const isLoggedIn = checkAuth();
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileInfo = document.getElementById('profileInfo');
    
    if (isLoggedIn) {
        const user = getCurrentUser();
        if (profileInfo) {
            profileInfo.innerHTML = `
                <div class="profile-avatar">${user.username.charAt(0).toUpperCase()}</div>
                <h2>${user.username}</h2>
                <p>${user.email}</p>
            `;
        }
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if (profileInfo) {
            profileInfo.innerHTML = `
                <div class="profile-avatar">👤</div>
                <h2>Non connecté</h2>
                <p>Connectez-vous pour accéder à toutes les fonctionnalités</p>
            `;
        }
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    updateProfileDisplay();
    showNotification('Déconnexion réussie');
    setTimeout(() => redirectToHome(), 1000);
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#FF4444' : '#00AA00'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Ajouter l'animation fadeOut
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
`;
document.head.appendChild(style);
