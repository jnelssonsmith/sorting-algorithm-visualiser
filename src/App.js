import React from 'react';
import logo from './logo.svg';
import './App.css';

import SortVisualiser from './components/SortVisualiser';


const getRandomArr = (length) => {
  return Array.apply(null, Array(length)).map(function() { return Math.floor(Math.random() * 70) + 30; })
}

function App() {
  const items = getRandomArr(20);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Test</h1>
      </header>
      <main>
        <SortVisualiser items={items}></SortVisualiser>
      </main>
    </div>
  );
}

export default App;
