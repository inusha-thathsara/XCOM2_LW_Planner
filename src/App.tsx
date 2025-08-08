import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SquadProvider } from './contexts/SquadContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import SquadBuilder from './pages/SquadBuilder';
import MissionPlanner from './pages/MissionPlanner';
import SquadOverview from './pages/SquadOverview';
export function App() {
  return <Router>
      <ThemeProvider>
        <SquadProvider>
          <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6">
              <Routes>
                {/* Dashboard as the homepage */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/squad-builder" element={<SquadBuilder />} />
                <Route path="/mission-planner" element={<MissionPlanner />} />
                <Route path="/squad-overview/:squadId" element={<SquadOverview />} />
                {/* Redirect any unknown routes to the Dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </SquadProvider>
      </ThemeProvider>
    </Router>;
}