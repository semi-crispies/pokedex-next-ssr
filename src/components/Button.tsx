import React from "react";
import {getIconFromName} from "@/services/utils";

type ButtonProps = {
    label: string;
    onClick?: (event: React.FormEvent) => void;
    classList?: string;
    disabled?: boolean;
    iconName: '' | 'left' | 'right',
}

const Button: React.FC<ButtonProps> = (button: ButtonProps) => {

    const icon = getIconFromName(button.iconName);

    return (
        <button onClick={button.onClick} className={`rounded-lg items-center mt-6 py-2 px-4 border flex gap-2 ${button.classList}`} disabled={button.disabled}>
            {button.label}
            {icon}
        </button>
    );
};

export default Button;
