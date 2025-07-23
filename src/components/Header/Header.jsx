import React from 'react';
import AddTodo from '../AddTodo/AddTodo';
import './Header.scss';

const Header = ({ onAddTodo }) => {
  return (
    <div className="dashboard-header">
      <h1 className="todo-list__title">Todo List</h1>
      <AddTodo onAddTodo={onAddTodo} />
    </div>
  );
};

export default Header;
