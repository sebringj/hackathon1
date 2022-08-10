export type Answers = { questionIndex: number; letterIndex: number; }[]

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
    return new Response(JSON.stringify(parseAnswers(text)), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
};
