import { SiSendinblue } from 'react-icons/si'
function ReviewSubmitButton({ handleSubmit }) {
  return (
    <button className="code-submit-btn" onClick={handleSubmit}>
      <SiSendinblue />
      Review Code
    </button>
  )
}
export default ReviewSubmitButton
