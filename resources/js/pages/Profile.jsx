import React from 'react';
import {useAuth} from '../contexts/AuthContext';
import PageTitle from "../components/PageTitle.jsx";
import ContentContainer from "../components/ContentContainer.jsx";

export default function Profile() {
    const {user} = useAuth();
    return (
        <>
            <PageTitle title={'Perfil'}/>
            <ContentContainer>
                    <h5 className={`my-2 text-2xl font-bold tracking-tight block`}>
                        Name: {user.name}
                    </h5>
                    <p className={`font-normal text-base-300-700`}>
                        Email: {user.email}
                    </p>
                    <p className={`font-normal ext-base-300-700`}>
                        Created At: {user.created_at}
                    </p>
                </ContentContainer>
        </>
    );
}
