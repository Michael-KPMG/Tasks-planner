import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.scss';

const TodoList = ({ 
  todos, 
  editingId, 
  editingText, 
  statusOptions,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onUpdateStatus,
  onDeleteTodo,
  onEditingTextChange
}) => {
  if (todos.length === 0) {
    return (
      <div className="todo-content">
        <div className="todo-list__items">
          <div className="todo-list__empty">
            <p>No todos yet. Add one above!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-content">
      <div className="todo-list__items">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            editingText={editingText}
            statusOptions={statusOptions}
            onStartEdit={onStartEdit}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onUpdateStatus={onUpdateStatus}
            onDeleteTodo={onDeleteTodo}
            onEditingTextChange={onEditingTextChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
