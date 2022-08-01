export type Questions = { text: string; answers: { text: string; correct: boolean; }[] }[]

function parseTestResult(text: string) {
  const lines = text.split('\n')
  let currentQuestion = -1
  const questions: Questions = []
  for (const line of lines) {
    if (/^[0-9]\. [A-Z]$/i.test(line)) {
      const parts = line.split('. ')
      const questionIndex = parseInt(parts[0]) - 1
      const letterIndex = parts[1].charCodeAt(0) - 65;
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
    const aiCoersed = 'Generate a test from the below content with exactly 4 multiple choice questions and exactly 4 multiple choice answers with the correct answer listed:\n\n'
    const resultJson = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`
      },
      body: JSON.stringify({
        model: 'text-davinci-002',
        prompt: `${aiCoersed}${inputJson.text}`,
        temperature: 0.7,
        max_tokens: 1547,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    }).then(r => r.json())
    const text = resultJson.choices[0].text
    console.log(text)
    return new Response(JSON.stringify(parseTestResult(text)), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
};
