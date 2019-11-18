import React from 'react';
import './App.scss';

// components
import SortVisualiser from './components/SortVisualiser';

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  public render() {
    return (
      <div className="App">
        <div className="layout">
          <header>
            <h1>Sorting Algorithm Visualiser</h1>
            <p>
              A tool to help better understand how sorting algorithms work. Use
              the control panel below to choose between different algorithms,
              you can also alter the speed of the animations and the number of
              items to be sorted.{' '}
            </p>
          </header>
          <main>
            <SortVisualiser />
          </main>
          <footer>
            <p>
              Made with <i className="fas fa-heart" /> in Melbourne, Australia
            </p>
            <p>Copyright © 2019 Josh Nelsson-Smith</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
