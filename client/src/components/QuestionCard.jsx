function QuestionCard({ questionNumber, question }) {
  return (
    <div className="question-card">
      <p className="question-number">Question {questionNumber}</p>
      <h2>{question}</h2>
    </div>
  );
}

export default QuestionCard;
