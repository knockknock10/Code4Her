import React, { useState, useEffect } from 'react';
import { getIncidents } from '../utils/incidentStore';

const IncidentLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(getIncidents().reverse());
  }, []);

  if (logs.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem', color: '#64748b' }}>
        <p>No incidents recorded.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Incident History</h2>
      {logs.map((log) => (
        <div key={log.id} className="card log-item">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold' }}>{new Date(log.timestamp).toLocaleString()}</span>
            <span style={{ color: '#ef4444', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {log.triggerType.replace('_', ' ')}
            </span>
          </div>
          
          {log.location ? (
            <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              📍 <strong>Location:</strong> <a href={`https://maps.google.com/?q=${log.location.lat},${log.location.lng}`} target="_blank" rel="noreferrer">Open in Maps</a> (Lat: {log.location.lat.toFixed(4)}, Lng: {log.location.lng.toFixed(4)})
            </p>
          ) : (
            <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>📍 <strong>Location:</strong> Unavailable</p>
          )}

          <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: log.recordingIndicator ? '#2563eb' : '#64748b' }}>
            🎙️ <strong>Recording Status:</strong> {log.recordingIndicator ? 'Audio Captured' : 'Not Recorded'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default IncidentLog;
