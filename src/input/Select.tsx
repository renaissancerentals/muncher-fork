import React from "react";
import {Label} from "./Label";
import {Icon} from "../icon/Icon";
import "./assets/Input.scss";

export const Select: React.FC<SelectProps> = (
    {
        name, options, label, required,
        error, onChange, value, ...props
    }
) => {

    const hasError = () => error && error !== "";
    const className = () => {
        let inputClass = "muncher-input";
        if (hasError()) inputClass += " muncher-input-error";
        return inputClass;
    };
    return (
        <div className="muncher-input--div">
            {label ? <Label label={label} required={required} name={name}/> : ''}
            <div className="muncher-input-element">
                <select
                    className={className()}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    {...props}
                >
                    <option/>
                    {options.map((option, i) =>
                        <option key={i} value={option}>{option}</option>
                    )}
                </select>
            </div>
            {hasError() ? <p className="muncher-input-error-message"><Icon name="alert"/>&nbsp;{error}</p> : ""}
        </div>
    );
};

export interface SelectProps {
    name: string;
    options: string[];
    label?: string;
    required?: boolean;
    onChange?: (value: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: any;
    error?: string;
}
