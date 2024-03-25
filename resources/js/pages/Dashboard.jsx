import React from 'react';
import PageTitle from "@/components/PageTitle.jsx";
import ContentContainer from "@/components/ContentContainer.jsx";

export default function Dashboard() {
    return (
        <>
            <PageTitle title={'Painel'}/>
            <ContentContainer>
                    <h5 className={`my-2 text-2xl font-bold tracking-tight block`}>
                        wabba
                    </h5>
                    <h6>
                        dabba
                    </h6>
                    <h6>du</h6>

            </ContentContainer>
        </>
    );
}
