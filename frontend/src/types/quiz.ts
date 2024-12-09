export interface QuizQuestion {
    question: string;
    options: string[];
    right_option: string;
  }
  
  export interface QuizData {
    topic: string;
    questions: QuizQuestion[];
  }
  
  