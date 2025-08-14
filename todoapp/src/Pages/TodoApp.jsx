import React, { useEffect, useState } from 'react'
import axios from 'axios';

const TodoApp = () => {
    const API_BASE_URL = 'https://full-todo-app-q23c.onrender.com';
    
        const fetchTodos = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/todos`);
                const data = await res.json();
                console.log(data);
                setTodos(data);
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            } finally {
                setLoading(false);
            }
        };
        useEffect(() => {
            fetchTodos();
        }, [])
        
    
        const [todos, setTodos] = useState([]);
        const [input, setInput] = useState("");
        const [editId, setEditId] = useState(null);
        const [editText, setEditText] = useState("");
        const [loading, setLoading] = useState(false);
    
    
        const handleAddTodo = async (e) => {
            e.preventDefault();
            if (input.trim() === "") {
                alert("Todo cannot be empty!");
                return;
            }
            try {
                await axios.post(`${API_BASE_URL}/todos`, { text: input });
                fetchTodos();
                setInput("");
            } catch (error) {
                alert('Failed to add todo.');
            }
        };
    
        const handleDelete = async (_id) => {
            try {
                await axios.delete(`${API_BASE_URL}/todos/${_id}`);
                fetchTodos();
            } catch (error) {
                alert('Failed to delete todo.');
            }
        };
    
        const handleEdit = (_id, text) => {
            setEditId(_id);
            setEditText(text);
        };
    
        const handleUpdate = async (e) => {
            e.preventDefault();
            if (editText.trim() === "") {
                alert("Todo cannot be empty!");
                return;
            }
            try {
                await axios.put(`${API_BASE_URL}/todos/${editId}`, { text: editText });
                fetchTodos();
                setEditId(null);
                setEditText("");
            } catch (error) {
                alert('Failed to update todo.');
            }
        };
    
  return (
    <>
            <div className="App">
            <style>{`
        .todo-container {
            max-width: 500px;
            margin: 40px auto;
            padding: 32px;
            background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .todo-title {
            text-align: center;
            color: #2d6cdf;
            margin-bottom: 24px;
            font-weight: 700;
            letter-spacing: 1px;
        }
        .todo-input-row {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
            align-items: center;
        }
        .todo-input {
            flex: 1;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #b6c6e3;
            font-size: 16px;
            outline: none;
            background: #f7fbff;
        }
        .todo-btn {
            padding: 12px 24px;
            border-radius: 8px;
            color: #fff;
            border: none;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(45,108,223,0.08);
        }
        .add-btn { background: #2d6cdf; }
        .update-btn { background: #f7b731; }
        .cancel-btn { background: #e74c3c; margin-left: 4px; }
        .todo-list { list-style: none; padding: 0; margin: 0; }
        .todo-empty { text-align: center; color: #888; font-style: italic; padding: 24px; }
        .todo-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            background: #fff;
            padding: 14px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(45,108,223,0.04);
            transition: box-shadow 0.2s;
        }
        .todo-num { font-weight: 700; color: #2d6cdf; margin-right: 16px; font-size: 18px; }
        .todo-text { flex: 1; font-size: 17px; color: #333; }
        .edit-btn {
            margin-right: 8px;
            background: #f7b731;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 8px 16px;
            font-weight: 600;
            cursor: pointer;
            font-size: 15px;
            }
            .delete-btn {
            background: #e74c3c;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 8px 16px;
            font-weight: 600;
            cursor: pointer;
            font-size: 15px;
        }
        `}</style>
            <>
                <div className="todo-container">
                    <h2 className="todo-title">Todo App</h2>
                    <div className="todo-input-row">
                        <input
                            type="text"
                            className="todo-input"
                            value={editId ? editText : input}
                            onChange={e => editId ? setEditText(e.target.value) : setInput(e.target.value)}
                            placeholder={editId ? "Edit todo..." : "Add a new todo..."}
                        />
                        {editId ? (
                            <>
                                <button onClick={handleUpdate} className="todo-btn update-btn">Update</button>
                                <button type="button" onClick={() => { setEditId(null); setEditText(""); }} className="todo-btn cancel-btn">Cancel</button>
                            </>
                        ) : (
                            <button onClick={handleAddTodo} className="todo-btn add-btn">Add</button>
                        )}
                    </div>
                    <ul className="todo-list">
                        {todos.length === 0 ? (
                        <li className="todo-empty">No todos yet. Add one!</li>
                        ) : (
                            todos.map((todo, idx) => (
                                <li key={todo._id} className="todo-item">
                                    <span className="todo-num">{idx + 1}.</span>
                                    <span className="todo-text">{todo.text}</span>
                                    <button onClick={() => handleEdit(todo._id, todo.text)} className="edit-btn">Edit</button>
                                    <button onClick={() => handleDelete(todo._id)} className="delete-btn">Delete</button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </>
        </div>
    </>
    ) ; 
}

export default TodoApp