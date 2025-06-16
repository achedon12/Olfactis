import {useEffect, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import config from "../../providers/apiConfig.js";
import star from '../../assets/star.svg';
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loans, setLoans] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('current'); // 'current', 'bookings',  'history',
    const [form, setForm] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setUser(JSON.parse(localStorage.getItem('user')) || null);
            setLoans(JSON.parse(localStorage.getItem('loans')) || []);
            setBookings(JSON.parse(localStorage.getItem('bookings')) || []);
            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        if (user) {
            setForm({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '',
                newPassword: ''
            });
        }
    }, [user])

    const validatePassword = (pwd) => {
        const errors = [];
        if (pwd.length < 8) errors.push('At least 8 characters');
        if (!/[A-Z]/.test(pwd)) errors.push('At least one majuscule');
        if (!/[a-z]/.test(pwd)) errors.push('At least one minuscule');
        if (!/[0-9]/.test(pwd)) errors.push('At least one number');
        if (!/[^A-Za-z0-9]/.test(pwd)) errors.push('At least one special character');
        return errors;
    };

    const handleEdit = () => setEditing(true);

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSave = e => {
        e.preventDefault();
        const newErrors = {};
        if (!form.firstname) newErrors.firstname = 'Firstname required';
        if (!form.lastname) newErrors.lastname = 'Lastname required';
        if (form.newPassword) {
            const pwdErrors = validatePassword(form.newPassword);
            if (pwdErrors.length) newErrors.newPassword = 'Password: ' + pwdErrors.join(', ');
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        setTimeout(() => {
            setUser({
                ...user,
                firstname: form.firstname,
                lastname: form.lastname,
                email: form.email
            });
            //TODO: update user
            setEditing(false);
            toast.info('Profile updated successfully!');
        }, 500);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            console.log('Account deletion requested');
        }
    };

    const formatDate = dateString => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    const currentLoans = loans.filter(loan => {
        const today = new Date();
        const startDate = new Date(loan.start_date);
        const endDate = loan.end_date ? new Date(loan.end_date) : null;
        return startDate <= today && (!endDate || endDate >= today);
    });

    const pastLoans = loans.filter(loan => {
        const today = new Date();
        const startDate = new Date(loan.start_date);
        const endDate = loan.end_date ? new Date(loan.end_date) : null;
        return endDate && endDate < today;
    });

    const handleUpgradeSubscription = () => {
        //TODO: Simulate an upgrade process
        toast.info('Upgrade process initiated. Please contact support for assistance.');
    }

    const handleResetPassword = async () => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/auth/reset-password`, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify({
                    email: user.email,
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.info(data.message);
            } else {
                throw new Error(data.error || 'Failed to reset password');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    }

    const resendVerificationEmail = async () => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/user/resendVerificationEmail`, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify({
                    email: user.email,
                })
            });

            const data = await response.json();
            if (response.ok) {
                toast.info('Verification email sent successfully!');
            } else {
                throw new Error(data.message || 'Failed to send verification email');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center mt-10 text-red-600">
                <p>Error loading profile data.</p>
                <p>Please try again later or contact support.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
                <div className="text-sm text-gray-500">
                    Subscription: <span className="font-medium capitalize">{user.subscription.name}</span>
                    {user?.subscription?.name !== 'admin' && (
                        <div
                            className="hover:cursor-pointer inline-flex items-center group transition-all duration-300 ml-4 hover:cursor-pointer">
                            <button
                                onClick={handleUpgradeSubscription}
                                className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-full px-4 py-2 transition-all duration-300 w-10 group-hover:w-48 overflow-hidden shadow-lg"
                                style={{minWidth: '2.5rem'}}
                            >
                                <img src={star} alt="star" className="w-6 h-6 flex-shrink-0"/>
                                <span
                                    className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Upgrade Subscription
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="bg-blue-600 p-4 text-white">
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                        </div>

                        <div className="p-6">
                            {editing ? (
                                <form onSubmit={handleSave} className="space-y-4">
                                    <div className="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0">
                                        <div className="flex-1">
                                            <label
                                                className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                            <input
                                                type="text"
                                                name="firstname"
                                                value={form.firstname}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            {errors.firstname &&
                                                <p className="text-red-500 text-xs">{errors.firstname}</p>}
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                            <input
                                                type="text"
                                                name="lastname"
                                                value={form.lastname}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            {errors.lastname &&
                                                <p className="text-red-500 text-xs">{errors.lastname}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            disabled
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de
                                            passe</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={form.newPassword}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Laisser vide pour ne pas changer"
                                        />
                                        {errors.newPassword &&
                                            <p className="text-red-500 text-xs">{errors.newPassword}</p>}
                                    </div>
                                    <div className="flex space-x-3 pt-2">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditing(false)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="space-y-3 relative">
                                        <div className="absolute top-0.5 right-0.5">
                                            <button
                                                onClick={handleEdit}
                                                className="hover:cursor-pointer text-blue-600 hover:text-blue-800 transition"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth={2}
                                                          d="M16.862 4.487l2.121 2.121a2.828 2.828 0 010 4l-9.192 9.192a2.828 2.828 0 01-1.414.586l-3.536.354a1 1 0 01-1.11-1.11l.354-3.536a2.828 2.828 0 01.586-1.414l9.192-9.192a2.828 2.828 0 014-4z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Firstname</p>
                                            <p className="font-medium">{user.firstname}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Firstname</p>
                                            <p className="font-medium">{user.lastname}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Account Status</p>
                                            {user.verified_at ? (
                                                <p className="text-sm text-green-600">Verified
                                                    on {formatDate(user.verified_at)}</p>
                                            ) : (
                                                <button
                                                    onClick={resendVerificationEmail}
                                                    className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                                >
                                                    Resend Verification Email
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex space-x-3 mt-6">
                                        <button
                                            onClick={handleResetPassword}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                        >
                                            Reset Password
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-150">
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px">
                                <button
                                    onClick={() => setActiveTab('current')}
                                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'current' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    Current Reservations
                                    {currentLoans.length > 0 && (
                                        <span
                                            className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {currentLoans.length}
                                        </span>
                                    )}
                                </button>

                                <button
                                    onClick={() => setActiveTab('bookings')}
                                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'bookings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    Booking History
                                    {bookings.length > 0 && (
                                        <span
                                            className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {bookings.length}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('history')}
                                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    Reservation History
                                </button>
                            </nav>
                        </div>

                        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                            {activeTab === 'current' && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Your Current
                                        Reservations</h3>
                                    {currentLoans.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">You don't have any current reservations.</p>
                                            <button
                                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
                                                onClick={()=>navigate('/catalog')}>
                                                Browse Equipment
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {currentLoans.map(loan => (
                                                <div key={loan.id}
                                                     className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{loan.item.name}</h4>
                                                            <p className="text-sm text-gray-500">{loan.item.category}</p>
                                                        </div>
                                                        <span
                                                            className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                                                            Ongoing
                                                        </span>
                                                    </div>
                                                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-gray-500">Start Date</p>
                                                            <p>{formatDate(loan.start_date)}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">End Date</p>
                                                            <p>{formatDate(loan.end_date)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 flex space-x-3">
                                                        <button className="text-sm text-blue-600 hover:text-blue-800">
                                                            Extend Reservation
                                                        </button>
                                                        <button className="text-sm text-gray-600 hover:text-gray-800">
                                                            Cancel Reservation
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'history' && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Your Reservation History</h3>
                                    {pastLoans.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">Your reservation history is empty.</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                {pastLoans.map(loan => (
                                                    <tr key={loan.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div
                                                                className="font-medium text-gray-900">{loan.item.name}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{loan.item.category}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div
                                                                className="text-gray-900">{formatDate(loan.start_date)}</div>
                                                            <div
                                                                className="text-gray-500">to {formatDate(loan.end_date)}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                <span
                                                                    className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                                                    Returned
                                                                </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'bookings' && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Your Booking History</h3>
                                    {bookings.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">Your reservation history is empty.</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                {bookings.map(booking => (
                                                    <tr key={booking.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div
                                                                className="font-medium text-gray-900">{booking.item.name}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.item.category}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div
                                                                className="text-gray-900">{formatDate(booking.start_date)}</div>
                                                            <div
                                                                className="text-gray-500">to {formatDate(booking.end_date)}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                <span
                                                                    className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                                                    Returned
                                                                </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Profile;