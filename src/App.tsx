/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './screens/Home';
import AreasExplorer from './screens/AreasExplorer';
import MapView from './screens/MapView';
import WardenDashboard from './screens/WardenDashboard';
import WardenPortal from './screens/WardenPortal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/areas" element={<AreasExplorer />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/dashboard" element={<WardenDashboard />} />
        <Route path="/management" element={<WardenPortal />} />
      </Routes>
    </Router>
  );
}

