function ReviewOutput({ review }) {
  return (
    <div className="review-output">
      <h2>Review</h2>
      <div dangerouslySetInnerHTML={{ __html: review }} />
    </div>
  )
}
export default ReviewOutput
