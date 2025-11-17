import { Link, useLocation } from 'react-router-dom'
import { Ship, Plane, Truck, PackageSearch, Calculator, Contact } from 'lucide-react'

const NavLink = ({ to, label }) => {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active ? 'bg-white/80 text-blue-700' : 'text-white/90 hover:bg-white/20'
      }`}
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-gradient-to-r from-blue-600/80 to-indigo-600/80 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <Ship className="h-6 w-6" />
          <span className="font-bold tracking-tight">LogiFlow</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" label="Home" />
          <NavLink to="/quote" label="Get a Quote" />
          <NavLink to="/book" label="Book" />
          <NavLink to="/track" label="Track" />
        </nav>
      </div>
    </header>
  )
}
