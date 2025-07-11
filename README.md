# 📱 Event Buddy

Event Buddy é uma aplicação mobile multiplataforma, desenvolvida em **React Native com Expo**, que permite aos utilizadores explorar, guardar e inscrever-se em eventos locais como concertos, feiras, workshops e conferências.

---

## 📌 Funcionalidades Principais

- 🔐 Autenticação (registo, login, logout)
- 📅 Listagem de eventos locais com detalhes completos
- ⭐ Adicionar/Remover favoritos
- ✅ Inscrição e gestão de participações em eventos
- 👤 Área pessoal com dados do utilizador
- 🔁 Sessão persistente após login

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia             | Finalidade                            |
|------------------------|----------------------------------------|
| React Native (Expo)    | Desenvolvimento mobile multiplataforma |
| Firebase Authentication| Gestão de utilizadores e sessões      |
| Firebase Firestore     | Base de dados em tempo real na cloud  |
| React Navigation       | Navegação entre ecrãs                 |
| useState/useEffect     | Gestão de estado local                |
| useContext             | Contexto global (autenticação)        |
| .env                   | Variáveis de ambiente (chaves Firebase)|

---

## 📦 Dependências Principais

Certifica-te de que tens o **Node.js** e o **Expo CLI** instalados.

Instalação das dependências:

```bash
npm install
# ou
yarn install

🚀 Como Executar a Aplicação

    Clona ou descarrega este repositório.

    Cria um ficheiro .env na raiz do projeto e insere as tuas credenciais do Firebase:

FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...

Inicia a aplicação com Expo:

    npx expo start

    Abre a app no teu telemóvel com o Expo Go, ou usa um emulador Android/iOS.


📁 Estrutura Sugerida

event-buddy/
├── App.js
├── package.json
├── .env
├── /screens
│   ├── HomeScreen.js
│   ├── EventDetailScreen.js
│   ├── FavoritesScreen.js
│   ├── ProfileScreen.js
│   ├── LoginScreen.js
│   └── RegisterScreen.js
├── /context
│   └── AuthContext.js
├── /services
│   └── firebase.js
├── /components
├── /assets
└── /screenshots

👩‍💻 Desenvolvido por

Bruna Amaral
Projeto final — IEFP 24198
Julho de 2025
