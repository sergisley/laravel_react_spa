import React, {useEffect} from 'react';
import {Dropdown, Button, Navbar} from 'react-daisyui';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../../contexts/AuthContext.jsx';
// @ts-ignore
import MainLogo from '../MainLogo';
import {PiUserSquareDuotone, PiBellDuotone} from "react-icons/pi";


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
            <Navbar {...props} className="bg-base-300 text-base-content min-h-3 h3 p-1">

                <Navbar.Start>
                    <NavLink to="/" className="btn btn-accent">
                        <MainLogo/>
                    </NavLink>
                </Navbar.Start>

                <Navbar.End>

                    <Dropdown end>
                        <Button tag="label" tabIndex={0} color="ghost" className="avatar text-2xl btn-sm">
                            <PiBellDuotone/>
                        </Button>
                        <Dropdown.Menu className="w-52 menu-sm mt-1 z-[1] bg-secondary text-secondary-content">
                            <div className="w-full block my-1">
                                <Button className="btn btn-xs btn-block btn-secondary">
                                    Item 1
                                </Button>
                            </div>
                            <div className="w-full block my-1">
                                <Button className="btn btn-xs btn-block btn-secondary">
                                    Item 2
                                </Button>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown end>
                        <Button tag="label" tabIndex={0} color="ghost" className="avatar text-2xl btn-sm">
                            <PiUserSquareDuotone/> <span className={`text-sm`}>{user.name}</span>
                        </Button>
                        <Dropdown.Menu
                            className="w-52 menu-sm mt-1 z-[1] bg-secondary text-secondary-content">
                            <div className="w-full block my-1">
                                <NavLink
                                    to="/profile"
                                    className={({isActive}) =>
                                        isActive
                                            ? "btn btn-xs btn-block btn-secondary btn-active"
                                            : "btn btn-xs btn-block btn-secondary"
                                    }>
                                    Perfil
                                </NavLink>
                            </div>
                            <div className="w-full block my-1">
                                <Button onClick={handleLogout}
                                        className="btn btn-xs btn-block btn-secondary">
                                    Logout
                                </Button>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.End>
            </Navbar>
        </>
    );

}


