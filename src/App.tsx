import React from 'react';
import './style.sass';
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className="App">
        <div className="header">
          <Header />
        </div>
        <div className="body">
          <Body />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
