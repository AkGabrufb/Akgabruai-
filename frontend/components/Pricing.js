import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

const plans = [
  { name: 'Starter', price: '₹299', features: ['20 links/day', '5 platforms', 'Basic AI', '5GB storage'] },
  { name: 'Pro', price: '₹799', features: ['100 links/day', 'All platforms', 'Advanced AI', '50GB storage', 'Priority support'] },
  { name: 'Business', price: '₹2,499', features: ['Unlimited', 'API access', 'Premium AI', '500GB storage', '24/7 support', 'Team (5 users)'] }
]

export default function Pricing() {
  const { user } = useAuth()
  return (
    <section id="pricing" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Simple Pricing</h2>
        <p className="text-center text-gray-600 mb-12">7-day free trial on all plans</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div key={i} className="card hover:shadow-2xl transition text-center">
              <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
              <p className="text-4xl font-bold text-primary mb-4">{p.price}<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="mb-6 space-y-2">
                {p.features.map((f, j) => <li key={j} className="text-gray-600">✓ {f}</li>)}
              </ul>
              {user ? (
                <Link href="/dashboard" className="btn-primary block text-center">Upgrade</Link>
              ) : (
                <Link href="/login" className="btn-primary block text-center">Start Free Trial</Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
