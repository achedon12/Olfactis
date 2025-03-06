import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Home, Login, Material } from "./pages";
const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/material" element={<ProtectedRoute><Material /></ProtectedRoute>} />
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;