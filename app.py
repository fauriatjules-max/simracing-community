import streamlit as st
import json
import os
from datetime import datetime

# Configuration de la page
st.set_page_config(
    page_title="SimRacing Community",
    page_icon="🏎️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# CSS personnalisé
st.markdown("""
<style>
    .main {
        background: linear-gradient(135deg, #FF0000 0%, #000000 100%);
        color: white;
    }
    .stApp {
        background: linear-gradient(135deg, #FF0000 0%, #000000 100%);
    }
    .game-card {
        background: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 10px;
        margin: 10px 0;
        border-left: 4px solid #CC0000;
    }
    .circuit-card {
        background: rgba(255, 255, 255, 0.1);
        padding: 15px;
        border-radius: 8px;
        margin: 8px 0;
    }
</style>
""", unsafe_allow_html=True)

# Données des jeux
games_data = {
    'rFactor 2': {
        'logo': '📀',
        'circuits': [
            {'name': 'Nürburgring GP', 'length': '5.148km', 'country': 'Allemagne'},
            {'name': 'Spa-Francorchamps', 'length': '7.004km', 'country': 'Belgique'},
            {'name': 'Silverstone', 'length': '5.891km', 'country': 'Royaume-Uni'}
        ]
    },
    'Le Mans Ultimate': {
        'logo': '🏁',
        'circuits': [
            {'name': 'Circuit de la Sarthe', 'length': '13.626km', 'country': 'France'},
            {'name': 'Sebring', 'length': '6.019km', 'country': 'USA'},
            {'name': 'Fuji Speedway', 'length': '4.563km', 'country': 'Japon'}
        ]
    },
    'Assetto Corsa Competizione': {
        'logo': '⚡',
        'circuits': [
            {'name': 'Monza', 'length': '5.793km', 'country': 'Italie'},
            {'name': 'Barcelona-Catalunya', 'length': '4.655km', 'country': 'Espagne'},
            {'name': 'Hungaroring', 'length': '4.381km', 'country': 'Hongrie'}
        ]
    }
}

# Session state pour gérer l'état
if 'user' not in st.session_state:
    st.session_state.user = None
if 'page' not in st.session_state:
    st.session_state.page = 'accueil'
if 'selected_game' not in st.session_state:
    st.session_state.selected_game = None

# Fonctions de navigation
def go_to_page(page_name, game=None):
    st.session_state.page = page_name
    if game:
        st.session_state.selected_game = game

# Page d'accueil
def show_home():
    st.title("🏎️ SimRacing Community")
    st.markdown("### Bienvenue dans la communauté SimRacing !")
    
    # Liste des jeux
    st.markdown("### 🎮 Jeux de simulation")
    for game_name, game_data in games_data.items():
        with st.container():
            col1, col2 = st.columns([1, 4])
            with col1:
                st.markdown(f"<h1 style='text-align: center;'>{game_data['logo']}</h1>", unsafe_allow_html=True)
            with col2:
                st.markdown(f"**{game_name}**")
                if st.button("Voir détails", key=f"btn_{game_name}"):
                    go_to_page('jeu', game_name)
            st.markdown("---")

# Page de détails d'un jeu
def show_game_details():
    game_name = st.session_state.selected_game
    game_data = games_data.get(game_name)
    
    if not game_data:
        st.error("Jeu non trouvé")
        if st.button("← Retour"):
            go_to_page('accueil')
        return
    
    # Header du jeu
    col1, col2 = st.columns([1, 3])
    with col1:
        st.markdown(f"<h1 style='text-align: center; font-size: 48px;'>{game_data['logo']}</h1>", unsafe_allow_html=True)
    with col2:
        st.title(game_name)
    
    # Bouton retour
    if st.button("← Retour à l'accueil"):
        go_to_page('accueil')
    
    # Onglets
    tab1, tab2 = st.tabs(["🏁 Circuits", "💡 Astuces de pilotage"])
    
    with tab1:
        st.subheader("Circuits disponibles")
        for circuit in game_data['circuits']:
            with st.container():
                st.markdown(f"**{circuit['name']}**")
                st.markdown(f"📏 {circuit['length']} • 🇺🇳 {circuit['country']}")
                st.markdown("---")
    
    with tab2:
        st.subheader("Astuces de la communauté")
        
        # Système de posts (simplifié)
        if st.session_state.user:
            with st.form("nouveau_post"):
                post_content = st.text_area("Partagez vos astuces...", max_chars=500)
                if st.form_submit_button("Publier"):
                    if post_content:
                        st.success("Post publié !")
        else:
            st.info("Connectez-vous pour partager vos astuces")
        
        # Posts existants (exemple)
        st.markdown("---")
        st.markdown("**Exemple de posts**")
        st.markdown("💡 *Conseil: Pour le virage de l'Eau Rouge à Spa, maintenez les gaz!*")
        st.markdown("👤 **Pierre** - Il y a 2h")
        st.markdown("---")

# Page de connexion
def show_login():
    st.title("🔐 Connexion")
    
    with st.form("login_form"):
        email = st.text_input("Email")
        password = st.text_input("Mot de passe", type="password")
        
        if st.form_submit_button("Se connecter"):
            # Simulation de connexion
            st.session_state.user = {
                'username': 'Pilote',
                'email': email
            }
            st.success(f"Bienvenue {st.session_state.user['username']}!")
            go_to_page('accueil')
    
    if st.button("← Retour"):
        go_to_page('accueil')

# Navigation principale
def main():
    if st.session_state.page == 'accueil':
        show_home()
    elif st.session_state.page == 'jeu':
        show_game_details()
    elif st.session_state.page == 'connexion':
        show_login()

# Barre latérale avec navigation
with st.sidebar:
    st.title("SRC")
    st.markdown("---")
    
    if st.session_state.user:
        st.success(f"Connecté en tant que {st.session_state.user['username']}")
        if st.button("Déconnexion"):
            st.session_state.user = None
            st.session_state.page = 'accueil'
            st.rerun()
    else:
        if st.button("Se connecter"):
            go_to_page('connexion')
    
    st.markdown("---")
    if st.button("Accueil 🏠"):
        go_to_page('accueil')

if __name__ == "__main__":
    main()
