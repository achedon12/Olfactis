import {useState, useContext} from 'react';
import {AuthContext} from '../providers/AuthProvider';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const {register, login} = useContext(AuthContext);
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
        <>
            {/*<img src={'/logo.svg'} alt={'logo'} className={'w-2/4 md:w-2/5 absolute right-50 top-0'}/>*/}
            <div className={'w-full h-screen flex flex-col items-center justify-center bg-tertiary'}>
                <h1 className={'text-white text-[3rem] my-4'}>OLFACTIS</h1>
                <form onSubmit={handleSubmit} className={'bg-primary px-4 md:px-8 w-5/6 md:w-1/4'}>
                    <h2 className={'text-center mt-6 mb-8 text-xl'}>Bienvenue</h2>
                    {isRegister && (
                        <>
                            <input type="text"
                                   placeholder="Prénom"
                                   value={firstname}
                                   onChange={(e) => setFirstname(e.target.value)}
                                   required
                                   className={'w-full p-2 my-2 bg-input-color placeholder-white text-text-color focus:outline-quaternary'}
                            />
                            <input type="text"
                                   placeholder="Nom"
                                   value={lastname}
                                   onChange={(e) => setLastname(e.target.value)}
                                   required
                                   className={'w-full p-2 my-2 bg-input-color placeholder-white text-text-color focus:outline-quaternary'}
                            />
                        </>
                    )}
                    <input type="email"
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                           className={'w-full p-2 my-2 bg-input-color placeholder-white text-text-color focus:outline-quaternary'}
                    />
                    <input type="password"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                           className={'w-full p-2 my-2 bg-input-color placeholder-white text-text-color focus:outline-quaternary'}
                    />
                    <div className={'flex justify-center items-center flex-col my-6'}>
                        <button type="submit"
                                className={'w-2/5 p-2 my-2 bg-quaternary text-white text-xl cursor-pointer'}>
                            {isRegister ? 'Register' : 'Login'}
                        </button>
                        <p className={'text-center my-4 text-sm'}>
                            {isRegister ? 'Vous avez déjà un compte ? ' : 'Vous n\'avez pas de compte ? '}
                            <a onClick={() => setIsRegister(!isRegister)} className={'text-quaternary cursor-pointer'}>
                                {isRegister ? 'Connectez-vous' : 'Inscrivez-vous'}
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;