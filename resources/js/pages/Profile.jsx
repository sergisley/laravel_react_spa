import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
    const { user } = useAuth();
    return (
        <>
            <div className="text-6xl font-bold text-base-content">User Profile</div>
            <hr className="h-1 w-full my-4" />
            <div className="block p-10 bg--base-200 shadow-xl">
                <h5 className="my-2 text-2xl font-bold tracking-tight">
                    Name: {user.name}
                </h5>
                <p className="font-normal text-base-300-700">Email: {user.email}</p>
                <p className="font-normal ext-base-300-700">
                    Created At: {user.created_at}
                </p>
            </div>
        </>
    );
}
