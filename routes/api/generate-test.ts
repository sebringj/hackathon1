import { Handlers } from '$fresh/server.ts'
import { Questions } from '../../types.ts'
import openAi from '../../utils/openAi.ts'

function parseTestResult(text: string) {
  const lines = text.split('\n')
  let currentQuestion = -1
  const questions: Questions = []
  for (const line of lines) {
    if (/^[0-9]\. [A-Z]$/i.test(line)) {
      const parts = line.split('. ')
      const questionIndex = parseInt(parts[0]) - 1
      const letterIndex = parts[1].toUpperCase().charCodeAt(0) - 65;
      questions[questionIndex].answers[letterIndex].correct = true
    	continue
    }
    if (/^[0-9]\. /.test(line)) {
      currentQuestion++
      questions.push({
        text: line,
        answers: []
      })
      continue
    }
    if (/^[A-Z]\. /i.test(line)) {
      questions[currentQuestion].answers.push({
        text: line,
        correct: false
      })
      continue
    }
  }
  return questions
}

export const handler: Handlers = {
  async POST(req) {
    const inputJson = await req.json()
    const aiCoersed = 'Generate a test from the below content with exactly 4 multiple choice questions and exactly 4 multiple choice answers:\n\n'
    const resultJson = await openAi.completions(`${aiCoersed}${inputJson.text}`)
    const text = resultJson.choices[0].text
    return new Response(JSON.stringify({
      text,
      questions: parseTestResult(text)
    }), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
};
