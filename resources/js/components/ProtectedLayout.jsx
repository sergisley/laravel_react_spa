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
            <div className="flex flex-col min-h-screen">

                <MainNavbar/>

                <MainDrawer className="flex-grow">

                    <Outlet/>

                </MainDrawer>

                <MainFooter className="mt-auto">
                    <ThemeSelector/>
                </MainFooter>

            </div>
        </>
    );
}
