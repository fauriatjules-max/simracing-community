// Gestion des notifications
class NotificationSystem {
    constructor() {
        this.notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        this.init();
    }

    init() {
        this.updateNotificationBadges();
        this.setupRealTimeListeners();
    }

    // Ajouter une nouvelle notification
    addNotification(type, data) {
        const notification = {
            id: Date.now(),
            type: type,
            data: data,
            read: false,
            timestamp: new Date().toISOString()
        };

        this.notifications.unshift(notification);
        this.saveNotifications();
        this.updateNotificationBadges();
        this.showToast(notification);
        
        // Animation de pulsation
        this.pulseNotificationIcon();
    }

    // Sauvegarder les notifications
    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }

    // Marquer comme lu
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.updateNotificationBadges();
        }
    }

    // Marquer toutes comme lues
    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.saveNotifications();
        this.updateNotificationBadges();
    }

    // Obtenir les notifications non lues
    getUnreadCount() {
        return this.notifications.filter(n => !n.read).length;
    }

    // Mettre à jour les badges de notification
    updateNotificationBadges() {
        const unreadCount = this.getUnreadCount();
        
        // Badge sur l'icône de chat
        const chatNavItem = document.querySelector('.nav-item:nth-child(2)');
        this.updateBadgeOnElement(chatNavItem, unreadCount);
        
        // Badge sur l'icône de profil
        const profileNavItem = document.querySelector('.nav-item:nth-child(3)');
        const profileIcon = document.querySelector('.profile-icon');
        
        this.updateBadgeOnElement(profileNavItem, unreadCount);
        if (profileIcon) {
            this.updateBadgeOnElement(profileIcon, unreadCount);
        }
    }

    // Mettre à jour le badge sur un élément
    updateBadgeOnElement(element, count) {
        if (!element) return;

        // Supprimer l'ancien badge
        const existingBadge = element.querySelector('.notification-badge');
        if (existingBadge) {
            existingBadge.remove();
        }

        // Ajouter le nouveau badge si nécessaire
        if (count > 0) {
            const badge = document.createElement('div');
            badge.className = 'notification-badge';
            badge.textContent = count > 9 ? '9+' : count;
            badge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background: #FF0000;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                font-size: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            
            element.style.position = 'relative';
            element.appendChild(badge);
        }
    }

    // Afficher un toast de notification
    showToast(notification) {
        const message = this.formatNotificationMessage(notification);
        
        // Créer le toast
        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF0000, #CC0000);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
            z-index: 10000;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
            cursor: pointer;
            border-left: 4px solid #FF4444;
        `;
        
        toast.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 5px;">Nouvelle notification</div>
            <div style="font-size: 14px;">${message}</div>
            <div style="font-size: 12px; opacity: 0.8; margin-top: 5px;">${this.formatTime(notification.timestamp)}</div>
        `;
        
        toast.onclick = () => {
            this.markAsRead(notification.id);
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        };
        
        document.body.appendChild(toast);
        
        // Supprimer automatiquement après 5 secondes
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }

    // Formater le message de notification
    formatNotificationMessage(notification) {
        switch (notification.type) {
            case 'new_comment':
                return `${notification.data.username} a commenté votre publication`;
            case 'new_like':
                return `${notification.data.username} a aimé votre publication`;
            case 'new_message':
                return `Nouveau message de ${notification.data.username}`;
            case 'new_follower':
                return `${notification.data.username} suit maintenant votre activité`;
            case 'race_reminder':
                return `Course prévue dans ${notification.data.minutes} minutes`;
            default:
                return 'Nouvelle notification';
        }
    }

    // Formater l'heure
    formatTime(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = now - time;
        
        if (diff < 60000) return 'À l\'instant';
        if (diff < 3600000) return `Il y a ${Math.floor(diff / 60000)} min`;
        if (diff < 86400000) return `Il y a ${Math.floor(diff / 3600000)} h`;
        return `Le ${time.toLocaleDateString()}`;
    }

    // Animation de pulsation
    pulseNotificationIcon() {
        const badges = document.querySelectorAll('.notification-badge');
        badges.forEach(badge => {
            badge.style.animation = 'pulse 0.5s ease-in-out 2';
            setTimeout(() => {
                badge.style.animation = '';
            }, 1000);
        });
    }

    // Écouteurs en temps réel (simulés)
    setupRealTimeListeners() {
        // Simuler des notifications périodiques pour la démo
        if (this.notifications.length === 0) {
            // Ajouter quelques notifications exemple au premier chargement
            setTimeout(() => {
                this.addNotification('new_follower', { username: 'Pierre' });
            }, 10000);
            
            setTimeout(() => {
                this.addNotification('new_like', { username: 'Marie' });
            }, 20000);
        }
    }

    // Obtenir toutes les notifications
    getAllNotifications() {
        return this.notifications;
    }

    // Supprimer une notification
    deleteNotification(notificationId) {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        this.saveNotifications();
        this.updateNotificationBadges();
    }

    // Vider toutes les notifications
    clearAllNotifications() {
        this.notifications = [];
        this.saveNotifications();
        this.updateNotificationBadges();
    }
}

// Initialisation globale
let notificationSystem;

document.addEventListener('DOMContentLoaded', function() {
    notificationSystem = new NotificationSystem();
    
    // Ajouter les styles d'animation s'ils n'existent pas déjà
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(styles);
    }
});

// Fonctions globales pour les notifications
function simulateNotification(type, data) {
    if (notificationSystem) {
        notificationSystem.addNotification(type, data);
    }
}

function getUnreadNotificationsCount() {
    return notificationSystem ? notificationSystem.getUnreadCount() : 0;
}

function markAllNotificationsAsRead() {
    if (notificationSystem) {
        notificationSystem.markAllAsRead();
        showNotification('Toutes les notifications marquées comme lues');
    }
}

// Exemple d'utilisation :
// simulateNotification('new_message', { username: 'Jean' });
// simulateNotification('new_like', { username: 'Sophie' });
