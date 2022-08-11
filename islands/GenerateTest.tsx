/** @jsx h */
import { Fragment, h } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import { Questions, TestFormat, Answers } from '../types.ts';
import toStoryline from '../utils/toStoryline.ts';
import Loading from '../components/Loading.tsx';
import Overlay from '../components/Overlay.tsx';
import Logo from '../components/Logo.tsx';

export default function Test() {
  useEffect(() => {
    const onLoad = () => {
      setTimeout(() => {
        document.getElementById('entry')?.focus?.()
      }, 1000)
    }
    self.addEventListener('load', onLoad)
    return () => {
      self.removeEventListener('load', onLoad)
    }
  }, [])

  const [pageState, setPageState] = useState<'ok' | 'loading' | 'error'>('ok')
  const [text, setText] = useState('')
  const [test, setTest] = useState([] as Questions)

  const onSubmit = useCallback(async (ev: { preventDefault: () => void; }) => {
    ev.preventDefault()
    if (!text.length) {
      return
    }
    try {
      setPageState('loading')

      const resp: TestFormat = await fetch('./api/generate-test', {
        method: 'POST',
        body: JSON.stringify({ text })
      }).then(r => r.json() as unknown as TestFormat)

      const answers: Answers = await fetch('./api/get-answers', {
        method: 'POST',
        body: JSON.stringify({ text: resp.text })
      }).then(r => r.json() as unknown as Answers)

      answers.forEach((a, i) => {
        resp.questions[i].answers[a.letterIndex].correct = true
      })

      setTest(resp.questions)
      setPageState('ok')
    } catch (err) {
      setPageState('error')
    }
  }, [text])

  const onDownload = useCallback(() => {
    const text = toStoryline(test)
    const blob = new Blob([text], {type: 'text/plain'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'storyline-test.txt'
    a.click()
    URL.revokeObjectURL(url)
  }, [test])

  return (
    <Fragment>
      <Overlay show={pageState === 'error'} opacity={0.99}>
        <h3 style={{ color: 'red', fontSize: 30, marginBottom: '20px', fontWeight: 'bold' }}>An unexpected error occurred.</h3>
        <button onClick={onSubmit}>Try Again?</button>
      </Overlay>
      <Loading show={pageState === 'loading'} />
      <Logo />
      <div id="content">
        {test.length ? test.map((question, i) => (
          <div class="question" key={`$question_${i}`}>
            <h3>{question.text}</h3>
            <ul>
              {question.answers.map((answer, j) => (
                <li class="answer" key={`$answer_${i}_${j}`}>
                  {answer.text} {answer.correct ? '✅' : ''}
                </li>
              ))}
            </ul>
          </div>
        )) : (
          <form onSubmit={onSubmit}>
            <div class="heading">
              Enter or paste the material you want to test on.
            </div>
            <textarea id="entry" value={text} onChange={(ev) => setText(ev.currentTarget.value)} />
            <button type="submit">Generate Test</button>
          </form>
        )}
        {test.length ? (
          <a href="#" class="storylineLink" onClick={onDownload}>Download Storyline Format</a>
        ) : null}
      </div>
    </Fragment>
  );
}
