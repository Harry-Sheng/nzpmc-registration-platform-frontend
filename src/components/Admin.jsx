import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap"
import Exam from "../assets/exam.png"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import eventService from "../services/Events"
import Notification from "../components/Notification"
import CreateEventForm from "../components/CreateEventForm"

const AdminDashboard = ({ users }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const updatedEvents = await eventService.fetchEvents()
      setEvents(updatedEvents.data)
      // This is very important it set the events immediately after fetching
      console.log("Events after fetchEvents (not state):", updatedEvents.data)
    } catch (error) {
      console.error("Failed to fetch events:", error)
    }
  }

  const handleCreateEvent = async (event) => {
    event.preventDefault()
    try {
      const createdEvent = await eventService.create({
        name,
        description,
        date,
      })
      setName("")
      setDescription("")
      setDate("")
      await fetchEvents()
      console.log("Events:", events)
    } catch (error) {
      setErrorMessage("Event already exists")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <Notification message={errorMessage} variant="danger" />
      <Row className="g-4">
        <Col md={8}>
          {/* Events Section */}
          <h2 className="mb-4"> Events</h2>
          {events.map((event, index) => (
            <Card key={index} className="mb-3 shadow-sm rounded">
              <Card.Body className="d-flex align-items-center">
                <Col xs={3}>
                  <img
                    src={Exam}
                    alt="Event"
                    className="img-fluid rounded"
                    style={{ maxHeight: "100px", objectFit: "cover" }}
                  />
                </Col>
                <Col xs={7} className="ps-3">
                  <h5 className="mb-1">{event.name}</h5>
                  <p className="text-muted mb-1">{event.description}</p>
                  <p className="text-muted mb-0">{event.date}</p>
                </Col>
              </Card.Body>
            </Card>
          ))}

          {/* Accounts Section */}
          <h2 className="mb-4"> Accounts</h2>
          {users.map((user, index) => (
            <Card key={index} className="mb-3 shadow-sm rounded">
              <Card.Body className="d-flex align-items-center">
                <Col xs={3}>
                  <img
                    src={Exam}
                    alt="Event"
                    className="img-fluid rounded"
                    style={{ maxHeight: "100px", objectFit: "cover" }}
                  />
                </Col>
                <Col xs={7} className="ps-3">
                  <h5 className="mb-1">{user.name}</h5>
                  <p className="text-muted mb-1">{user.email}</p>
                  {user.events && user.events.length > 0 ? (
                    user.events.map((event, eventIndex) => (
                      <p key={eventIndex} className="text-muted mb-0">
                        {event.name}
                      </p>
                    ))
                  ) : (
                    <p className="text-muted mb-0">No Events Available</p>
                  )}
                </Col>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Create event Section */}
        <Col md={4}>
          <CreateEventForm
            name={name}
            description={description}
            date={date}
            setName={setName}
            setDescription={setDescription}
            setDate={setDate}
            handleCreateEvent={handleCreateEvent}
          />
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboard
