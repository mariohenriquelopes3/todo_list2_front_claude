import { useState, useRef, useEffect } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleStartEdit = () => {
    setEditValue(todo.text)
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    onEdit(todo.id, editValue)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditValue(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <div className="todo-edit-wrapper">
          <input
            ref={inputRef}
            className="todo-edit-input"
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSaveEdit} title="Save">
              &#10003;
            </button>
            <button className="cancel-btn" onClick={handleCancelEdit} title="Cancel">
              &#10005;
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <label className="todo-checkbox-label">
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className="custom-checkbox">
              {todo.completed && <span className="checkmark">&#10003;</span>}
            </span>
          </label>
          <span
            className="todo-text"
            onDoubleClick={handleStartEdit}
            title="Double-click to edit"
          >
            {todo.text}
          </span>
          <div className="todo-actions">
            <button
              className="edit-btn"
              onClick={handleStartEdit}
              title="Edit todo"
              aria-label="Edit todo"
            >
              &#9998;
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(todo.id)}
              title="Delete todo"
              aria-label="Delete todo"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

export default TodoItem
