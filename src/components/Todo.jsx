import React, { useState, useEffect } from "react";
import "./Todo.css";

const Todo = () => {
    // Initialize state with localStorage data or an empty array if there's no data
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [inputValue, setInputValue] = useState('');

    // Save todos to localStorage whenever the todos state changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, { text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDeleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const handleToggleComplete = (index) => {
        const newTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    const handleClearAll = () => {
        setTodos([]);
    };

    return (
        <>
            <h1 className="text-center">React TODO APP</h1>
            <div className="Todo-Container">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter your todos here..."
                        className="input-field"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="submit-btn" onClick={handleAddTodo}>
                        ADD+
                    </button>
                </div>
                <div className="list-container">
                    {todos.length === 0 ? (
                        <h2>You don't have any todos yet...</h2>
                    ) : (
                        <ul>
                            {todos.map((todo, index) => (
                                <li key={index} className={todo.completed ? "completed" : ""}>
                                    <div className="checkbox-field">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => handleToggleComplete(index)}
                                        />
                                        <span>{todo.text}</span>
                                    </div>
                                    <div className="delete-btn">
                                        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="clear-btn">
                    <button className="clear-all-btn" onClick={handleClearAll}>Clear All</button>
                </div>
            </div>
        </>
    );
};

export default Todo;
