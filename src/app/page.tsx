import Image from "next/image";
import Button from "@/components/Button";
import Pokemon from "@/components/Pokemon";

export default function Home() {

    return (
        <main className="flex flex-col items-center justify-center py-8">

            <h1 className="">
                <Image src="/pokelogo.svg" alt="Pokemon Logo" width={500} height={200} priority/>
            </h1>

            <Pokemon/>

            <div>
                <Button label={"Previous"} classList="bg-blue-400"/>
                <Button label={"Next"} classList="bg-blue-400"/>
            </div>

        </main>
    );
}
