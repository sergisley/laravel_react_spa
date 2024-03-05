import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
    const { user } = useAuth();
    return (
        <>
            <div className="container">
                <h2 className=' w-100 p-3 text-xl-center'>Dashboard</h2>
            </div>
        </>
    );
}
