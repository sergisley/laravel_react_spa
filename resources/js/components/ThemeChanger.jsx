import React, {useEffect, useState, useCallback} from 'react'
// import {Theme} from 'react-daisyui'

export const ThemeSelector = () => {

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        document.querySelector('html')?.setAttribute('data-theme', storedTheme);
    }, []);

    const themes = [
        'acid', 'aqua', 'autumn', 'black', 'bumblebee', 'business', 'cmyk', 'coffee', 'corporate', 'cupcake', 'cyberpunk', 'dark', 'dim', 'dracula', 'emerald', 'fantasy', 'forest', 'garden', 'halloween', 'lemonade', 'light', 'lofi', 'luxury', 'night', 'nord', 'pastel', 'retro', 'sunset', 'synthwave', 'valentine', 'winter', 'wireframe'
    ];

    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'nord');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleThemeChange = useCallback((event) => {
        const newTheme = event.target.value;
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setCurrentTheme(newTheme);
    }, []);

    const makeItem = function (name, index) {

        return <li className="flex-auto" key={index}>
            <input type="radio"
                   name="theme-dropdown"
                   className="btn btn-sm btn-block btn-ghost
                   justify-start text-base-content"
                   aria-label={name}
                   checked={name === currentTheme}
                   value={name}
                   onChange={(e) => handleThemeChange(e)}
            />
        </li>
    };

    return (
        <>
            <div className="dropdown dropdown-top fixed bottom-5 right-5">
                <div tabIndex={0} role="button" className="btn m-1" onClick={handleDropdownClick}>
                    Tema
                    <svg width="12px"
                         height="12px"
                         className={`h-2 w-2 fill-current opacity-60 inline-block transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 2048 2048">
                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                    </svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl
                 bg-base-300 w-52 flex flex-wrap right-0">
                    {themes.map(makeItem)}
                </ul>
            </div>
        </>
    )
}

