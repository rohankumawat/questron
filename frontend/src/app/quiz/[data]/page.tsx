'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, X } from 'lucide-react'
import type { QuizData } from '@/types/quiz'
import { SlidingWindow } from '@/components/SlidingWindow'
import { Carousel } from '@/components/Carousel'

interface Answer {
  question: string
  selectedAnswer: string
  correctAnswer: string
  isCorrect: boolean
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
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
    const isCorrect = selectedAnswer.startsWith(currentQuestion.right_option)
    
    setAnswers([...answers, {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.options.find(opt => 
        opt.startsWith(currentQuestion.right_option)
      ) || '',
      isCorrect
    }])

    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleClose = () => {
    router.push('/')
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

  const progress = ((currentQuestionIndex + (showResults ? 1 : 0)) / quizData.questions.length) * 100
  const score = answers.filter(a => a.isCorrect).length;

  return (
    <div className={`min-h-screen ${isQuizOpen ? 'bg-[#f0f9ff]' : ''}`}>
      <SlidingWindow 
        isOpen={isQuizOpen} 
        progress={progress}
        onClose={handleClose}
      >
        {showResults ? (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Quiz Results</h2>
            <p className="text-xl mb-8 text-center">
              You scored {score} out of {quizData.questions.length}
            </p>
            <div className="w-full max-w-2xl space-y-4">
              {answers.map((answer, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow">
                  <p className="font-semibold mb-2">{answer.question}</p>
                  <p className={answer.isCorrect ? "text-green-600" : "text-red-600"}>
                    Your answer: {answer.selectedAnswer}
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-green-600">
                      Correct answer: {answer.correctAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <Button onClick={() => router.push('/')} className="mt-8">
              Take Another Quiz
            </Button>
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

