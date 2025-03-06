import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginButton from "./components/LoginButton.jsx";

const App = () => {
    const {isAuthenticated} = false;

    return (
        <Router>
            <div>
                {isAuthenticated ? (
                    <Routes>
                        <Route path="/" element={<p>Authentifié !</p>}/>
                    </Routes>
                ) : (
                    <LoginButton/>
                )}
            </div>
        </Router>
    );
};

export default App;