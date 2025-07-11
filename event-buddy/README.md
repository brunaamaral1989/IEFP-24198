# 📱 Event Buddy

Uma aplicação mobile desenvolvida com **React Native (Expo)** que permite aos utilizadores explorar, guardar e inscrever-se em eventos locais como concertos, workshops, feiras e conferências.

## 🎯 Objetivo

Este projeto foi desenvolvido com o intuito de simular um cenário real de desenvolvimento de software, integrando funcionalidades essenciais como autenticação, persistência de dados na cloud e navegação multi-ecrã com gestão de estado.  

---

## 🧩 Funcionalidades

### 👥 Autenticação
- Registo de utilizadores com e-mail e password.
- Login com validação segura.
- Logout com limpeza de sessão.
- Sessão persistente (o utilizador continua autenticado ao reabrir o app).

### 📡 Integração com Firebase Firestore
- Listagem de eventos armazenados na coleção `events`.
- Cada evento inclui: título, descrição, localização, data/hora, imagem e participantes.
- Participações e favoritos geridos na coleção `users/{uid}`.

### 🔀 Navegação (React Navigation)
- **Bottom Tabs Navigator** com três abas:
  - `🏠 Home`: Explorar eventos.
  - `⭐ Favoritos`: Eventos salvos pelo utilizador.
  - `👤 Perfil`: Informações do utilizador e logout.
- **Stack Navigator** na aba Home para navegar entre a lista e os detalhes de um evento.

### 📱 Telas da Aplicação

#### 🏠 Home
- Lista de eventos locais ordenados por data.
- Cada card mostra imagem, título e data.
- Botão para aceder aos detalhes.

#### 📄 Detalhes do Evento
- Descrição completa, local, imagem destacada e data.
- Botões para:
  - Participar ou cancelar participação.
  - Adicionar ou remover dos favoritos.
- Mostra número total de participantes.

#### ⭐ Favoritos
- Mostra apenas os eventos marcados como favoritos pelo utilizador.

#### 👤 Perfil
- Mostra dados do utilizador (e-mail e UID).
- Botão para logout.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia           | Finalidade                           |
|----------------------|---------------------------------------|
| React Native (Expo)  | Desenvolvimento mobile multiplataforma |
| Firebase Auth        | Autenticação (email/password)        |
| Firebase Firestore   | Base de dados em tempo real          |
| React Navigation     | Navegação entre telas                |
| React Hooks          | `useState`, `useEffect`, `useContext` para estado |
| .env                 | Variáveis de ambiente (Firebase keys) |
| Yarn / npm           | Gerenciamento de dependências        |

---

## 🔐 Segurança

- A base de dados Firestore é protegida com **rules por UID**, garantindo que cada utilizador só acede aos seus próprios dados pessoais.
- As **chaves do Firebase** estão armazenadas de forma segura no arquivo `.env` (não incluso no repositório).

---
