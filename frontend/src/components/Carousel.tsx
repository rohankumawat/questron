'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { QuizQuestion } from '@/types/quiz'

interface CarouselProps {
  questions: QuizQuestion[]
  onAnswer: (answer: string) => void
  currentQuestionIndex: number
}

export function Carousel({ questions, onAnswer, currentQuestionIndex }: CarouselProps) {
  const [direction, setDirection] = useState(0)

  const handleAnswer = (option: string) => {
    onAnswer(option)
    setDirection(1)
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="relative h-full">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentQuestionIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction < 0 ? 100 : -100 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-center items-center p-8"
        >
          <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
          <div className="grid grid-cols-1 gap-4 w-full max-w-md">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                variant="outline"
                className="w-full text-left justify-start h-auto py-3 px-4"
              >
                {option}
              </Button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <p className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>
    </div>
  )
}

