import {useEffect} from 'react'
import {Select, Theme} from 'react-daisyui'
import {themeChange} from 'theme-change'

export const ThemeSelector = () => {

    useEffect(() => {
        themeChange(false)
    }, [])

    const themes = [
        'acid', 'aqua', 'autumn', 'black', 'bumblebee', 'business', 'cmyk', 'coffee', 'corporate', 'cupcake', 'cyberpunk', 'dark', 'dim', 'dracula', 'emerald', 'fantasy', 'forest', 'garden', 'halloween', 'lemonade', 'light', 'lofi', 'luxury', 'night', 'nord', 'pastel', 'retro', 'sunset', 'synthwave', 'valentine', 'winter', 'wireframe'
    ];

    const makeItem = function (x) {
        return <option value={x} key={x}>{x}</option>;
    };

    return (
        <>
            <div className="form-control bg-transparent border-0 max-w-xs">
                <label className="label label-text text-base-content text-xs p-1">
                    Selecione um tema
                </label>
                <Select size={'sm'} data-choose-theme
                        className="text-base-content select input-bordered select-xs ">
                    {themes.map(makeItem)}
                </Select>
            </div>
        </>
    )
}
