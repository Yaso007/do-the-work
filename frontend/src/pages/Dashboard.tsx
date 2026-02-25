import { useEffect, useState } from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate, Link} from "react-router-dom";

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
}

const Dashboard = () => {
const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000";

  // 🔹 Fetch Todos
  const fetchTodos = async () => {
   try {
    console.log("Fetching todos with token:", token);
    const res = await fetch(`${API_URL}/api/todos/getTodo`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    // If your API wraps the array in an object (e.g., { todos: [] })
    if (data && Array.isArray(data.todos)) {
       setTodos(data.todos);
    } 
    // If your API returns the array directly
    else if (Array.isArray(data)) {
       setTodos(data);
    } 
    else {
       console.error("Received non-array data:", data);
       setTodos([]); // Fallback to empty array to prevent crash
    }
  } catch (err) {
    console.error("Failed to fetch todos", err);
    setTodos([]); // Fallback on network error
  }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 🔹 Create Todo
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setLoading(true);

    try {
      await fetch(`${API_URL}/api/todos/createTodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, priority, description }),
      });

      setTitle("");
      setPriority("");
      setDescription("");
      fetchTodos();
    } catch (err) {
      console.error("Failed to create todo", err);
    }

    setLoading(false);
  };

  // 🔹 Delete Todo
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}api/todos/deleteTodo/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setTodos(todos.filter((todo) => todo.id !== id));
   
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Welcome, {user?.name}</h2>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      <form onSubmit={handleCreate} style={styles.form}>
        <input
          type="text"
          placeholder="Todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />

        <button style={styles.addBtn} disabled={loading}>
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </form>

      <div style={styles.todoList}>
        {todos.length === 0 ? (
          <p>No todos yet 🚀</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} style={styles.todoItem}>
              <div>
                <h4>{todo.title}</h4>
                {todo.description && <p>{todo.description}</p>}
              </div>

              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

// 🎨 Basic Modern Styling (No Tailwind)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  logoutBtn: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  todoList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    borderRadius: "8px",
    background: "#f5f5f5",
  },
  deleteBtn: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};