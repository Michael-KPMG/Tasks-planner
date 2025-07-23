import React from 'react';
import './Sidebar.scss';

const Sidebar = ({ todos }) => {
  const totalTodos = todos.length;
  const notCompleted = todos.filter(todo => todo.status === 'Not Completed').length;
  const inProgress = todos.filter(todo => todo.status === 'In-Progress').length;
  const completed = todos.filter(todo => todo.status === 'Completed').length;

  return (
    <div className="dashboard-sidebar">
      <div className="stat">
        <span className="stat__label">Total:</span>
        <span className="stat__value">{totalTodos}</span>
      </div>
      <div className="stat">
        <span className="stat__label">Not Completed:</span>
        <span className="stat__value stat__value--not-completed">
          {notCompleted}
        </span>
      </div>
      <div className="stat">
        <span className="stat__label">In Progress:</span>
        <span className="stat__value stat__value--in-progress">
          {inProgress}
        </span>
      </div>
      <div className="stat">
        <span className="stat__label">Completed:</span>
        <span className="stat__value stat__value--completed">
          {completed}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
