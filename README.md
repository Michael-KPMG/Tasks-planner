# Todo List React App

A complete Todo List application built with React and Vite that **writes directly to JSON files**.

## Features
- Add, edit, and delete todos
- Status management (Not Completed, In-Progress, Completed)
- **JSON file persistence** (no localStorage)
- Real-time file updates
- Responsive design

## How to Run

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start JSON Server (Backend)
```bash
npm run json-server
```
Keep this terminal open!

### Step 3: Start React App (Frontend)
In a new terminal:
```bash
npm run dev
```

### Step 4: Open App
Open `http://localhost:5173`

## Data Storage
All todos are stored in `src/data/todos.json` - you can watch this file update in real-time as you use the app!
