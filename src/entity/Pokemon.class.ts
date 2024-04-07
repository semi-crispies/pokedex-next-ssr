import {PokeapiPkmn, PokeapiTypes} from "@/services/fetch";

export type PokemonSprites = {
    dream: string
    shiny: string
    default: string
};

export enum TYPES {
    normal = "normal",
    fighting = "fighting",
    flying = "flying",
    poison = 'poison',
    ground = 'ground',
    rock = 'rock',
    bug = 'bug',
    ghost = 'ghost',
    steel = 'steel',
    fire = 'fire',
    water = 'water',
    grass = 'grass',
    electric = 'electric',
    psychic = 'psychic',
    ice = 'ice',
    dragon = 'dragon',
    dark = 'dark',
    fairy = 'fairy'
}

export default class Pokemon {
    private readonly id: number;
    private readonly name: string;
    private readonly weight: number;
    private readonly height: number;
    private readonly types: TYPES[];
    private readonly sprites: PokemonSprites;

    constructor(data: PokeapiPkmn) {
        this.id = data.id;
        this.name = data.name;
        this.weight = data.weight / 10;
        this.height = data.height / 10;
        this.types = data.types.map((types: PokeapiTypes) => types.type.name);
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
        return this.weight;
    }

    public getHeightMeter(): number {
        return this.height;
    }

    public getSprite(): PokemonSprites {
        return this.sprites;
    }

    public getPokemonType(): TYPES[] {
        return this.types;
    }
}
