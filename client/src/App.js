import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import TaskPage from './pages/Task';
import Navigation from './components/Navigation';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navigation />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route
              path="/tasks"
              element={<TaskPage setLoading={setLoading} />}
            />
            <Route path="/:projectId" element={<TaskPage setLoading={setLoading} />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;