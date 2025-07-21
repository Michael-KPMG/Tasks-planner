import React, { useState, useEffect } from 'react';
import './TodoList.scss';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // JSON Server API base URL
  const API_BASE = 'http://localhost:3001';

  // Status options
  const statusOptions = ['Not Completed', 'In-Progress', 'Completed'];

  // Fetch todos from JSON file via API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/todos`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Make sure JSON server is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    try {
      const newTodoItem = {
        text: newTodo.trim(),
        status: 'Not Completed'
      };

      const response = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodoItem)
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const savedTodo = await response.json();
      setTodos([...todos, savedTodo]);
      setNewTodo('');
      setError(null);
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo');
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo');
    }
  };

  // Start editing todo text
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edited todo text
  const saveEdit = async () => {
    if (editingText.trim() === '') return;
    try {
      const updatedTodo = todos.find(todo => todo.id === editingId);
      const response = await fetch(`${API_BASE}/todos/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedTodo, text: editingText.trim() })
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      setTodos(todos.map(todo =>
        todo.id === editingId
          ? { ...todo, text: editingText.trim() }
          : todo
      ));
      setEditingId(null);
      setEditingText('');
      setError(null);
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo');
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Update todo status
  const updateStatus = async (id, newStatus) => {
    try {
      const updatedTodo = todos.find(todo => todo.id === id);
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedTodo, status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update todo status');
      }

      setTodos(todos.map(todo =>
        todo.id === id
          ? { ...todo, status: newStatus }
          : todo
      ));
      setError(null);
    } catch (err) {
      console.error('Error updating todo status:', err);
      setError('Failed to update todo status');
    }
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'Not Completed':
        return 'status-not-completed';
      case 'In-Progress':
        return 'status-in-progress';
      case 'Completed':
        return 'status-completed';
      default:
        return 'status-not-completed';
    }
  };

  // Handle Enter key press for adding todos
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Handle Enter key press for editing todos
  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  if (loading) {
    return (
      <div className="todo-list-container">
        <div className="todo-list">
          <h1 className="todo-list__title">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="todo-list-container">
        <div className="todo-list">
          <h1 className="todo-list__title">Todo List</h1>
          <div className="error-message" style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '1rem',
            borderRadius: '8px',
            margin: '1rem 0',
            textAlign: 'center'
          }}>
            <p>{error}</p>
            <button onClick={fetchTodos} style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              marginTop: '0.5rem',
              cursor: 'pointer'
            }}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      
      {/* Sidebar with statistics */}
      <div className="dashboard-sidebar">
        <div className="stat">
          <span className="stat__label">Total:</span>
          <span className="stat__value">{todos.length}</span>
        </div>
        <div className="stat">
          <span className="stat__label">Not Completed:</span>
          <span className="stat__value stat__value--not-completed">
            {todos.filter(todo => todo.status === 'Not Completed').length}
          </span>
        </div>
        <div className="stat">
          <span className="stat__label">In Progress:</span>
          <span className="stat__value stat__value--in-progress">
            {todos.filter(todo => todo.status === 'In-Progress').length}
          </span>
        </div>
        <div className="stat">
          <span className="stat__label">Completed:</span>
          <span className="stat__value stat__value--completed">
            {todos.filter(todo => todo.status === 'Completed').length}
          </span>
        </div>
      </div>
      
      {/* Header with add section */}
      <div className="dashboard-header">
        <h1 className="todo-list__title">Todo List</h1>
        <div className="todo-list__add-section">
          <input
            type="text"
            className="todo-list__input"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="todo-list__add-btn"
            onClick={addTodo}
            disabled={newTodo.trim() === ''}
          >
            Add Todo
          </button>
        </div>
      </div>
      
      {/* Main content area with todos */}
      <div className="todo-content">
        <div className="todo-list__items">
          {todos.length === 0 ? (
            <div className="todo-list__empty">
              <p>No todos yet. Add one above!</p>
            </div>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className="todo-item">
                <div className="todo-item__content">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      className="todo-item__edit-input"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={handleEditKeyPress}
                      onBlur={saveEdit}
                      autoFocus
                    />
                  ) : (
                    <span className="todo-item__text">{todo.text}</span>
                  )}
                  
                  <div className="todo-item__status">
                    <select
                      className={`todo-item__status-select ${getStatusClass(todo.status)}`}
                      value={todo.status}
                      onChange={(e) => updateStatus(todo.id, e.target.value)}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="todo-item__actions">
                  {editingId === todo.id ? (
                    <>
                      <button 
                        className="todo-item__btn todo-item__btn--save"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                      <button 
                        className="todo-item__btn todo-item__btn--cancel"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="todo-item__btn todo-item__btn--edit"
                        onClick={() => startEdit(todo.id, todo.text)}
                      >
                        Edit
                      </button>
                      <button 
                        className="todo-item__btn todo-item__btn--delete"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
