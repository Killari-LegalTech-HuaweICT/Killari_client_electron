export interface QuizQuestion {
  id: string
  question: string
  options?: string[]
}

export interface QuizState {
  questions: QuizQuestion[]
}
