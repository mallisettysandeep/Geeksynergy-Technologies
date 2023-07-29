import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');

  const handleSignup = () => {
    const user = { name, password, email, phone, profession };
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          Profession:
          <select value={profession} onChange={(e) => setProfession(e.target.value)}>
            <option value="engineer">Engineer</option>
            <option value="doctor">Doctor</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.name === name && storedUser.password === password) {
      window.location.href = '/movies';
    } else {
      setError('Invalid Credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

function Movies() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const response = await axios.post('https://hoblist.com/api/movieList', {
      category: 'movies',
      language: 'kannada',
      genre: 'all',
      sort: 'voting',
    });
    setMovies(response.data.result);
  };

  React.useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompanyInfo() {
  return (
    <div>
      <h2>Company Info</h2>
      <p>Company: Geeksynergy Technologies Pvt Ltd</p>
      <p>Address: Sanjayanagar, Bengaluru-56</p>
      <p>Phone: XXXXXXXXX09</p>
      <p>Email: XXXXXX@gmail.com</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/">Signup</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/movies">Movies</a>
          </li>
          <li>
            <a href="/company-info">Company Info</a>
          </li>
        </ul>
      </nav>
      <main>
        {window.location.pathname === '/' && <Signup />}
        {window.location.pathname === '/login' && <Login />}
        {window.location.pathname === '/movies' && <Movies />}
        {window.location.pathname === '/company-info' && <CompanyInfo />}
      </main>
    </div>
  );
}

export default App;