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

## Troubleshooting

### When cloning on a new system:

1. **Make sure Node.js is installed (version 16+)**
   ```bash
   node --version
   npm --version
   ```

2. **Install dependencies after cloning**
   ```bash
   npm install
   ```

3. **If you get "json-server command not found":**
   - The `json-server` package is now included in devDependencies
   - Run `npm install` to install it locally

4. **If port 3001 is already in use:**
   ```bash
   # Kill process on port 3001 (macOS/Linux)
   lsof -ti:3001 | xargs kill -9
   
   # Or change port in package.json
   "json-server": "json-server --watch src/data/todos.json --port 3002"
   ```

5. **If Vite dev server fails to start:**
   ```bash
   # Clear Vite cache
   rm -rf node_modules/.vite
   npm run dev
   ```

### Common Platform Issues:

- **Windows**: Use PowerShell or Command Prompt, not Git Bash for running servers
- **macOS**: Make sure you have Xcode Command Line Tools: `xcode-select --install`
- **Linux**: You may need to install build tools: `sudo apt-get install build-essential`

### Verify Everything Works:

1. JSON Server: http://localhost:3001/todos should return JSON data
2. React App: http://localhost:5173 should load the todo app
3. Test API: Try adding/editing a todo and check if `src/data/todos.json` updates

## Project Requirements

- Node.js 16+
- npm or yarn
- Modern web browser
- Two terminal windows (one for JSON server, one for React app)
