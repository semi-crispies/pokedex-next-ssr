import React from "react";

interface TypeProps {
    text: string;
    classList?: string;
}

export default function Type (params : TypeProps) {
    return (
        <div className={`rounded-full border-2 text-center ${params.classList}`}>
            {params.text}
        </div>
    );
};

