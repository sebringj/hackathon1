import { Handlers } from '$fresh/server.ts'
import { Answers } from '../../types.ts'
import openAi from '../../utils/openAi.ts'

function parseAnswers(text: string) {
  const lines = text.split('\n')
  const answers: Answers = []
  for (const line of lines) {
    if (/^[0-9]\. [A-Z]/i.test(line)) {
      const parts = line.split('. ')
      const questionIndex = parseInt(parts[0]) - 1
      const letterIndex = parts[1].toUpperCase().charCodeAt(0) - 65;
      answers.push({ questionIndex, letterIndex })
    	continue
    }
  }
  return answers
}

export const handler: Handlers = {
  async POST(req) {
    const inputJson = await req.json()
    const aiCoersed = 'What are the correct answers for these questions?\n\n'
    const resultJson = await openAi.completions(`${aiCoersed}${inputJson.text}`)
    const text = resultJson.choices[0].text
    return new Response(JSON.stringify(parseAnswers(text)), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
};
