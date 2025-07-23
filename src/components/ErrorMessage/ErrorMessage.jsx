import React from 'react';
import './ErrorMessage.scss';

const ErrorMessage = ({ error, onRetry }) => {
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
          <button onClick={onRetry} style={{
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
};

export default ErrorMessage;
