import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const LOGO = process.env.PUBLIC_URL + '/octofitapp-small.png';

function Home() {
  return (
    <div className="container">
      <div className="octofit-hero text-center">
        <div className="hero-icon">🐙</div>
        <h1>OctoFit Tracker</h1>
        <p className="lead mt-3">
          Track your fitness activities, compete with your team,<br />
          and stay on top of the leaderboard!
        </p>
        <div className="octofit-hero-links mt-4">
          <NavLink to="/users"       className="btn btn-outline-light btn-sm">👤 Users</NavLink>
          <NavLink to="/teams"       className="btn btn-outline-light btn-sm">🏆 Teams</NavLink>
          <NavLink to="/activities"  className="btn btn-outline-info  btn-sm">🏃 Activities</NavLink>
          <NavLink to="/leaderboard" className="btn btn-outline-warning btn-sm">📊 Leaderboard</NavLink>
          <NavLink to="/workouts"    className="btn btn-outline-success btn-sm">💪 Workouts</NavLink>
        </div>
      </div>

      <div className="row g-4 mt-2 mb-5">
        {[
          { to: '/users',       icon: '👤', title: 'Users',       desc: 'Manage all registered members of the OctoFit community.',      color: 'primary'  },
          { to: '/teams',       icon: '🏆', title: 'Teams',       desc: 'View and manage teams competing in fitness challenges.',        color: 'info'     },
          { to: '/activities',  icon: '🏃', title: 'Activities',  desc: 'Log and browse individual workout activities.',                 color: 'success'  },
          { to: '/leaderboard', icon: '📊', title: 'Leaderboard', desc: 'See which teams are leading the fitness competition.',           color: 'warning'  },
          { to: '/workouts',    icon: '💪', title: 'Workouts',    desc: 'Browse the library of available workout programmes.',           color: 'danger'   },
        ].map(({ to, icon, title, desc, color }) => (
          <div className="col-sm-6 col-lg-4" key={to}>
            <NavLink to={to} className="text-decoration-none">
              <div className={`card h-100 border-${color} shadow-sm octofit-card`}>
                <div className={`card-header bg-${color} text-white`}>
                  {icon} {title}
                </div>
                <div className="card-body p-3">
                  <p className="card-text text-muted small mb-0">{desc}</p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              src={LOGO}
              alt="OctoFit logo"
              className="octofit-navbar-logo"
            />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-1">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">👤 Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">🏆 Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">🏃 Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">📊 Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">💪 Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/users"      element={<Users />} />
          <Route path="/teams"      element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts"   element={<Workouts />} />
        </Routes>
      </main>

      <footer className="octofit-footer">
        <img src={LOGO} alt="" className="octofit-footer-logo" />
        OctoFit Tracker &copy; {new Date().getFullYear()} &mdash; Built with{' '}
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">React</a> &amp;{' '}
        <a href="https://getbootstrap.com" target="_blank" rel="noreferrer">Bootstrap</a>
      </footer>
    </div>
  );
}

export default App;
