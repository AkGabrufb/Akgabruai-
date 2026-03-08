import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import ThreeBackground from '@/components/ThreeBackground'

export default function Login() {
  const { login, user } = useAuth()
  const router = useRouter()

  if (user) router.push('/dashboard')

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        })
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
          email: userInfo.data.email,
          name: userInfo.data.name,
          picture: userInfo.data.picture,
          googleId: userInfo.data.sub
        })
        if (response.data.success) {
          login(response.data.token, response.data.user)
          toast.success('Login successful!')
          router.push('/dashboard')
        }
      } catch (error) {
        toast.error('Login failed')
      }
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <ThreeBackground />
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 z-10">
        <h1 className="text-4xl font-bold gradient-text text-center mb-2">IUAI</h1>
        <p className="text-center text-gray-600 mb-8">IndiaUniversalAI</p>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition shadow-md"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>
        <p className="text-xs text-center mt-6 text-gray-500">
          7 days free trial • No credit card required
        </p>
      </div>
    </div>
  )
}
