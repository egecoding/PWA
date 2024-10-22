import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the default mini-info bar from appearing
      event.preventDefault();
      // Save the event to trigger later
      setInstallPrompt(event);
    });
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt(); // Show the installation prompt
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setInstallPrompt(null); // Clear the saved prompt
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Progressive Web App</h1>
        {installPrompt && (
          <button onClick={handleInstallClick}>Install PWA</button>
        )}
      </header>
    </div>
  );
}

export default App;

