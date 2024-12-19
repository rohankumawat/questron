'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2, Link } from 'lucide-react'
import { generateQuiz } from '@/lib/api'
import { motion } from 'framer-motion'

export function UrlForm() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const quizData = await generateQuiz(url)
      router.push(`/quiz/${encodeURIComponent(JSON.stringify(quizData))}`)
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again later.';
      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      setError(errorMessage);
      console.error('Error generating quiz:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      className="w-full bg-white dark:bg-[#075985] rounded-3xl shadow-xl overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="p-8 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9] dark:bg-[#7dd3fc] rounded-full -mr-16 -mt-16 opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#0ea5e9] dark:bg-[#7dd3fc] rounded-full -ml-12 -mb-12 opacity-10"></div>
        <h2 className="text-2xl font-bold mb-2 text-[#0c4a6e] dark:text-[#e0f2fe]">Generate Your Quiz</h2>
        <p className="text-sm text-[#0369a1] dark:text-[#7dd3fc] mb-4">Paste any URL and let AI do the magic</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-[#e0f2fe] dark:bg-[#0c4a6e] rounded-lg p-2">
            <Link className="text-[#0c4a6e] dark:text-[#e0f2fe] w-5 h-5 mr-2" />
            <Input
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-[#0c4a6e] dark:text-[#e0f2fe]"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-[#0ea5e9] hover:bg-[#0284c7] dark:bg-[#38bdf8] dark:hover:bg-[#7dd3fc] text-white dark:text-[#0c4a6e]" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Quiz'
            )}
          </Button>
        </form>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mt-4 mx-4 mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </motion.div>
  )
}

