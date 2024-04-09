export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function PreviousIndex(index: number, setIndex: any): void {

    if (index > 1) {
        setIndex(index - 1);
    }

}

export function NextIndex(index: number, setIndex: any): void {

    if (index < 151) {
        setIndex(index + 1);
    }

}