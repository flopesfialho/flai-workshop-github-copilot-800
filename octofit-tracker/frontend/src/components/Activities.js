import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        const list = Array.isArray(data) ? data : data.results ?? [];
        setActivities(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
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
          <p className="mt-3">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">⚠️</span>
          <span>Failed to load activities: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="card octofit-card">
        <div className="card-header bg-success text-white d-flex align-items-center justify-content-between">
          <span>🏃 Activities</span>
          <span className="badge bg-white text-success">{activities.length} record{activities.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body">
          {activities.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <div style={{ fontSize: '3rem' }}>🏃</div>
              <p className="mt-2">No activities found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Activity Type</th>
                    <th>Duration</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, idx) => (
                    <tr key={activity._id || idx}>
                      <td className="text-muted">{idx + 1}</td>
                      <td>
                        <span className="fw-semibold">
                          {typeof activity.user === 'object' ? activity.user.username : activity.user}
                        </span>
                      </td>
                      <td>
                        <span className="activity-type-badge">{activity.activity_type}</span>
                      </td>
                      <td>
                        <span className="duration-badge">{activity.duration} min</span>
                      </td>
                      <td>{activity.date}</td>
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

export default Activities;
