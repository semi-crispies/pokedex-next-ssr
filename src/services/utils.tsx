import React from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { IoSparkles } from "react-icons/io5";

/**
 * Function to decrement number with a minimum value
 * to avoid negative value
 *
 * @param number
 * @param setNumber
 * @param min
 * @constructor
 */
export function previousNumber(number: number, setNumber: React.Dispatch<React.SetStateAction<number>>, min: number): void {

    if (number > min) {
        setNumber(number - 1);
    }

}

/**
 * Function to increment number with a maximum value
 *
 * @param number
 * @param setNumber
 * @param max
 * @constructor
 */
export function nextNumber(number: number, setNumber: React.Dispatch<React.SetStateAction<number>>, max: number): void {

    if (number < max) {
        setNumber(number + 1);
    }

}

export function getIconFromName (iconName: string) {
    switch (iconName) {
        case 'left':
            return (<IoMdArrowDropleft size="25"/>);
        case 'right':
            return (<IoMdArrowDropright size="25"/>);
        case 'sparkles':
            return (<IoSparkles size="20"/>);
    }
}