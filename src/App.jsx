import React, { useState, useEffect } from 'react';
import './App.css'
import * as replit from '@replit/extensions';
import Home from "./Home.jsx"

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const replitHandshake = async () => {
    try {
      await replit.init({ 
        permissions: [
          "writeFile",
          "readFile",
          "readDirectory",
          "createDirectory",
          "readReplInfo",
          "readUserInfo"
        ] 
      });
      setIsConnected(true);
    } catch (error) {
      setError(error);
    }
  }


  useEffect(() => {
    replitHandshake();
  }, []);

  return (
    <main>
      <div>
        <div>
          {error ? (
            <>
              <div className="error">Error: {error.message ?? error}</div>
              {error.message === "timeout" && (
                <div>Note: Make sure to open this URL as an Extension, not a Webview</div>
              )}
            </>
          ) : (
            <div>{isConnected ?
              <>
              <Home />
              </> : 'Connecting...'}</div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;