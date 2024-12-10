'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { QuizQuestion } from '@/types/quiz'

interface CarouselProps {
  questions: QuizQuestion[]
  onAnswer: (answer: string) => void
  currentQuestionIndex: number
}

export function Carousel({ questions, onAnswer, currentQuestionIndex }: CarouselProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const currentQuestion = questions[currentQuestionIndex]

  const handleNext = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer)
      setSelectedAnswer('')
    }
  }

  return (
    <div className="h-full grid grid-cols-2">
      <div className="absolute top-0 left-0 right-0 h-2">
        <div
          className="h-full bg-[#0ea5e9] transition-all duration-300 ease-in-out"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>
      {/* Left side - Question */}
      <div className="bg-[#f0f9ff] p-8 flex flex-col justify-center items-center">
        <motion.h2
          key={`question-${currentQuestionIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#0c4a6e] mb-4 text-center max-w-lg"
        >
          {currentQuestion.question}
        </motion.h2>
      </div>

      {/* Right side - Options */}
      <div className="bg-white p-8 flex flex-col justify-center">
        <RadioGroup
          value={selectedAnswer}
          onValueChange={setSelectedAnswer}
          className="space-y-4 max-w-lg mx-auto w-full"
        >
          <AnimatePresence mode="wait">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={`${currentQuestionIndex}-${index}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <div className="w-full">
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className={`flex w-full cursor-pointer rounded-lg border p-4 transition-all ${
                      selectedAnswer === option
                        ? 'border-[#0ea5e9] bg-[#f0f9ff] text-[#0ea5e9]'
                        : 'border-[#e0f2fe] hover:bg-[#f0f9ff]'
                    }`}
                  >
                    {option}
                  </Label>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </RadioGroup>

        <div className="mt-8 flex justify-between max-w-lg mx-auto w-full">
          <Button
            variant="outline"
            onClick={() => {}}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

