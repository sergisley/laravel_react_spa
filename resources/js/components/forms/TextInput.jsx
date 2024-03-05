import React from 'react';
import {Input} from "react-daisyui";
import {ErrorAlert} from "./ErrorAlert";

export function TextInput({error, label, id,type = 'text', ...props}) {

    return (
        <>
            <div className="form-control border-0">
                <label
                    htmlFor={id}
                    className='label'>
                    <span className='label-text'>{label}</span>
                </label>
                <Input
                    type={type}
                    className="input input-bordered w-full max-w-xs text-base-content"
                    id={id}
                    {...props}
                />
                {error && <ErrorAlert children={error}/>}
            </div>
        </>
    );

}


