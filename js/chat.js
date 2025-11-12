// Données de chat simulées
const chatData = {
    conversations: [
        {
            id: 1,
            name: 'Pierre - iRacing',
            lastMessage: 'Salut, tu fais la course ce soir ?',
            unread: 2,
            avatar: 'P'
        },
        {
            id: 2,
            name: 'Marie - ACC League',
            lastMessage: 'Les réglages pour Monza sont prêts',
            unread: 0,
            avatar: 'M'
        },
        {
            id: 3,
            name: 'Thomas - rFactor 2',
            lastMessage: 'Merci pour les astuces !',
            unread: 1,
            avatar: 'T'
        }
    ]
};

// Chargement des conversations
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('chat.html')) {
        loadConversations();
    }
});

function loadConversations() {
    const conversationsList = document.getElementById('conversationsList');
    if (!conversationsList) return;
    
    conversationsList.innerHTML = '';
    
    chatData.conversations.forEach(conv => {
        const convCard = document.createElement('div');
        convCard.className = 'conversation-card';
        convCard.onclick = () => openConversation(conv.id);
        
        convCard.innerHTML = `
            <div class="conversation-avatar">${conv.avatar}</div>
            <div class="conversation-info">
                <div class="conversation-name">${conv.name}</div>
                <div class="last-message">${conv.lastMessage}</div>
            </div>
            ${conv.unread > 0 ? `<div class="notification-badge">${conv.unread}</div>` : ''}
        `;
        
        conversationsList.appendChild(convCard);
    });
}

function openConversation(conversationId) {
    showNotification('Ouverture de conversation à venir');
}

function startNewChat() {
    if (!checkAuth()) {
        showNotification('Connectez-vous pour chatter', 'error');
        return;
    }
    
    showNotification('Nouvelle conversation à venir');
}
