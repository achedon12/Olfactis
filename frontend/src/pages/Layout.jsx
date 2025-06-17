import {useContext} from 'react';
import {Outlet, NavLink} from "react-router-dom";
import {AuthContext} from '../providers/AuthProvider';

const Layout = () => {
    const {logout} = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    const userIsAdmin = JSON.parse(localStorage.getItem('user'))?.firstname === 'admin';

    return (
        <>
            <nav className="navbar bg-tertiary shadow-sm px-10">
                <div className="flex-1">
                    <NavLink to="/" className="flex text-xl text-white hover items-center">
                        <img src="/olfactis.png" alt="logo" className="h-10 mr-2 fill-white"/>
                        <span className="text-xl md:text-2xl text-white font-bold">Olfactis</span>
                    </NavLink>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <NavLink to="/catalog"
                                     className={({isActive}) => isActive ? 'text-quaternary' : 'text-white'}>
                                Catalog
                            </NavLink>
                        </li>
                        {userIsAdmin && (
                            <>
                                <li>
                                    <NavLink to="/items"
                                             className={({isActive}) => isActive ? 'text-quaternary' : 'text-white'}>
                                        Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/bookings"
                                             className={({isActive}) => isActive ? 'text-quaternary' : 'text-white'}>
                                        Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/users"
                                             className={({isActive}) => isActive ? 'text-quaternary' : 'text-white'}>
                                        Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/loans"
                                             className={({isActive}) => isActive ? 'text-quaternary' : 'text-white'}>
                                        Loans
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/loansHistory"
                                             className={({isActive}) => isActive ? 'text-quaternary' : 'text-white'}>
                                        Loans History
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="dropdown dropdown-end ml-6">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                            </div>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><NavLink to="/profile">Profile</NavLink>
                            </li>
                            <li><a onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet/>
        </>
    );
};

export default Layout;