import type { Component } from 'solid-js';
import { Router, Route } from "@solidjs/router"; // <- pastikan kamu import LandingPage
import Portfolio from './pages/Portfolio';

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Portfolio} />
    </Router>
  );
};

export default App;
