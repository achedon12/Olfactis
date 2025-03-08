import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from './providers/AuthProvider';
import {ProtectedRoute} from "./components";
import {Home, Layout, Login, Catalog, NotFound, Items} from "./pages";

const App = () => (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                    <Route path="/catalog" element={<ProtectedRoute><Catalog/></ProtectedRoute>}/>
                    {/* For the admin */}
                    <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
                    {/*<Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />*/}
                    {/*<Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />*/}
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

export default App;