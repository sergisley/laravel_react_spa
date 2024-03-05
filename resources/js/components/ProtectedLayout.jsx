import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import MainNavbar from "./MainNavbar";
import {ThemeSelector} from './ThemeChanger';
import MainDrawer from "./MainDrawer";
import MainFooter from "./MainFooter";

export default function DefaultLayout() {

    const {user, setUser} = useAuth();

    if (!user) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <MainNavbar/>

            <MainDrawer>

                <Outlet/>

                <MainFooter>
                    <ThemeSelector/>
                </MainFooter>
            </MainDrawer>


        </>
    );
}
