import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiCopy, FiCheck, FiShare2, FiLogOut, FiVideo, FiUsers, FiAward, FiBarChart2 } from 'react-icons/fi'
import ThreeBackground from '@/components/ThreeBackground'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!user) router.push('/login')
    else fetchDashboard()
  }, [user])

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(res.data.data)
    } catch (error) {
      toast.error('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://iuai.com/ref/${user?.referralCode}`)
    setCopied(true)
    toast.success('Copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <ThreeBackground />

      <nav className="bg-gray-800/50 backdrop-blur-lg fixed w-full z-50 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text">IUAI</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={user?.picture} className="w-8 h-8 rounded-full border-2 border-primary" />
              <span className="hidden md:inline text-sm">{user?.name}</span>
            </div>
            <button onClick={logout} className="p-2 hover:bg-gray-700 rounded-lg transition">
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-primary transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Total Posts</p>
                <p className="text-3xl font-bold mt-1">{stats?.totalPosts || 0}</p>
              </div>
              <FiVideo className="text-primary text-3xl" />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-primary transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Referrals</p>
                <p className="text-3xl font-bold mt-1">{stats?.totalReferrals || 0}</p>
              </div>
              <FiUsers className="text-secondary text-3xl" />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-primary transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Credits</p>
                <p className="text-3xl font-bold mt-1">{stats?.credits || 100}</p>
              </div>
              <FiAward className="text-yellow-500 text-3xl" />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-primary transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Your Rank</p>
                <p className="text-3xl font-bold mt-1">#{stats?.rank || 12}</p>
              </div>
              <FiBarChart2 className="text-green-500 text-3xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Refer & Earn</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={`https://iuai.com/ref/${user?.referralCode}`}
              readOnly
              className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-sm text-white"
            />
            <button
              onClick={copyReferral}
              className="bg-white text-primary px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition"
            >
              {copied ? <FiCheck /> : <FiCopy />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
              <FiShare2 />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4 text-center text-sm">
            <div className="bg-white/10 rounded p-2">1 → 20 Credits</div>
            <div className="bg-white/10 rounded p-2">5 → Pro Features</div>
            <div className="bg-white/10 rounded p-2">10 → Advanced Tools</div>
            <div className="bg-white/10 rounded p-2">25 → 1 Month Free</div>
            <div className="bg-white/10 rounded p-2">50 → Premium AI</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-gray-700 hover:border-primary transition text-center">
            <div className="text-2xl mb-2">🔗</div>
            <div className="text-sm">New Post</div>
          </button>
          <button className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-gray-700 hover:border-primary transition text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm">Refer</div>
          </button>
          <button className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-gray-700 hover:border-primary transition text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-sm">Leaderboard</div>
          </button>
          <button className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-gray-700 hover:border-primary transition text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm">AI Tools</div>
          </button>
        </div>
      </div>
    </div>
  )
}
