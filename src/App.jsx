
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import WeatherPage from './sandbox/WeatherPage';
import DashboardRouter from './context/DashboardRouter';
import Logout from './context/Logout';
import AuthGuard from './context/AuthGuard';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;