'use client'
import { useState, useRef } from 'react'
import ReviewSubmitButton from './ReviewSubmitButton'
import ReviewOutput from './ReviewOutput'
import Editor from '@monaco-editor/react'

function ReviewTextArea() {
  const [review, setReview] = useState('')
  const editorRef = useRef(null)
  const [isLoading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!editorRef.current?.getValue()) {
      alert('Missing code input!')
    }
    try {
      setLoading(true)
      const url = '/api/suggestions'
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editorRef.current?.getValue()),
      })
      if (res.ok) {
        const { result } = await res.json()
        setLoading(false)
        setReview(result)
      } else {
        alert('There was an issue with the OpenAI API...')
      }
    } catch (err) {
      alert(err)
    }
  }
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
  }
  return (
    <>
      <div className="code-form">
        <h2>Insert Code</h2>
        <Editor
          height="300px"
          language="javascript"
          theme="vs-dark"
          value="//Code goes here..."
          options={{
            inlineSuggest: true,
            fontSize: '16px',
            formatOnType: true,
            autoClosingBrackets: true,
          }}
          onMount={handleEditorDidMount}
        />
        <ReviewSubmitButton handleSubmit={handleSubmit} />
      </div>
      <ReviewOutput review={review} isLoading={isLoading} />
    </>
  )
}
export default ReviewTextArea
