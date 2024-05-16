// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const appointmentsDetails = []

class Appointments extends Component {
  state = {
    appointmentList: appointmentsDetails,
    title: '',
    date: '',
    onClickStarred: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title && date) {
      const dateString = format(new Date(date), 'dd MMMM yyyy, EEEE')
      const newAppointment = {
        id: uuidv4(),
        title,
        date: dateString,
        isStarred: false,
      }
      this.setState(prevState => ({
        title: '',
        date: '',
        appointmentList: [...prevState.appointmentList, newAppointment],
      }))
    }
  }

  onStarredItems = () => {
    this.setState(prevState => ({onClickStarred: !prevState.onClickStarred}))
  }

  onStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onAddTitle = event => {
    this.setState({title: event.target.value})
  }

  onAddDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {appointmentList, title, date, onClickStarred} = this.state
    const filteredItems = onClickStarred
      ? appointmentList.filter(eachItem => eachItem.isStarred)
      : appointmentList

    return (
      <div className="main-cont">
        <div className="card-cont">
          <div className="card-desc">
            <div>
              <h1 className="main-heading">Add Appointment</h1>
              <form onSubmit={this.onAddAppointment}>
                <label htmlFor="title">TITLE</label>
                <br />
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  className="input-date"
                  onChange={this.onAddTitle}
                  value={title}
                  required
                />
                <br />
                <label htmlFor="appointmentdate">DATE</label>
                <br />
                <input
                  className="input-date"
                  type="date"
                  id="appointmentdate"
                  placeholder="dd/mm/yyyy"
                  onChange={this.onAddDate}
                  value={date}
                  required
                />
                <br />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="card-desc">
            <h1 className="main-heading2">Appointments</h1>
            <button
              type="button"
              className={`starred-button ${
                onClickStarred ? 'starbutton2' : ''
              }`}
              onClick={this.onStarredItems}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-cont">
            {filteredItems.map(eachItem => (
              <AppointmentItem
                appointmentDetails={eachItem}
                onStarred={this.onStarred}
                key={eachItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
