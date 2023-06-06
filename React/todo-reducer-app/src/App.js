import React, { useReducer, useState } from 'react';
import './App.css';

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputText, setInputText] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      dispatch({ type: 'ADD', payload: inputText });
      setInputText('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Enter a todo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
            onClick={() => handleToggleTodo(todo.id)}
          >
            {todo.text}
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTodo(todo.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
