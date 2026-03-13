import React from 'react';

const Settings = ({ config, onUpdate }) => {
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data and setup?")) {
      localStorage.removeItem('safenest_config');
      localStorage.removeItem('safenest_incidents');
      window.location.reload();
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Settings</h2>
      
      <div className="card">
        <h3>Current Configuration</h3>
        <p><strong>Trigger:</strong> {config.trigger.type.replace('_', ' ')}</p>
        <p><strong>Location Sharing:</strong> {config.features.locationSharing ? 'Enabled' : 'Disabled'}</p>
        <p><strong>Audio Recording:</strong> {config.features.audioRecording ? 'Enabled' : 'Disabled'}</p>
        
        <h4 style={{ marginTop: '1rem' }}>Trusted Contacts:</h4>
        {config.contacts.map((c, i) => (
          <div key={i} style={{ padding: '0.25rem 0' }}>• {c.name} ({c.phone})</div>
        ))}
        {config.contacts.length === 0 && <p>No contacts configured.</p>}
      </div>

      <button className="btn btn-danger" onClick={handleReset} style={{ marginTop: '2rem' }}>
        Reset Setup & Delete Data
      </button>
    </div>
  );
};

export default Settings;
