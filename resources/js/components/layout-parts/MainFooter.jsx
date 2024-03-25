import React from 'react';
import {Footer} from 'react-daisyui';
import {ThemeSelector} from "../ThemeChanger.jsx";

export default function MainFooter({...props}) {

    return <Footer className="p-10 bg-neutral text-neutral-content flex flex-col" {...props}>
        <ThemeSelector/>
    </Footer>

}
