// Write your code here
import './index.css'

const Appointmentitem = props => {
  const {appointmentDetails, onStarred} = props
  const {title, date, id, isStarred} = appointmentDetails

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onStarred(id)
  }
  return (
    <li className="box-cont">
      <div className="box-heading-cont">
        <p className="box-heading">{title}</p>
        <button
          onClick={onClickStar}
          type="button"
          className="star-button"
          data-testid="star"
        >
          <img src={starImg} alt="star" className="star-img" />
        </button>
      </div>
      <p>Date: {date}</p>
    </li>
  )
}

export default Appointmentitem
