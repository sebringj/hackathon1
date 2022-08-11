import { Completion } from '../types.ts';
const openAi = {
  completions: (prompt: string): Promise<Completion> => {
    return fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`
      },
      body: JSON.stringify({
        model: 'text-davinci-002',
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 1547,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    }).then(r => r.json())
  }
}

export default openAi
