import React from "react";

interface TypeProps {
    text: string;
    classList?: string;
}

export default function Type (params : TypeProps) {
    return (
        <div className={`rounded-lg mt-6 py-2 px-4 border ${params.classList}`}>
            {params.text}
        </div>
    );
};

