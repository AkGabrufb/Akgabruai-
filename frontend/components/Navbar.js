import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { FiLogOut } from 'react-icons/fi'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text">IUAI</Link>
        <div className="flex items-center gap-6">
          <Link href="#features" className="hidden md:block hover:text-primary transition">Features</Link>
          <Link href="#pricing" className="hidden md:block hover:text-primary transition">Pricing</Link>
          {user ? (
            <div className="flex items-center gap-4">
              <img src={user?.picture} className="w-8 h-8 rounded-full border-2 border-primary hidden md:block" />
              <span className="hidden md:inline text-sm">{user.name}</span>
              <button onClick={logout} className="p-2 hover:bg-gray-100 rounded-full transition">
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-sm py-2 px-4">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
