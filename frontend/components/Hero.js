import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Hero() {
  const { user } = useAuth()
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">IUAI</span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 mb-4">IndiaUniversalAI</p>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Link Do → Baaki Sab AI Karega
        </p>
        <p className="text-lg text-gray-500 mb-12">
          Download • Edit • Enhance • Post — Automatically
        </p>
        {!user && (
          <Link href="/login" className="btn-primary text-lg px-8 py-4">
            Start 7-Day Free Trial
          </Link>
        )}
      </div>
    </section>
  )
}
