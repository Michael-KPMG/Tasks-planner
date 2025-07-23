import React from 'react';
import './TodoItem.scss';

const TodoItem = ({
  todo,
  isEditing,
  editingText,
  statusOptions,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onUpdateStatus,
  onDeleteTodo,
  onEditingTextChange
}) => {
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

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSaveEdit();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <div className="todo-item">
      <div className="todo-item__content">
        {isEditing ? (
          <input
            type="text"
            className="todo-item__edit-input"
            value={editingText}
            onChange={(e) => onEditingTextChange(e.target.value)}
            onKeyPress={handleEditKeyPress}
            onBlur={onSaveEdit}
            autoFocus
          />
        ) : (
          <span className="todo-item__text">{todo.text}</span>
        )}
        
        <div className="todo-item__status">
          <select
            className={`todo-item__status-select ${getStatusClass(todo.status)}`}
            value={todo.status}
            onChange={(e) => onUpdateStatus(todo.id, e.target.value)}
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
        {isEditing ? (
          <>
            <button 
              className="todo-item__btn todo-item__btn--save"
              onClick={onSaveEdit}
            >
              Save
            </button>
            <button 
              className="todo-item__btn todo-item__btn--cancel"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              className="todo-item__btn todo-item__btn--edit"
              onClick={() => onStartEdit(todo.id, todo.text)}
            >
              Edit
            </button>
            <button 
              className="todo-item__btn todo-item__btn--delete"
              onClick={() => onDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
