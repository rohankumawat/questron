import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface QuizQuestionProps {
  question: string
  options: string[]
  onAnswer: (answer: string) => void
}

export default function QuizQuestion({ question, options, onAnswer }: QuizQuestionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option, index) => (
            <Button 
              key={index} 
              onClick={() => onAnswer(option)} 
              variant="outline" 
              className="w-full text-left h-auto whitespace-normal py-4"
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}