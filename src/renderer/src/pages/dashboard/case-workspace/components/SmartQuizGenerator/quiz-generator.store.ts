import { QuizState } from './quiz-generator.domain'

export const quizStore: QuizState = {
  questions: []
}

export function addQuestion(q: any): void {
  quizStore.questions.push(q)
}
