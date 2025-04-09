import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <header>
      <div className="top-bar">
        <div className="logo-container">
          <img src="/images/logo.png" alt="Logo" className="logo-ai" />
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/dodaj">Dodaj Transakcję</Link></li>
            <li><Link to="/raporty">Raporty</Link></li>
          </ul>
        </nav>
      </div>
    </header>

    <main className="content">
      <h2>Witaj w aplikacji budżetowej!</h2>
    </main>

    <footer>
      <p>&copy; 2025 ...</p>
    </footer>
  </div>
);

export default Home;
