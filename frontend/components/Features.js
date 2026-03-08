import { FiVideo, FiMusic, FiHash, FiImage, FiShield, FiZap } from 'react-icons/fi'

const features = [
  { icon: FiVideo, title: 'Auto Download', desc: 'Paste any link - we download video, audio, captions' },
  { icon: FiShield, title: 'Copyright Check', desc: 'AI scans for copyright issues before posting' },
  { icon: FiZap, title: 'Quality Enhance', desc: 'Upscale to 4K, stabilize, color correct' },
  { icon: FiMusic, title: 'Smart Audio', desc: 'Auto background music based on video type' },
  { icon: FiHash, title: 'Hashtag Generator', desc: '30 trending hashtags for maximum reach' },
  { icon: FiImage, title: 'Thumbnail Creator', desc: 'AI generates eye-catching thumbnails' }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="card hover:shadow-2xl transition">
              <f.icon className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
