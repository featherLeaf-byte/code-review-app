'use client'
import { useState, useRef } from 'react'
import ReviewSubmitButton from './ReviewSubmitButton'
import ReviewOutput from './ReviewOutput'
import Editor from '@monaco-editor/react'

function ReviewTextArea() {
  const [review, setReview] = useState('')
  const [code, setCode] = useState('')
  async function handleSubmit() {
    if (!editorRef.current.getValue()) {
      alert('Missing code input!')
    } else
      try {
        const url = '/api/suggestions'
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editorRef.current.getValue()),
        })
        if (!res.ok) {
          const data = await res.json()
          console.log(data)
        }
        const { result } = await res.json()
        setReview(result)
      } catch (err) {
        alert(err)
      }
  }
  const editorRef = useRef(null)
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
  }
  return (
    <>
      <div className="code-form">
        <h2 htmlFor="code-box">Insert Code</h2>
        <Editor
          height="300px"
          language="javascript"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            inlineSuggest: true,
            fontSize: '16px',
            formatOnType: true,
            autoClosingBrackets: true,
          }}
        />
        <ReviewSubmitButton handleSubmit={handleSubmit} />
      </div>
      <ReviewOutput review={review} />
    </>
  )
}
export default ReviewTextArea
