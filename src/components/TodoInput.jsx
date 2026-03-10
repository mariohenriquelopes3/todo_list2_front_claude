import { useState } from 'react'

function TodoInput({ onAdd, onToggleAll, hasTodos, allCompleted }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) {
      onAdd(value)
      setValue('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className="todo-input-wrapper">
      {hasTodos && (
        <button
          className={`toggle-all-btn ${allCompleted ? 'active' : ''}`}
          onClick={onToggleAll}
          title={allCompleted ? 'Mark all incomplete' : 'Mark all complete'}
          aria-label="Toggle all todos"
        >
          &#10003;
        </button>
      )}
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          className="todo-input"
          type="text"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button type="submit" className="add-btn" disabled={!value.trim()}>
          Add
        </button>
      </form>
    </div>
  )
}

export default TodoInput
