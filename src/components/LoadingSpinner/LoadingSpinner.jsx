import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="todo-list-container">
      <div className="todo-list">
        <h1 className="todo-list__title">Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingSpinner;
