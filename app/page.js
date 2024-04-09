import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
      <form class="code-form" action="">
        <label for="code-box">Insert Code</label>
        <textarea name="" id="code-box" cols="30" rows="10">
          {' '}
        </textarea>
        <button class="code-submit-btn">Review Code</button>
      </form>
      <div class="review-output">
        <h2>Code Review</h2>
      </div>
    </main>
  )
}
