'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import type { QuizData } from '@/types/quiz'
import { SlidingWindow } from '@/components/SlidingWindow'
import { Carousel } from '@/components/Carousel'

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  useEffect(() => {
    try {
      const parsedData = JSON.parse(decodeURIComponent(params.data as string))
      if (parsedData.topic && Array.isArray(parsedData.questions)) {
        setQuizData(parsedData)
        setIsQuizOpen(true)
      } else {
        setError('Invalid quiz data structure')
      }
    } catch (e) {
      setError('Failed to parse quiz data')
      console.error('Error parsing quiz data:', e)
    }
  }, [params.data])

  const handleAnswer = (selectedAnswer: string) => {
    if (!quizData) return

    const currentQuestion = quizData.questions[currentQuestionIndex]
    if (selectedAnswer.startsWith(currentQuestion.right_option)) {
      setScore(score + 1)
    }

    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/')} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  if (!quizData) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-center">{quizData.topic}</CardTitle>
        </CardHeader>
      </Card>
      <SlidingWindow isOpen={isQuizOpen}>
        {showResults ? (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
            <p className="text-xl mb-8">
              You scored {score} out of {quizData.questions.length}
            </p>
            <Button onClick={() => router.push('/')}>Take Another Quiz</Button>
          </div>
        ) : (
          <Carousel 
            questions={quizData.questions} 
            onAnswer={handleAnswer}
            currentQuestionIndex={currentQuestionIndex}
          />
        )}
      </SlidingWindow>
    </div>
  )
}

