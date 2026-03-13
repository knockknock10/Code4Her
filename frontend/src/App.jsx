import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding.jsx';
import HiddenHome from './components/HiddenHome.jsx';
import IncidentLog from './components/IncidentLog.jsx';
import SafetyMap from './components/SafetyMap.jsx';
import Settings from './components/Settings.jsx';
import { getCurrentLocation } from './utils/locationService.js';
import { saveIncident } from './utils/incidentStore.js';
import { Map, List, Settings as SettingsIcon, Home } from 'lucide-react';

const App = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [userConfig, setUserConfig] = useState(null);

  useEffect(() => {
    const config = localStorage.getItem('safenest_config');
    if (config) {
      setUserConfig(JSON.parse(config));
      setIsConfigured(true);
    }
  }, []);

  const handleConfigComplete = (config) => {
    localStorage.setItem('safenest_config', JSON.stringify(config));
    setUserConfig(config);
    setIsConfigured(true);
  };

  const triggerEmergency = async (triggerType) => {
    if (emergencyMode) return; // Prevent multiple triggers
    setEmergencyMode(true);
    
    const incidentRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      triggerType: triggerType,
      location: null,
      recordingIndicator: false,
    };

    try {
      const loc = await getCurrentLocation();
      incidentRecord.location = loc;
    } catch (e) {
      console.warn('Could not fetch location', e);
    }

    // Optional: audio recording simulation
    if (userConfig?.features?.audioRecording) {
      incidentRecord.recordingIndicator = true;
    }

    saveIncident(incidentRecord);

    // Simulate sending alerts
    if (userConfig?.contacts?.length > 0) {
      console.log('SIMULATED SMS SENT TO:', userConfig.contacts);
    }

    // Auto-hide emergency overlay after 5 seconds to remain discreet
    setTimeout(() => setEmergencyMode(false), 5000);
  };

  if (!isConfigured) {
    return <Onboarding onComplete={handleConfigComplete} />;
  }

  return (
    <div className="app-container">
      {emergencyMode && (
        <div className="emergency-overlay">
          <h1>🚨 EMERGENCY ALERT ACTIVATED 🚨</h1>
          <p>Location captured. Contacts notified.</p>
          {userConfig?.features?.audioRecording && <p>🎙️ Audio recording started...</p>}
        </div>
      )}

      <div className="content-area">
        {activeTab === 'home' && <HiddenHome onTrigger={triggerEmergency} triggerConfig={userConfig.trigger} />}
        {activeTab === 'incidents' && <IncidentLog />}
        {activeTab === 'map' && <SafetyMap />}
        {activeTab === 'settings' && <Settings config={userConfig} onUpdate={handleConfigComplete} />}
      </div>

      <nav className="bottom-nav">
        <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <Home className="nav-icon" size={24} />
          <span>Home</span>
        </button>
        <button className={`nav-item ${activeTab === 'incidents' ? 'active' : ''}`} onClick={() => setActiveTab('incidents')}>
          <List className="nav-icon" size={24} />
          <span>Log</span>
        </button>
        <button className={`nav-item ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>
          <Map className="nav-icon" size={24} />
          <span>Map</span>
        </button>
        <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          <SettingsIcon className="nav-icon" size={24} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
