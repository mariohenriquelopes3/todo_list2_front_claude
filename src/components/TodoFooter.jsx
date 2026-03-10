function TodoFooter({ activeCount, completedCount, filter, onFilterChange, onClearCompleted }) {
  const itemLabel = activeCount === 1 ? 'item' : 'items'

  return (
    <footer className="todo-footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> {itemLabel} left
      </span>

      <nav className="filter-nav" aria-label="Filter todos">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </nav>

      {completedCount > 0 && (
        <button className="clear-completed-btn" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  )
}

export default TodoFooter
