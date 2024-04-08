export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function applyTypeColor2(type: string): string {

    switch (type) {
        case 'normal':
            return 'bg-normal-primary';
        case 'fighting':
            return 'bg-fighting-primary';
        case 'flying':
            return 'bg-flying-primary';
        case 'poison':
            return 'bg-poison-primary';
        case 'ground':
            return 'bg-ground-primary';
        case 'rock':
            return 'bg-rock-primary';
        case 'bug':
            return 'bg-bug-primary';
        case 'ghost':
            return 'bg-[#735797]';
        case 'steel':
            return 'bg-steel-primary';
        case 'fire':
            return 'bg-fire-primary';
        case 'water':
            return 'bg-water-primary';
        case 'grass':
            return 'bg-grass-primary';
        case 'electric':
            return 'bg-electric-primary';
        case 'psychic':
            return 'bg-psychic-primary';
        case 'ice':
            return 'bg-ice-primary';
        case 'dragon':
            return 'bg-dragon-primary';
        case 'dark':
            return 'bg-dark-primary'
        case 'fairy':
            return 'bg-fairy-primary';
        default:
            return "";
    }
}