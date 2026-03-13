import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { getCurrentLocation } from '../utils/locationService';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// A component to recenter the map when location updates
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const SafetyMap = () => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated nearby safety zones (hospitals/police)
  const safeZones = position ? [
    { id: 1, type: 'Hospital', lat: position.lat + 0.005, lng: position.lng + 0.005, name: 'City General Hospital' },
    { id: 2, type: 'Police', lat: position.lat - 0.004, lng: position.lng - 0.003, name: 'Local Police Precinct' },
  ] : [];

  useEffect(() => {
    getCurrentLocation()
      .then(loc => {
        setPosition({ lat: loc.lat, lng: loc.lng });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Map location error:", err);
        // Default to a fallback location (e.g., city center)
        setPosition({ lat: 40.7128, lng: -74.0060 });
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading map...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Safety Map</h2>
      <div style={{ borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <MapContainer center={[position.lat, position.lng]} zoom={14} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap lat={position.lat} lng={position.lng} />
          
          <Marker position={[position.lat, position.lng]}>
            <Popup>You are here</Popup>
          </Marker>

          {safeZones.map(zone => (
            <Marker 
              key={zone.id} 
              position={[zone.lat, zone.lng]}
              icon={L.icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              })}
            >
              <Popup>
                <strong>{zone.type}</strong><br/>
                {zone.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
        <p>🟢 Green markers indicate nearby Police Stations and Hospitals.</p>
      </div>
    </div>
  );
};

export default SafetyMap;
