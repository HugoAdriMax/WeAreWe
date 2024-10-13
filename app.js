import React from 'react';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div>
      {/* Ton application React */}
      <h1>Bienvenue sur mon site</h1>

      {/* Intégrer Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
