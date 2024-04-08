import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                normal: {
                    primary: "#6231af",
                },
                fighting: {
                    primary: "#C22E28",
                },
                flying: {
                    primary: "#A98FF3",
                },
                poison: {
                    primary: "#A33EA1",
                },
                ground: {
                    primary: "#E2BF65",
                },
                rock: {
                    primary: "#B6A136",
                },
                bug: {
                    primary: "#A6B91A",
                },
                ghost: {
                    primary: "#735797",
                },
                steel: {
                    primary: "#B7B7CE",
                },
                fire: {
                    primary: "#EE8130",
                },
                water: {
                    primary: "#6390F0",
                },
                grass: {
                    primary: "#7AC74C",
                },
                electric: {
                    primary: "#F7D02C",
                },
                psychic: {
                    primary: "#F95587",
                },
                ice: {
                    primary: "#96D9D6",
                },
                dragon: {
                    primary: "#6F35FC",
                },
                dark: {
                    primary: "#705746",
                },
                fairy: {
                    primary: "#D685AD",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
