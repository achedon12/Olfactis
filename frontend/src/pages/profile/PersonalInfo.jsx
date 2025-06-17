import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import config from "../../providers/apiConfig.js";

const PersonalInfo = ({user, setUser}) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setForm({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '',
                newPassword: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const validatePassword = (pwd) => {
        const errors = [];
        if (pwd.length < 8) errors.push('Au moins 8 caractères');
        if (!/[A-Z]/.test(pwd)) errors.push('Au moins une majuscule');
        if (!/[a-z]/.test(pwd)) errors.push('Au moins une minuscule');
        if (!/[0-9]/.test(pwd)) errors.push('Au moins un chiffre');
        if (!/[^A-Za-z0-9]/.test(pwd)) errors.push('Au moins un caractère spécial');
        return errors;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!form.firstname) newErrors.firstname = 'Firstname required';
        if (!form.lastname) newErrors.lastname = 'Lastname required';
        if (form.newPassword) {
            const pwdErrors = validatePassword(form.newPassword);
            if (pwdErrors.length) newErrors.newPassword = 'Password : ' + pwdErrors.join(', ');
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        try {
            const response = await fetch(`${config.apiBaseUrl}/user/update/${user._id}`, {
                method: 'PUT',
                headers: config.getHeaders(),
                body: JSON.stringify({
                    firstname: form.firstname,
                    lastname: form.lastname,
                    newPassword: form.newPassword || undefined
                })
            });

            if (!response.ok) throw new Error('Erreur lors de la mise à jour du profil');
            const updatedUser = await response.json();
            setUser(updatedUser);
            toast.info('Profil mis à jour avec succès !');
            setEditing(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/auth/reset-password`, {
                method: 'POST',
                headers: config.getHeaders(),
                body: JSON.stringify({email: user.email})
            });

            if (!response.ok) throw new Error('Erreur lors de la réinitialisation du mot de passe');
            const data = await response.json();
            toast.info(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const resendVerificationEmail = async () => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/user/resendVerificationEmail`, {
                method: 'POST',
                headers: config.getHeaders(),
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

    const handleUnsubscribeNewsletter = async (state = true) => {
        console.log('Unsubscribe from newsletter:', state);
        try {
            const response = await fetch(`${config.apiBaseUrl}/user/${user._id}/newsletter`, {
                method: 'PUT',
                headers: config.getHeaders(),
                body: JSON.stringify({
                    newsletter: state
                })
            });
            const data = await response.json();
            if (response.ok) {
                toast.info(`You have successfully ${state ? 'subscribed to' : 'unsubscribed from'} the newsletter!`);
                setUser(prev => ({...prev, newsletter: state}));
            } else {
                throw new Error(data.message || 'Failed to update newsletter preference');
            }
        } catch (error) {
            toast.error(`Error unsubscribing from newsletter: ${error.message}`);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
            console.log('Suppression du compte demandée');
        }
    };

    const formatDate = dateString => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    return (
        <div className="bg-white rounded-sm overflow-hidden w-full h-full">
            <div className="bg-tertiary p-4 text-white flex items-center justify-between">
                <h2 className="text-xl font-semibold">Personal informations</h2>
                <button className={`text-white ${editing ? 'hidden' : 'block'} hover:underline hover:cursor-pointer`}
                        onClick={() => setEditing(true)}>
                    Edit
                </button>
            </div>
            <div className="p-6">
                {editing ? (
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Firstname</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={form.firstname}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.firstname && <p className="text-red-500 text-xs">{errors.firstname}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lastname</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={form.lastname}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Empty if you don't want to change it"
                            />
                            {errors.newPassword && <p className="text-red-500 text-xs">{errors.newPassword}</p>}
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
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Firstname</p>
                                <p className="font-medium">{user.firstname}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Lastname</p>
                                <p className="font-medium">{user.lastname}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mt-5">Account Status</p>
                            {user.verified_at ? (
                                <p className="text-sm text-green-600">Verified
                                    on {formatDate(user.verified_at)}</p>
                            ) : (
                                <>
                                    <p className="text-sm text-red-600">Not verified</p>
                                    <button
                                        onClick={resendVerificationEmail}
                                        className="btn btn-secondary text-white mt-5"
                                    >
                                        Resend Verification Email
                                    </button>
                                </>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mt-5">Newsletter Subscription</p>
                            <p className="text-sm text-gray-700">
                                {user.newsletter ? 'Subscribed' : 'Not Subscribed'}
                            </p>
                            <div className={"mt-5"}>
                                {user.newsletter ? (
                                    <button
                                        onClick={() => handleUnsubscribeNewsletter(false)}
                                        className="btn btn-secondary text-white hover:bg-gray-700"
                                    >
                                        Unsubscribe from Newsletter
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleUnsubscribeNewsletter(true)}
                                        className="btn btn-secondary text-white hover:bg-gray-700"
                                    >
                                        Subscribe to Newsletter
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-10">
                            <button
                                onClick={handleResetPassword}
                                className="btn btn-accent "
                            >
                                Reset password
                            </button>
                            <button
                                onClick={handleDelete}
                                className="btn btn-error text-white hover:bg-red-700"
                            >
                                Delete account
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PersonalInfo;