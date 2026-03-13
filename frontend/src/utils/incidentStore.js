const DB_KEY = 'safenest_incidents';

export const saveIncident = (incident) => {
  const incidents = getIncidents();
  // Encode incident data with Base64 for security MVP
  const encoded = btoa(JSON.stringify(incident));
  incidents.push(encoded);
  localStorage.setItem(DB_KEY, JSON.stringify(incidents));
};

export const getIncidents = () => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) return [];
  
  try {
    const encodedList = JSON.parse(data);
    return encodedList.map(item => JSON.parse(atob(item)));
  } catch (e) {
    console.error('Failed to parse incidents', e);
    return [];
  }
};
