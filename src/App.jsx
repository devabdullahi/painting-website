import React from 'react';
import './App.css'; // Include your custom styles here (optional)
import PaintingCanvas from './components/PaintingCanvas';

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Digital Painting Studio</h1>
      </header>
      <main>
        <PaintingCanvas />
      </main>
    </div>
  );
};

export default App;
