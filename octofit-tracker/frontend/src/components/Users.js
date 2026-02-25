import React, { useState, useEffect } from 'react';

function avatarColor(name) {
  const colors = ['primary', 'success', 'danger', 'warning', 'info', 'secondary'];
  const idx = name ? name.charCodeAt(0) % colors.length : 0;
  return colors[idx];
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        const list = Array.isArray(data) ? data : data.results ?? [];
        setUsers(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="octofit-spinner-wrap">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">⚠️</span>
          <span>Failed to load users: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="card octofit-card">
        <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between">
          <span>👤 Users</span>
          <span className="badge bg-white text-primary">{users.length} user{users.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body">
          {users.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <div style={{ fontSize: '3rem' }}>👤</div>
              <p className="mt-2">No users found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user._id || idx}>
                      <td className="text-muted">{idx + 1}</td>
                      <td>
                        <span
                          className={`badge bg-${avatarColor(user.username)} rounded-circle p-2`}
                          style={{ fontSize: '1rem', width: '2rem', height: '2rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          {user.username ? user.username[0].toUpperCase() : '?'}
                        </span>
                      </td>
                      <td className="fw-semibold">{user.username}</td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          {user.email}
                        </a>
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

export default Users;
