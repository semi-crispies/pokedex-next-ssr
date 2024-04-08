import Image from "next/image";
import Button from "@/components/Button";
import Pokemon from "@/components/Pokemon";

export default function Home() {

    return (
        <main className="flex flex-col items-center justify-center py-8">

            <h1 className="">
                <Image src="/pokelogo.svg" alt="Pokemon Logo" width={500} height={200} priority/>
            </h1>

            <Pokemon id="94"/>

            <div className="flex space-x-24">
                <Button label={"Previous"} classList="bg-gray-300 hover:bg-gray-600 hover:text-white"/>
                <Button label={"Next"} classList="bg-gray-300 hover:bg-gray-600 hover:text-white"/>
            </div>

        </main>
    );
}
