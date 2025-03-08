import { useState, useEffect, useRef, useContext } from 'react';
import { Outlet, NavLink } from "react-router-dom";
import { User } from "@phosphor-icons/react";
import { AuthContext } from '../providers/AuthProvider';

const Layout = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const { logout } = useContext(AuthContext);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        logout();
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        if (dropdownVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownVisible]);

    return (
        <>
            <nav className={'bg-tertiary w-full h-16 border-b-1 border-primary flex items-center justify-between px-8'}>
                <ul className={'flex space-x-2 md:space-x-8'}>
                    <li className={'text-base md:text-lg'}>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'text-quaternary' : 'text-white'}>
                            Home
                        </NavLink>
                    </li>
                    <li className={'text-base md:text-lg'}>
                        <NavLink to="/catalog" className={({ isActive }) => isActive ? 'text-quaternary' : 'text-white'}>
                            Catalog
                        </NavLink>
                    </li>
                    <li className={'text-base md:text-lg'}>
                        <NavLink to="/items" className={({ isActive }) => isActive ? 'text-quaternary' : 'text-white'}>
                            Items
                        </NavLink>
                    </li>
                </ul>
                <div className={'relative'} ref={dropdownRef}>
                    <User size={24} className={'text-primary cursor-pointer'} onClick={toggleDropdown} />
                    {dropdownVisible && (
                        <div className={'absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'}>
                            <NavLink to="/profile" className={'block px-4 py-2 text-text-color hover:bg-primary'}>View profile</NavLink>
                            {/*<NavLink to="/myBookings" className={'block px-4 py-2 text-text-color hover:bg-primary'}>My bookings</NavLink>*/}
                            <button onClick={handleLogout} className={'block w-full text-left px-4 py-2 text-text-color hover:bg-primary cursor-pointer'}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;