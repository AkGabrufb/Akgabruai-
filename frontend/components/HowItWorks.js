export default function HowItWorks() {
  const steps = [
    { num: '1', title: 'Paste Link', desc: 'Any platform link - Instagram, YouTube, etc.' },
    { num: '2', title: 'AI Processing', desc: 'Download, copyright check, enhance, edit' },
    { num: '3', title: 'Auto-Post', desc: 'Schedule and post to your connected accounts' }
  ]
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {s.num}
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
