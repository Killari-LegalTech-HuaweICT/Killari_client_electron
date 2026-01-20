import React from 'react'
import { quizStore } from './quiz-generator.store'

export const QuizGeneratorView: React.FC = () => {
  return (
    <div>
      <h4>Quiz Generator</h4>
      <p>Preguntas: {quizStore.questions.length}</p>
    </div>
  )
}

export default QuizGeneratorView
