import React, {useEffect} from 'react';
import {Dropdown, Button, Navbar, Menu} from 'react-daisyui';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../contexts/AuthContext';
// @ts-ignore
import mainLogo from '@resources/imgs/mainLogo.png';
import {PiUserSquareDuotone, PiList} from "react-icons/pi";


export default function MainNavbar({...props}) {

    const {user, setUser} = useAuth();

    useEffect(() => {
        // @ts-ignore
        (async () => {
            try {
                const resp = await axios.get('/api/user');
                if (resp.status === 200) {
                    setUser(resp.data.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('user');
                    window.location.href = '/';
                }
            }
        })();
    }, []);

    // @ts-ignore
    const handleLogout = async () => {
        try {
            const resp = await axios.post('/api/logout');
            if (resp.status === 200) {
                localStorage.removeItem('user');
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar {...props} className="bg-primary text-primary-content flex flex-row">
                <Navbar.Start className='navbar-start'>
                    <Dropdown>
                        <Button tag="label" color="ghost" tabIndex={0} className="lg:hidden text-xl">
                            <PiList/>
                        </Button>
                        <Dropdown.Menu tabIndex={0}
                                       className="w-52 menu-sm mt-1 z-[1] bg-secondary text-secondary-content">
                            <Dropdown.Item as="div" className="w-full block">
                                <NavLink
                                    to="/dashboard"
                                    className={({isActive}) =>
                                        isActive
                                            ? "btn btn-xs btn-block btn-secondary btn-active"
                                            : "btn btn-xs btn-block btn-secondary"
                                    }>
                                    Gerenciador de Formulários
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item as="div" className="w-full block">
                                <NavLink
                                    to="/profile"
                                    className={({isActive}) =>
                                    isActive
                                        ? "btn btn-xs btn-block btn-secondary btn-active"
                                        : "btn btn-xs btn-block btn-secondary"
                                }>
                                    Profile
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item  as="div" className="w-full block">
                                <Button onClick={handleLogout}
                                        className='btn btn-xs btn-block btn-secondary'>
                                    Logout
                                </Button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <NavLink to="/" className="btn  btn-ghost">
                        <img src={mainLogo} alt="Viatécnica" className='w-auto h-9'/>
                    </NavLink>
                </Navbar.Start>
                <Navbar.End className="hidden lg:flex navbar-end">
                    <Menu horizontal={true} className="flex px-1">
                        <Menu.Item>
                            <NavLink
                                to="/dashboard"
                                className={({isActive}) =>
                                    isActive
                                        ? "btn btn-primary btn-active btn-sm"
                                        : "btn btn-primary btn-sm "
                                }>
                                Gerenciador de Formulários
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item>
                            <Dropdown end>
                                <Button tag="label" tabIndex={0} color="ghost" className="avatar text-3xl">
                                    <PiUserSquareDuotone/>
                                </Button>
                                <Dropdown.Menu
                                    className="w-52 menu-sm mt-1 z-[1] p-2 bg-secondary text-secondary-content">
                                    <Dropdown.Item  as="div" className="w-full block">
                                        <NavLink
                                            to="/profile"
                                            className={({isActive}) =>
                                                isActive
                                                    ? "btn btn-xs btn-block btn-secondary btn-active"
                                                    : "btn btn-xs btn-block btn-secondary"
                                            }>
                                            Perfil
                                        </NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Item  as="div" className="w-full block">
                                        <Button onClick={handleLogout}
                                           className="btn btn-xs btn-block btn-secondary">
                                            Logout
                                        </Button>
                                    </Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </Menu>
                </Navbar.End>
            </Navbar>
        </>
    );

}


