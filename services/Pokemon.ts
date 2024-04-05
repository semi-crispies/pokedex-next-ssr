export default class Pokemon {
    private data: object;

    constructor(data: object) {
        this.data = data;
    }

    public getName() {
        return this.data.name;
    }

    public getWeight() {
        return this.data.weight;
    }

    public getHeight() {
        return this.data.height;
    }

    public getSprite(type: string): string {
        switch (type) {
            case 'dream':
                return this.data.sprites.other.dream_world.front_default;
            case 'shiny':
                return this.data.sprites.other.home.front_shiny;
            default:
                return this.data.sprites.front_default;
        }
    }

    public getPokemonType() {
        let types = [];
        for (const type of this.data.types) {
            types.push(type.type.name);
        }

        return types;
    }

}
