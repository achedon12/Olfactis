import { Link } from 'react-router-dom';
import { User } from '@phosphor-icons/react';

const Navbar = () => {
    return (
        <nav className={'bg-tertiary w-full h-16 border-b-1 border-primary flex items-center justify-between px-8'}>
            <div className={'flex space-x-8'}>
                <Link to="/material" className={'text-white text-lg cursor-pointer'}>
                    MATERIEL
                </Link>
                <Link to="/reservations" className={'text-white text-lg cursor-pointer'}>
                    RESERVATIONS
                </Link>
            </div>
            <div>
                <User size={26} className={'text-primary cursor-pointer'} />
            </div>
        </nav>
    );
}

export default Navbar;