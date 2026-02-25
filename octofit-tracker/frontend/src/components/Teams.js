import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        const list = Array.isArray(data) ? data : data.results ?? [];
        setTeams(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="octofit-spinner-wrap">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">⚠️</span>
          <span>Failed to load teams: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="card octofit-card">
        <div className="card-header bg-info text-dark d-flex align-items-center justify-content-between">
          <span>🏆 Teams</span>
          <span className="badge bg-dark text-info">{teams.length} team{teams.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <div style={{ fontSize: '3rem' }}>🏆</div>
              <p className="mt-2">No teams found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Members</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => {
                    const memberList = Array.isArray(team.members)
                      ? team.members.map((m) => (typeof m === 'object' ? m.username : m))
                      : [];
                    return (
                      <tr key={team._id || idx}>
                        <td className="text-muted">{idx + 1}</td>
                        <td className="fw-semibold">{team.name}</td>
                        <td>
                          {memberList.length > 0 ? (
                            memberList.map((name, i) => (
                              <span key={i} className="badge bg-secondary me-1">{name}</span>
                            ))
                          ) : (
                            <span className="text-muted fst-italic">No members</span>
                          )}
                        </td>
                        <td>
                          <span className="badge bg-primary">{memberList.length}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
