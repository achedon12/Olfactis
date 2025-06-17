import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from './providers/AuthProvider';
import {ProtectedRoute} from "./components";
import {Home, Layout, Login, Catalog, NotFound, Items, UpdateItem, ItemDetail, Profile, Bookings, Users, Loans, LoansHistory} from "./pages";

const App = () => (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                    <Route path="/catalog" element={<ProtectedRoute><Catalog/></ProtectedRoute>}/>
                    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>

                    {/* For the admin */}
                    <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
                    <Route path="/item/update/:id?" element={<ProtectedRoute><UpdateItem /></ProtectedRoute>} />
                    <Route path="/item/:id" element={<ProtectedRoute><ItemDetail /></ProtectedRoute>} />
                    <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
                    <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                    <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />
                    <Route path="/loansHistory" element={<ProtectedRoute><LoansHistory /></ProtectedRoute>} />
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

export default App;