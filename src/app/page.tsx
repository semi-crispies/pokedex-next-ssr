import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
    return (
        <main className="">

            <h1 className="flex items-center justify-center py-8">
                <Image src="/pokelogo.svg" alt="Pokemon Logo" width={500} height={24} priority/>
            </h1>

            <Button label={"Jaki"}/>
            <Button label={"Vitkov"} classList="bg-blue-400"/>

        </main>
    );
}
