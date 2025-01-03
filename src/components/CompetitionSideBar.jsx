import { Button, Card, ProgressBar } from "react-bootstrap"

export function CompetitionSideBar({
  formatTime,
  timeElapsed,
  progress,
  currentQuestion,
  handleQuestionSelect,
  handleSubmit,
  questions,
  selectedAnswers,
}) {
  return (
    <Card>
      <Card.Body>
        <h5>Time: {formatTime(timeElapsed)}</h5>
        <ProgressBar now={progress} variant="success" className="mb-3" />
        <div className="d-grid gap-2">
          {questions.map((question, index) => (
            <Button
              key={index}
              variant={
                currentQuestion === index ? "primary" : "outline-primary"
              }
              className="text-start position-relative"
              onClick={() => handleQuestionSelect(index)}
            >
              Question {index + 1}
              {selectedAnswers.get(questions[index].title) !== -1 && (
                <span className="position-absolute top-50 end-0 translate-middle-y me-2 text-success">
                  ✓
                </span>
              )}
            </Button>
          ))}
          <Button variant="success" className="mt-3" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
