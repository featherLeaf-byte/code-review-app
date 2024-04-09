'use client'
import { useState } from 'react'
import ReviewSubmitButton from './ReviewSubmitButton'
import ReviewOutput from './ReviewOutput'

function ReviewTextArea() {
  const [review, setReview] = useState('')
  const [code, setCode] = useState('')

  async function handleSubmit() {
    if (!code) {
      alert('Missing code input!')
    }
    try {
      const url = '/api/suggestions'
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(code),
      })
      const { result } = await res.json()
      setReview(result)
    } catch (err) {
      alert(err)
    }
  }
  return (
    <>
      <div className="code-form">
        <label htmlFor="code-box">Insert Code</label>
        <textarea
          placeholder="Code goes here...."
          id="code-box"
          cols="30"
          rows="10"
          onChange={(e) => {
            e.preventDefault
            setCode(e.target.value)
          }}
        ></textarea>
        <ReviewSubmitButton handleSubmit={handleSubmit} />
      </div>
      <ReviewOutput review={review} />
    </>
  )
}
export default ReviewTextArea
