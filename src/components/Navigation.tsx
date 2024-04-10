import Link from 'next/link'

export default function Navigation() {
    return (
        <nav className="float-left w-0 relative left-16">
            <ul>
                <li><Link href="/" className="flex-grow-0">Home</Link></li>

                <li><Link href="/pokedex">Pokedex</Link></li>
            </ul>
        </nav>
    )
}