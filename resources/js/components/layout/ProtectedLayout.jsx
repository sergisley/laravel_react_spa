import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext.jsx';
import MainNavbar from "../layout-parts/MainNavbar.jsx";
import {ThemeSelector} from '../ThemeChanger.jsx';
import MainDrawer from "../layout-parts/MainDrawer.jsx";
import MainFooter from "../layout-parts/MainFooter.jsx";

export default function DefaultLayout() {

    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <MainNavbar/>

            <MainDrawer className="flex-grow">

                <Outlet/>

            </MainDrawer>

            <MainFooter className="mt-auto">
                <ThemeSelector/>
            </MainFooter>
        </>
    );
}
