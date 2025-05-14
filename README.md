# 355final
# Task Manager App

A full-stack task manager web app with user authentication and CRUD task functionality using HTML/CSS/JS (frontend) and Express.js + NeDB (backend).

## Features
- User registration & login (with token-based auth)
- Create, read, update, and delete tasks
- Tasks are user-specific and secured
- Responsive and simple UI

##Technologies
- Frontend: HTML, CSS, Vanilla JS
- Backend: Node.js, Express.js, NeDB
- Auth: JSON Web Tokens (JWT)
- Style: Responsive, mobile-first UI


## Folder Structure
task-manager-app/
│
├── client/
│ ├── dashboard.html
│ ├── login.html
│ ├── register.html
│ ├── styles.css
│ └── script.js
│
├── server/
│ ├── models/
│ ├── routes/
│ └── server.js
│
└── README.md

## How to Run
1. Clone the repo:  
   `git clone https://github.com/your-username/task-manager-app.git`

2. Install backend dependencies:  
   `cd server && npm install`

3. Start server:  
   `npm run dev`

4. Open frontend in browser using Live Server or manually open `client/index.html`
