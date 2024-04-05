import { PokeapiPkmn } from "./fetch";

export type PokemonSprites = {
    dream: string
    shiny: string
    default: string
};

export default class Pokemon {
    private id: number;
    private name: string;
    private weight: number;
    private height: number;
    private types: string[];
    private sprites: PokemonSprites;

    constructor(data: PokeapiPkmn) {
        this.id = data.id;
        this.name = data.name;
        this.weight = data.weight;
        this.height = data.height;
        this.types = data.types.map((types) => types.type.name);
        this.sprites = {
            dream: data.sprites.other.dream_world.front_default,
            shiny: data.sprites.other.home.front_shiny,
            default: data.sprites.front_default,
        };
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getWeightKg(): number {
        return this.weight / 10;
    }

    public getHeightMeter(): number {
        return this.height / 10;
    }

    public getSprite(): PokemonSprites {
        return this.sprites;
    }

    public getPokemonType(): string[] {
        return this.types;
    }

}
