import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Skills from "./components/Homepage/Skills"
import Expierence from "./components/Homepage/Timeline"
import Portfolio from './components/Homepage/Portfolio';
import CV from './components/CV/CV';
import TopTracks from './components/Utilities/TopTracks';
import TopTracksList from './components/Utilities/TopTracksList';
import SpotifyCallback from './components/Utilities/SpotifyCallback';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider, LoadingSplash, useLoading, ErrorProvider, ErrorSplash, useError, NotFoundSplash } from './components/Splashscreen/SplashScreen';

export default function App() {
  return <LoadingProvider><ErrorProvider><AppContent /></ErrorProvider></LoadingProvider>
}

function AppContent() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('spotifyToken'));

  const { loading } = useLoading();
  const { error } = useError();

  const toggleTheme = () => {
    console.log("toggleTheme");
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const themeToggleButton = document.querySelector('#theme-toggle');
    if (themeToggleButton) {
      themeToggleButton.addEventListener('click', toggleTheme);
    }

    return () => {
      if (themeToggleButton) {
        themeToggleButton.removeEventListener('click', toggleTheme);
      }
    };
  }, []);

  if (error) {
    <Navbar toggleTheme={toggleTheme} />
    return <ErrorSplash />;
  }
  if (loading) {
    <Navbar toggleTheme={toggleTheme} />
    return <LoadingSplash />;
  }

  return (
    <Router>
      <Navbar toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Expierence />} />
        <Route path="/resume" element={<CV />} />
        <Route path="/projects" element={<Portfolio />} />
        <Route path="/projects/sortihue" element={<TopTracks />} />
        <Route path="/projects/sortihue/result" element={<TopTracksList token={token || ''} />} />
        <Route path="/projects/sortihue/callback" element={<SpotifyCallback onTokenFetched={(token) => { setToken(token); localStorage.setItem('spotifyToken', token); }} />} />
        <Route path="*" element={<NotFoundSplash />} />
      </Routes>
    </Router>
  );
}
