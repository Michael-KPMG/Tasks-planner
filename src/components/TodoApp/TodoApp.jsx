import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import TodoList from '../TodoList/TodoList';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './TodoApp.scss';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

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
  const addTodo = async (text) => {
    if (text.trim() === '') return;

    try {
      const newTodoItem = {
        text: text.trim(),
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={fetchTodos} />;
  }

  return (
    <div className="todo-app-container">
      <Sidebar todos={todos} />
      <Header onAddTodo={addTodo} />
      <TodoList 
        todos={todos}
        editingId={editingId}
        editingText={editingText}
        statusOptions={statusOptions}
        onStartEdit={startEdit}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
        onUpdateStatus={updateStatus}
        onDeleteTodo={deleteTodo}
        onEditingTextChange={setEditingText}
      />
    </div>
  );
};

export default TodoApp;
