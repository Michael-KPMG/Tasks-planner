import React, { useState } from 'react';
import './AddTodo.scss';

const AddTodo = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = () => {
    if (newTodo.trim() === '') return;
    onAddTodo(newTodo);
    setNewTodo('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
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
        onClick={handleSubmit}
        disabled={newTodo.trim() === ''}
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
