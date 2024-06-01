import { useState } from 'react';
import './App.css';

function App() {
  const [show, setShow] = useState("");
  const [view, setView] = useState(true);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validCredentials = {
    username: "user",
    password: "password"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleView();
  };

  const handleView = () => {
    if (name === validCredentials.username && password === validCredentials.password) {
      setView(false);
      setShow("Welcome, user!");
      setError("");
    } else {
      setError("Invalid username or password");
    }
    setName("");
    setPassword("");
  };

  return (
    <div>
      <h1>Login Page</h1>
      {error && <p >{error}</p>}
      {view ? (
        
        <form className="form" onSubmit={handleSubmit}>
          <label>Username:
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
         
          <button className="submit">Submit</button>
        </form>
      ) : (
        <p>{show}</p>
      )}
    </div>
  );
}

export default App;
