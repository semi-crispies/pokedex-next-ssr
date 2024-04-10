import Link from 'next/link'

export default function Navigation() {
    return (
        <nav className="flex flex-col px-24">
            <Link href="/">Home</Link>

            <Link href="/pokedex">Pokedex</Link>
        </nav>
    )
}