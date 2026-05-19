import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tools from './components/Tools';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cinematic-bg text-cinematic-text selection:bg-cinematic-accent selection:text-cinematic-bg">
      <Navbar />
      <main>
        <Hero />
        <Tools />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}

export default App;
