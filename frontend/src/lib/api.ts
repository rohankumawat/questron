import axios from 'axios'
import type { QuizData } from '@/types/quiz'

// const API_BASE_URL = 'http://127.0.0.1:8000/generate-quiz'
const API_BASE_URL = 'https://0tm1dag2uk.execute-api.eu-west-2.amazonaws.com/Prod03/generate-quiz'

export async function generateQuiz(url: string, number_of_questions: number): Promise<QuizData> {
  try {
    console.log('Sending request to:', API_BASE_URL)
    const response = await axios.post(API_BASE_URL, { url, number_of_questions }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds timeout
    })
    console.log('Response from server:', response.data)
    const data = response.data

    if (isValidQuizData(data)) {
      return data as QuizData
    } else {
      console.error('Invalid data structure:', data)
      throw new Error('Invalid quiz data structure received from the server')
    }
  } catch (error) {
    console.error('Error in generateQuiz:', error)
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Error response:', error.response.data)
        throw new Error(`Server error: ${error.response.data.detail || error.response.statusText}`)
      } else if (error.request) {
        console.error('No response received:', error.request)
        throw new Error('No response from server. Please check your internet connection and try again.')
      } else {
        console.error('Error', error.message)
        throw new Error(`Network error: ${error.message}. Please try again later.`)
      }
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred. Please try again later.')
    }
  }
}

function isValidQuizData(data: unknown): data is QuizData {
  if (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as QuizData).topic === 'string' &&
    Array.isArray((data as QuizData).questions) &&
    (data as QuizData).questions.length > 0 &&
    (data as QuizData).questions.every((q: QuizData['questions'][number]) =>
      typeof q.question === 'string' &&
      Array.isArray(q.options) &&
      q.options.every((o: string) => typeof o === 'string') &&
      typeof q.right_option === 'string'
    )
  ) {
    return true;
  }
  return false;
}

