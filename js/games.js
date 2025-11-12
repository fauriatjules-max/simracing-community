// Données des jeux et circuits
const gamesData = {
    'rFactor 2': {
        logo: '📀',
        circuits: [
            { name: 'Nürburgring GP', length: '5.148km', country: 'Allemagne' },
            { name: 'Spa-Francorchamps', length: '7.004km', country: 'Belgique' },
            { name: 'Silverstone', length: '5.891km', country: 'Royaume-Uni' }
        ]
    },
    'Le Mans Ultimate': {
        logo: '🏁',
        circuits: [
            { name: 'Circuit de la Sarthe', length: '13.626km', country: 'France' },
            { name: 'Sebring', length: '6.019km', country: 'USA' },
            { name: 'Fuji Speedway', length: '4.563km', country: 'Japon' }
        ]
    },
    'Assetto Corsa Competizione': {
        logo: '⚡',
        circuits: [
            { name: 'Monza', length: '5.793km', country: 'Italie' },
            { name: 'Barcelona-Catalunya', length: '4.655km', country: 'Espagne' },
            { name: 'Hungaroring', length: '4.381km', country: 'Hongrie' }
        ]
    },
    'iRacing': {
        logo: '🌐',
        circuits: [
            { name: 'Daytona', length: '4.000km', country: 'USA' },
            { name: 'Watkins Glen', length: '5.434km', country: 'USA' },
            { name: 'Road Atlanta', length: '4.088km', country: 'USA' }
        ]
    },
    'Automobilista 2': {
        logo: '🇧🇷',
        circuits: [
            { name: 'Interlagos', length: '4.309km', country: 'Brésil' },
            { name: 'Buenos Aires', length: '4.259km', country: 'Argentine' },
            { name: 'Cascavel', length: '3.183km', country: 'Brésil' }
        ]
    },
    'RaceRoom Racing Experience': {
        logo: '🏎️',
        circuits: [
            { name: 'Hockenheimring', length: '4.574km', country: 'Allemagne' },
            { name: 'Norisring', length: '2.300km', country: 'Allemagne' },
            { name: 'Lausitzring', length: '4.534km', country: 'Allemagne' }
        ]
    },
    'Project CARS 2': {
        logo: '🎮',
        circuits: [
            { name: 'Sakitto', length: '5.807km', country: 'Japon' },
            { name: 'Azure Coast', length: '6.450km', country: 'Monaco' },
            { name: 'California Highway', length: '18.100km', country: 'USA' }
        ]
    },
    'F1 2023': {
        logo: '🏆',
        circuits: [
            { name: 'Monaco', length: '3.337km', country: 'Monaco' },
            { name: 'Singapore', length: '5.063km', country: 'Singapour' },
            { name: 'Suzuka', length: '5.807km', country: 'Japon' }
        ]
    },
    'Gran Turismo 7': {
        logo: '🎯',
        circuits: [
            { name: 'Tokyo Expressway', length: '7.500km', country: 'Japon' },
            { name: 'Nürburgring Nordschleife', length: '20.832km', country: 'Allemagne' },
            { name: 'Laguna Seca', length: '3.602km', country: 'USA' }
        ]
    },
    'Forza Motorsport': {
        logo: '🚗',
        circuits: [
            { name: 'Maple Valley', length: '4.100km', country: 'USA' },
            { name: 'Bernese Alps', length: '6.200km', country: 'Suisse' },
            { name: 'Rio', length: '3.900km', country: 'Brésil' }
        ]
    }
};

// Chargement des jeux sur la page d'accueil
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('home.html')) {
        loadGamesList();
    }
    
    if (window.location.pathname.includes('game-details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const gameName = urlParams.get('game');
        if (gameName) {
            loadGameDetails(gameName);
        }
    }
});

function loadGamesList() {
    const gamesList = document.getElementById('gamesList');
    if (!gamesList) return;
    
    gamesList.innerHTML = '';
    
    Object.keys(gamesData).forEach(gameName => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.onclick = () => openGameDetails(gameName);
        
        gameCard.innerHTML = `
            <div class="game-logo">${gamesData[gameName].logo}</div>
            <div class="game-name">${gameName}</div>
        `;
        
        gamesList.appendChild(gameCard);
    });
}

function openGameDetails(gameName) {
    window.location.href = `game-details.html?game=${encodeURIComponent(gameName)}`;
}

function loadGameDetails(gameName) {
    const game = gamesData[gameName];
    if (!game) {
        showNotification('Jeu non trouvé', 'error');
        return;
    }
    
    // Mettre à jour l'en-tête
    const gameLogo = document.getElementById('gameLogo');
    const gameTitle = document.getElementById('gameTitle');
    
    if (gameLogo) gameLogo.textContent = game.logo;
    if (gameTitle) gameTitle.textContent = gameName;
    
    // Charger les circuits
    loadCircuits(game.circuits);
    
    // Charger les posts
    loadGamePosts(gameName);
}

function loadCircuits(circuits) {
    const circuitsList = document.getElementById('circuitsList');
    if (!circuitsList) return;
    
    circuitsList.innerHTML = '';
    
    circuits.forEach(circuit => {
        const circuitCard = document.createElement('div');
        circuitCard.className = 'circuit-card';
        
        circuitCard.innerHTML = `
            <div class="circuit-image">🛣️</div>
            <div class="circuit-info">
                <div class="circuit-name">${circuit.name}</div>
                <div class="circuit-details">${circuit.length} • ${circuit.country}</div>
            </div>
        `;
        
        circuitsList.appendChild(circuitCard);
    });
}

function switchTab(tabName) {
    // Mettre à jour les boutons d'onglets
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Activer l'onglet sélectionné
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Gestion des posts
function loadGamePosts(gameName) {
    const postsContainer = document.getElementById('postsContainer');
    if (!postsContainer) return;
    
    // Récupérer les posts depuis le localStorage
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const gamePosts = posts.filter(post => post.game === gameName);
    
    postsContainer.innerHTML = '';
    
    if (gamePosts.length === 0) {
        postsContainer.innerHTML = `
            <div class="no-posts">
                <p>Soyez le premier à partager vos astuces pour ce jeu !</p>
            </div>
        `;
        return;
    }
    
    gamePosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        postCard.innerHTML = `
            <div class="post-header">
                <div class="user-avatar">${post.userAvatar || '👤'}</div>
                <div class="user-info">
                    <div class="username">${post.username}</div>
                    <div class="post-date">${new Date(post.date).toLocaleDateString()}</div>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            ${post.video ? `<div class="post-video">🎥 Vidéo intégrée</div>` : ''}
            <div class="post-actions">
                <button class="action-btn" onclick="likePost(${post.id})">
                    ❤️ <span>${post.likes || 0}</span>
                </button>
                <button class="action-btn" onclick="commentOnPost(${post.id})">
                    💬 <span>${post.comments ? post.comments.length : 0}</span>
                </button>
                <button class="action-btn" onclick="sharePost(${post.id})">
                    ↗️
                </button>
            </div>
        `;
        
        postsContainer.appendChild(postCard);
    });
}

function openPostModal() {
    if (!checkAuth()) {
        showNotification('Connectez-vous pour publier', 'error');
        return;
    }
    
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closePostModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('postContent').value = '';
    }
}

function addVideo() {
    showNotification('Fonctionnalité vidéo à venir');
}

function publishPost() {
    const content = document.getElementById('postContent').value.trim();
    if (!content) {
        showNotification('Le contenu ne peut pas être vide', 'error');
        return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const gameName = urlParams.get('game');
    const user = getCurrentUser();
    
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const newPost = {
        id: Date.now(),
        game: gameName,
        username: user.username,
        userAvatar: user.username.charAt(0).toUpperCase(),
        content: content,
        date: new Date().toISOString(),
        likes: 0,
        comments: []
    };
    
    posts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    closePostModal();
    loadGamePosts(gameName);
    showNotification('Post publié avec succès !');
}

function likePost(postId) {
    if (!checkAuth()) {
        showNotification('Connectez-vous pour liker', 'error');
        return;
    }
    
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
        posts[postIndex].likes = (posts[postIndex].likes || 0) + 1;
        localStorage.setItem('posts', JSON.stringify(posts));
        
        // Recharger les posts
        const urlParams = new URLSearchParams(window.location.search);
        const gameName = urlParams.get('game');
        loadGamePosts(gameName);
        
        showNotification('Post liké !');
    }
}

function commentOnPost(postId) {
    if (!checkAuth()) {
        showNotification('Connectez-vous pour commenter', 'error');
        return;
    }
    
    const comment = prompt('Votre commentaire:');
    if (comment && comment.trim()) {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const postIndex = posts.findIndex(p => p.id === postId);
        const user = getCurrentUser();
        
        if (postIndex !== -1) {
            if (!posts[postIndex].comments) {
                posts[postIndex].comments = [];
            }
            
            posts[postIndex].comments.push({
                id: Date.now(),
                username: user.username,
                content: comment.trim(),
                date: new Date().toISOString()
            });
            
            localStorage.setItem('posts', JSON.stringify(posts));
            
            // Recharger les posts
            const urlParams = new URLSearchParams(window.location.search);
            const gameName = urlParams.get('game');
            loadGamePosts(gameName);
            
            showNotification('Commentaire ajouté !');
        }
    }
}

function sharePost(postId) {
    showNotification('Fonctionnalité de partage à venir');
}
