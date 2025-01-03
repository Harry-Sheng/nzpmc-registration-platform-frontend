import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import Notification from "./Notification"
import competitionService from "../services/Competitions"

const AddQuestionForm = ({ competitionId, handleQuestionUpdate }) => {
  const [title, setTitle] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctChoice, setCorrectChoice] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleCreateQuestion = async (event) => {
    event.preventDefault()
    if (!title || !correctChoice || options.some((option) => !option)) {
      setErrorMessage("Please fill out all fields correctly.")
      setTimeout(() => setErrorMessage(null), 5000)
      return
    }

    try {
      const newQuestion = {
        title,
        options,
        correctChoiceIndex: parseInt(correctChoice),
      }

      await competitionService.addQuestionToCompetition(
        competitionId,
        newQuestion
      )
      handleQuestionUpdate(newQuestion)

      setTitle("")
      setOptions(["", "", "", ""])
      setCorrectChoice("")

      setSuccessMessage("Question created successfully!")
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (error) {
      console.error("Failed to create question:", error)
      setErrorMessage("Failed to create question. Please try again.")
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options]
    updatedOptions[index] = value
    setOptions(updatedOptions)
  }

  return (
    <>
      <Form
        onSubmit={handleCreateQuestion}
        className="p-4 border rounded shadow-sm bg-light"
        style={{ margin: "auto" }}
      >
        <h3 className="text-center mb-4">Add Question</h3>
        <Form.Group className="mb-3" controlId="questionTitle">
          <Form.Label>Question Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter question title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>

        {options.map((option, index) => (
          <Form.Group key={index} className="mb-3" controlId={`option${index}`}>
            <Form.Label>Option {index + 1}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter option ${index + 1}`}
              value={option}
              onChange={({ target }) => handleOptionChange(index, target.value)}
            />
          </Form.Group>
        ))}

        <Form.Group className="mb-3" controlId="correctChoice">
          <Form.Label>Correct Choice (0-3)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="3"
            placeholder="Enter correct choice (0-3)"
            value={correctChoice}
            onChange={({ target }) => setCorrectChoice(target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Create
        </Button>
      </Form>
      <br></br>
      {/* Notifications */}
      <Notification message={errorMessage} variant="danger" />
      <Notification message={successMessage} variant="success" />
    </>
  )
}

export default AddQuestionForm
