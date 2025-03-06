import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><p>Authenfified</p></ProtectedRoute>} />
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;