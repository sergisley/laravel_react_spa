import React, {useState, useEffect} from 'react';
import {PiAlien, PiCalendar, PiDatabase, PiNotepad} from "react-icons/pi";
import {NavLink} from "react-router-dom";

export default function MainDrawer({children}) {

    const [drawerMobile, setDrawerMobile] = useState(window.innerWidth <= 1023);
    const [drawerIsOpen, setDrawerState] = useState(false);

    const [showDrawerLabels, setshowDrawerLabels] = useState(true);

    const toggleDrawer = () => {
        setDrawerState(drawerMobile && !drawerIsOpen);
        setshowDrawerLabels(!drawerMobile || drawerMobile && !drawerIsOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setDrawerMobile(window.innerWidth <= 1023)
            setshowDrawerLabels(!drawerMobile || drawerMobile && drawerIsOpen)

            console.log(
                'drawerMobile ' + drawerMobile +
                ' showDrawerLabels ' + showDrawerLabels +
                ' drawerIsOpen ' + drawerIsOpen
            );

        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [ drawerMobile, showDrawerLabels ,drawerIsOpen]);

    return <div className="flex flex-row flex-grow h-[calc(100vh-65px)] bg45degree">

        <aside className="bg-neutral text-neutral-content flex m-2 rounded-box" onClick={toggleDrawer}>
            <ul className={`
            menu mt-2 rounded-box p-1 transition-all duration-300 ease-in-out w-44
            ${drawerMobile ? 'drawer-mobile' : ''}
            ${drawerIsOpen ? 'drawer-mobile-extended' : ''}
            `}>
                <li className={`w1-`}>
                    <NavLink
                        to="/dashboard"
                        className={
                        ({isActive}) =>
                            isActive
                                ? " bg-primary text-primary-content"
                                : ""

                        }>
                        <PiDatabase/>
                        <span className={` ${!showDrawerLabels ? 'hidden' : ''} `}>Painel</span>
                    </NavLink>
                </li>

                <li>
                    <details>
                        <summary>
                            <PiNotepad/>
                            <span className={` ${!showDrawerLabels ? 'hidden' : ''} `}>Item2</span>
                        </summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                            <li>
                                <details>
                                    <summary>Parent</summary>
                                    <ul>
                                        <li><a>Submenu 1</a></li>
                                        <li><a>Submenu 2</a></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <a>
                        <PiCalendar/><span className={` ${!showDrawerLabels ? 'hidden' : ''} `}>Item 3</span>
                    </a>
                </li>
                <li>
                    <a>
                        <PiAlien/><span className={` ${!showDrawerLabels ? 'hidden' : ''} `}>Item 4</span>
                    </a>
                </li>
            </ul>
        </aside>

        <div className="p-3 flex-grow">
            {children}
        </div>

    </div>


}
