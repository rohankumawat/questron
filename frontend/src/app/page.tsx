import { UrlForm } from '@/components/UrlForm'
import { Brain, Sparkles, Zap, Layout } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f9ff] dark:bg-[#0c4a6e] text-[#0c4a6e] dark:text-[#e0f2fe]">
      <main className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8 mb-16">
          <div className="rounded-full bg-[#0ea5e9] p-4">
            <Brain className="w-8 h-8 text-[#e0f2fe]" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Transform Any Content Into an Interactive Quiz
          </h1>
          
          <p className="text-xl text-[#0369a1] dark:text-[#7dd3fc] max-w-2xl">
            Enter any URL and watch as AI transforms the content into an engaging quiz. Perfect for learning, teaching, or just having fun.
          </p>

          <div className="w-full max-w-md">
            <UrlForm />
          </div>

          <div className="pt-8">
            <div className="flex items-center justify-center gap-8 text-sm text-[#0369a1] dark:text-[#7dd3fc]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>Instant Generation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-[#075985] rounded-3xl p-8 shadow-lg overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0ea5e9] dark:bg-[#7dd3fc] rounded-full -mr-12 -mt-12 opacity-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#0ea5e9] dark:bg-[#7dd3fc] rounded-full -ml-8 -mb-8 opacity-10"></div>
              <div className="relative flex flex-col gap-4">
                <feature.icon className="w-8 h-8 text-[#0ea5e9] dark:text-[#7dd3fc]" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-[#0369a1] dark:text-[#7dd3fc]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

const features = [
  {
    icon: Brain,
    title: "Smart Analysis",
    description: "Our AI analyzes content deeply to create relevant and engaging questions."
  },
  {
    icon: Zap,
    title: "Instant Creation",
    description: "Get your quiz generated within seconds, ready to use immediately."
  },
  {
    icon: Layout,
    title: "Any Content",
    description: "Works with articles, blog posts, documentation, and more."
  },
  {
    icon: Sparkles,
    title: "Interactive",
    description: "Engaging quiz interface with immediate feedback and scoring."
  }
]