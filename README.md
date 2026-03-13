# SafeNest - Discreet Domestic Safety Assistant

SafeNest is a completely disguised, stealth-first web application designed to help individuals in domestic distress situations silently request help. Disguised as a typical utilities app (Calculator or Notes), it features a suite of hidden triggers that discretely switch the app into Emergency Mode.

## Features

- **Disguised Interface**: Appears as a fully functional generic Notes or Calculator app.
- **Hidden Triggers**: 
  - **Secret Passcode**: Entered via the calculator.
  - **Shake Gesture**: Detects violent shaking using the DeviceMotion API.
  - **Tap Pattern**: Hidden screen tap sequences (e.g., 5 rapid taps).
- **Emergency Mode**: Automatically grabs GPS location, logs the incident, and simulates sending emergency SMS alerts to trusted contacts.
- **Incident Log**: Encoded (Base64) incident timeline to prevent easy access to sensitive data.
- **Safety Map**: Embedded map showing current location and nearest safety zones (Hospitals, Police stations).
- **Fully Local MVP**: Uses localStorage to run smoothly offline and persistently.

## Architecture & Tech Stack

- **Frontend**: React (18), Vite, Lucide-React, React-Leaflet
- **Backend**: Node.js, Express (For mock alert simulation and serving static files)
- **Deployment**: Configured to be run concurrently for easy MVP/Hackathon presentations.

## How to Run Locally

### Prerequisites
- Node.js (v16+)
- npm 

### Installation & Setup

1. **Install all dependencies**
   \`\`\`sh
   npm install
   \`\`\`

2. **Start the Development Server** (Frontend + Backend)
   \`\`\`sh
   npm run dev
   \`\`\`

3. **View the App**
   Open your browser to [http://localhost:5173](http://localhost:5173).

## Demo Instructions

1. Start the app for the first time. You will be greeted with the Onboarding flow.
2. Select your trigger type (e.g., Secret Passcode: "1234").
3. Add a mock trusted contact and enable Location/Recording features.
4. Reach the disguised app screen.
5. In the Calculator mode, type `1234` OR use your selected trigger (Shake/Tap).
6. **Emergency Mode** activates seamlessly. An overlay appears indicating location capturing and mock SMS dispatch.
7. Afterwards, explore the **Incident Log** to view the timeline of the alert.
8. Explore the **Safety Map** to see emergency zones.

## Future Improvements

- Proper Database and Authentication (Firebase/Supabase)
- Real SMS Integration with Twilio API
- Actual Audio Recording Pipeline to Cloud Storage
- Native Mobile Packaging via React Native or Capacitor for background execution
