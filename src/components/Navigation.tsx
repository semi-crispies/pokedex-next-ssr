import Link from 'next/link'

export default function Navigation() {
    return (
        <nav className="px-24">
            <ul>
                <li><Link href="/" className="flex-grow-0">Home</Link></li>

                <li><Link href="/pokedex">Pokedex</Link></li>
            </ul>
        </nav>
    )
}