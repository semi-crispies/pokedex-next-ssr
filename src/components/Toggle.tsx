import {getIconFromName} from "@/services/utils";
import React from "react";

type toogleProps = {
    iconName: '' | 'left' | 'right' | 'sparkles',
    label?: string,
    classList: string,
    onClick?: (event: React.FormEvent) => void;
    checked: boolean,
}

export default function Toggle({iconName, label, classList, onClick, checked}: toogleProps) {

    const icon = getIconFromName(iconName);

    return (
        <label className={`inline-flex items-center cursor-pointer ${classList}`}>
            <input type="checkbox" value="" className="sr-only peer" onClick={onClick} checked={checked}/>
            <div
                className="mr-2 flex-shrink-0 relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            {icon}
            {label}
        </label>
    )
}