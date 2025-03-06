import { useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const { register, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegister) {
            try {
                await register(firstname, lastname, email, password);
                navigate('/');
            } catch (error) {
                console.error('Failed to register:', error);
            }
        } else {
            try {
                await login(email, password);
                navigate('/');
            } catch (error) {
                console.error('Failed to login:', error);
            }
        }
    };

    return (
        <div className={'w-full h-screen flex flex-col items-center justify-center bg-pink-900'}>
            <h1>OLFACTIS</h1>
            <form onSubmit={handleSubmit} className={'bg-white px-4 md:px-8 w-3/4 md:w-1/4'}>
                <h2 className={'text-center mt-6 mb-8'}>Bienvenue</h2>
                {isRegister && (
                    <>
                        <input type="text"
                               placeholder="Prénom"
                               value={firstname}
                               onChange={(e) => setFirstname(e.target.value)}
                               required
                               className={'w-full p-2 my-2 bg-pink-300'}
                        />
                        <input type="text"
                               placeholder="Nom"
                               value={lastname}
                               onChange={(e) => setLastname(e.target.value)}
                               required
                               className={'w-full p-2 my-2 bg-pink-300'}
                        />
                    </>
                )}
                <input type="email"
                       placeholder="Email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                       className={'w-full p-2 my-2 bg-pink-300'}
                />
                <input type="password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                       className={'w-full p-2 my-2 bg-pink-300'}
                />
                <div className={'flex justify-center items-center flex-col my-6'}>
                    <button type="submit" className={'w-1/3 p-2 my-2 bg-pink-500 text-white cursor-pointer'}>
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                    <p>
                        {isRegister ? 'Vous avez déjà un compte ? ' : 'Vous n\'avez pas de compte ? '}
                        <a onClick={() => setIsRegister(!isRegister)} className={'text-pink-400 cursor-pointer'}>
                            {isRegister ? 'Connectez-vous' : 'Inscrivez-vous'}
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;