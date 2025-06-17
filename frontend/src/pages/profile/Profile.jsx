import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from "../../components/index.js";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import Tabs from "./Tabs";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loans, setLoans] = useState([]);
    const [loansReturned, setLoansReturned] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const localUser = JSON.parse(localStorage.getItem('user') || '{}');
                if (!localUser || !localUser._id) {
                    toast.error('Utilisateur introuvable. Veuillez vous reconnecter.');
                    navigate('/login');
                    return;
                }
                setUser(localUser);
                setLoans(JSON.parse(localStorage.getItem('loans')) || []);
                setLoansReturned(JSON.parse(localStorage.getItem('loansReturned')) || []);
                setBookings(JSON.parse(localStorage.getItem('bookings')) || []);
            } catch (error) {
                toast.error(`Erreur: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') loadData();
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [navigate]);

    if (loading) return <Loader />;
    if (!user) {
        return (
            <div className="text-center mt-10 text-red-600">
                <p>Erreur lors du chargement des données du profil.</p>
                <p>Veuillez réessayer plus tard ou contacter le support.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <PersonalInfo
                        user={user}
                        setUser={setUser}
                    />
                </div>
                <div className="lg:col-span-2">
                    <Tabs
                        user={user}
                        loans={loans}
                        loansReturned={loansReturned}
                        bookings={bookings}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;