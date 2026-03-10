import { useState, useEffect } from 'react'
import TodoHeader from './components/TodoHeader'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem('todos')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString(),
      }
    ])
  }

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    const trimmed = newText.trim()
    if (!trimmed) {
      deleteTodo(id)
      return
    }
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    )
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed)
    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="app">
      <div className="container">
        <TodoHeader />
        <div className="card">
          <TodoInput
            onAdd={addTodo}
            onToggleAll={toggleAll}
            hasTodos={todos.length > 0}
            allCompleted={todos.length > 0 && todos.every(t => t.completed)}
          />
          {todos.length > 0 && (
            <>
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
              <TodoFooter
                activeCount={activeCount}
                completedCount={completedCount}
                filter={filter}
                onFilterChange={setFilter}
                onClearCompleted={clearCompleted}
              />
            </>
          )}
          {todos.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">&#9998;</span>
              <p>No todos yet. Add one above to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
