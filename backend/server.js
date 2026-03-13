import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock API endpoint for simulating SMS sending
app.post('/api/alert', (req, res) => {
  const { contacts, location, triggerType } = req.body;
  console.log('--- EMERGENCY ALERT TRIGGERED ---');
  console.log(`Trigger: ${triggerType}`);
  console.log(`Location: Lat ${location?.lat}, Lng ${location?.lng}`);
  console.log('Notifying Contacts:', contacts);
  
  res.json({ success: true, message: 'Alerts simulated successfully' });
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`SafeNest Backend Server running on http://localhost:${PORT}`);
});
