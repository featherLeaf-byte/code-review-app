import Markdown from 'react-markdown'
import { DotLoader } from 'react-spinners'
function ReviewOutput({ review, isLoading }) {
  return (
    <div className="review-output">
      <h2>Review</h2>
      {isLoading == true ? (
        <DotLoader color="#ffffff" />
      ) : !review ? (
        <p>...code review will be displayed here...</p>
      ) : (
        <Markdown>{review}</Markdown>
      )}
    </div>
  )
}
export default ReviewOutput
