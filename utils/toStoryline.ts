import { Questions } from '../types.ts';

function clean(str: string) {
  return str.replace(/^[A-Z0-9]\./i, '').replace(/\|+/g, ' ').trim()
}

export default function toStoryline(questions: Questions) {
  const storyLine = []

  for (const question of questions) {
    storyLine.push('MC')
    storyLine.push('5')
    storyLine.push(clean(question.text))
    for (const answer of question.answers) {
      if (answer.correct) {
        storyLine.push(`*${clean(answer.text)} | Correct`)
      } else {
        storyLine.push(`${clean(answer.text)} | Incorrect`)
      }
    }
    storyLine.push('')
  }

  return storyLine.join('\n')
}
