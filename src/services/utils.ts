import React from "react";

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