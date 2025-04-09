import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        <div className="top-bar">
          <div className="logo-container">
            <img src="/images/logo.png" alt="Logo strony" className="logo-ai" />
          </div>
          <nav className="main-nav">
            <ul>
              <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link></li>
              <li><Link to="/dodaj">Dodaj Transakcję</Link></li>
              <li><Link to="/raporty">Raporty</Link></li>
              <li><Link to="/">Start</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <aside className="sidebar left">
          <div className="ad-panel">
            <div className="baner">Baner 1</div>
          </div>
          <div className="ad-panel">
            <div className="baner">Baner 2</div>
          </div>
        </aside>

        <main>
          <Outlet />
        </main>

        <aside className="sidebar right">
          <div className="ad-panel">
            <div className="baner blue">Baner 3</div>
          </div>
          <div className="ad-panel">
            <div className="baner green">Baner 4</div>
          </div>
        </aside>
      </div>

      <footer>
        <p>&copy; 2025 Śledzenie Budżetu Domowego. Wszelkie prawa zastrzeżone.</p>
        <p>
          Kontakt: <a href="mailto:kontakt@budzet-domowy.pl">kontakt@budzet-domowy.pl</a> | Regulamin | Polityka Prywatności
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
