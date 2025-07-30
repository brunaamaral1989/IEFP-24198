# 🎵 Sintonize

**Sintonize** é um aplicativo web de streaming de música desenvolvido como projeto final da UFCD 5425 – Projeto de Aplicações Multimédia Interativas. Ele permite que os utilizadores registrem-se, façam login (incluindo login social), pesquisem e reproduzam prévias de músicas e álbuns via API do iTunes.

> 📅 Concluído em julho de 2025  
> 👩‍💻 Desenvolvido por Bruna Amaral  
> 👥 Projeto sob orientação de Carla Sónia Godinho (Formadora) – IEFP

---

## ✨ Funcionalidades

- 🔐 Registo e login de utilizadores (Firebase Authentication)
  - Login com e-mail/senha
  - Login social com Google e Apple
- 🔎 Pesquisa de músicas e álbuns (API iTunes)
- 🎧 Reprodução de prévias de músicas
- ❤️ Adicionar/remover favoritos
- 👤 Perfil do utilizador com foto e nome
- 📱 Interface responsiva e intuitiva

---

## 🛠️ Tecnologias Utilizadas

- **Front-end**: React.js, Tailwind CSS
- **Back-end (auth/firestore)**: Firebase
- **Autenticação**: Firebase Auth, Google Login, Apple Login
- **API pública**: iTunes Search API
- **Outros**: React Router, Context API, localStorage

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js instalado
- Conta no Firebase (para configurar o seu próprio projeto)

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/brunaamaral/sintonize.git
cd projetofinal



    Instale as dependências:

npm install

    Configure o Firebase:

    Crie um projeto no Firebase Console

    Ative a autenticação por e-mail/senha e provedores sociais (Google, Apple)

    Ative o Firestore Database

    Copie as credenciais para um arquivo .env com:

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

    Inicie o app:

npm start
