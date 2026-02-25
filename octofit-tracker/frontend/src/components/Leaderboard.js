import React, { useState, useEffect } from 'react';

const RANK_CLASSES = ['gold', 'silver', 'bronze'];
const RANK_LABELS  = ['🥇', '🥈', '🥉'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        const list = Array.isArray(data) ? data : data.results ?? [];
        setEntries(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="octofit-spinner-wrap">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">⚠️</span>
          <span>Failed to load leaderboard: {error}</span>
        </div>
      </div>
    );
  }

  const sorted = entries.slice().sort((a, b) => b.points - a.points);

  return (
    <div className="container mt-4 mb-5">
      <div className="card octofit-card">
        <div className="card-header bg-warning text-dark d-flex align-items-center justify-content-between">
          <span>📊 Leaderboard</span>
          <span className="badge bg-dark text-warning">{sorted.length} team{sorted.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body">
          {sorted.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <div style={{ fontSize: '3rem' }}>📊</div>
              <p className="mt-2">No leaderboard entries found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((entry, idx) => (
                    <tr key={entry._id || idx}>
                      <td>
                        <span className={`rank-badge ${RANK_CLASSES[idx] || ''}`}>
                          {RANK_LABELS[idx] || idx + 1}
                        </span>
                      </td>
                      <td className="fw-semibold">
                        {typeof entry.team === 'object' ? entry.team.name : entry.team}
                      </td>
                      <td>
                        <span className="points-badge">{entry.points} pts</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
