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
      <h2>Incident History</h2>
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
              📍 Lat: {log.location.lat.toFixed(4)}, Lng: {log.location.lng.toFixed(4)}
            </p>
          ) : (
            <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>📍 Location unavailable</p>
          )}

          {log.recordingIndicator && (
            <p style={{ fontSize: '0.9rem', color: '#2563eb', marginBottom: 0 }}>
              🎙️ Audio successfully recorded
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default IncidentLog;
