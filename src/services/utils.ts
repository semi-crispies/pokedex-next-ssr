export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function PreviousNumber(number: number, setNumber: any): void {

    if (number > 1) {
        setNumber(number - 1);
    }

}

export function NextNumber(number: number, setNumber: any): void {

    if (number < 151) {
        setNumber(number + 1);
    }

}