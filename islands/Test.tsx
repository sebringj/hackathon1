/** @jsx h */
import { Fragment, h } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import { Questions } from '../routes/api/generate-test.ts';

export default function Test() {
  useEffect(() => {
    const onLoad = () => {
      setTimeout(() => {
        document.getElementById('entry')?.focus?.()
      }, 1000)
    }
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
    }
  }, [])

  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [test, setTest] = useState([] as Questions)

  const onSubmit = useCallback(async (ev) => {
    ev.preventDefault()
    if (!text.length) {
      return
    }
    try {
      setLoading(true)
      const resp: Questions = await fetch('./api/generate-test', {
        method: 'POST',
        body: JSON.stringify({ text })
      })
      .then(r => r.json() as Questions)
      setTest(resp)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [text])

  return (
    <Fragment>
        <div style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          pointerEvents: loading ? 'all' : 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: loading ? 1 : 0 }}>
          <img src="/loading.svg" style="width: 100px; height: 100px;" />
        </div>
        <div className="frameWrapper">
          <iframe src='https://my.spline.design/untitled-248c8901098b19a62ce3304de7cb96e1/' frameBorder='0' id="articulate-logo"></iframe>
        </div>
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
        </div>
      </Fragment>
  );
}
