function FeedbackCard({ 
  index, 
  question, 
  answer, 
  score, 
  feedback, 
  time, 
  isMock = false 
}) {
  return (
    <div className="feedback-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3>Question {index + 1}</h3>
          <p style={{ color: "#94a3b8", marginTop: "8px" }}>
            Time Taken: {time}s
          </p>
        </div>
        <div className="score-badge">{score} / 10</div>
      </div>

      {/* AI Status Warning */}
      {isMock && (
        <div style={{
          backgroundColor: "#1e2937",
          color: "#fbbf24",
          padding: "10px 14px",
          borderRadius: "8px",
          marginBottom: "18px",
          fontSize: "14px",
          borderLeft: "4px solid #fbbf24"
        }}>
          &#9888; AI service is currently unavailable — Using Mock Evaluation
        </div>
      )}

      <p className="feedback-question">{question}</p>

      <div className="answer-box">
        {answer || "No answer provided"}
      </div>

      <div className="feedback-text">
        {feedback || (
          score >= 8
            ? "Strong answer with good explanation."
            : score >= 7
            ? "Good answer but can be improved with examples."
            : "Answer is too short. Try explaining in more detail."
        )}
      </div>
    </div>
  );
}

export default FeedbackCard;