'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import QuizQuestion from '@/components/QuizQuestion'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import type { QuizData } from '@/types/quiz'

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const parsedData = JSON.parse(decodeURIComponent(params.data as string))
      if (parsedData.topic && Array.isArray(parsedData.questions)) {
        setQuizData(parsedData)
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

    if (selectedAnswer.startsWith(quizData.questions[currentQuestion].right_option)) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
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

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-xl mb-4">
              You scored {score} out of {quizData.questions.length}
            </p>
            <Button onClick={() => router.push('/')} className="mt-4">
              Take Another Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-center">{quizData.topic}</CardTitle>
        </CardHeader>
      </Card>
      <QuizQuestion
        question={quizData.questions[currentQuestion].question}
        options={quizData.questions[currentQuestion].options}
        onAnswer={handleAnswer}
      />
      <p className="mt-4 text-center">
        Question {currentQuestion + 1} of {quizData.questions.length}
      </p>
    </div>
  )
}