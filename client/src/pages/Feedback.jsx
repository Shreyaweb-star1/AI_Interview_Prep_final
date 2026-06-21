import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { evaluateAnswer } from "../services/interviewService";
import Loader from "../components/Loader";
import FeedbackCard from "../components/FeedbackCard";

function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const rawAnswers = location.state?.answers || [];
  const useRealAI = location.state?.useRealAI || false;

  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rawAnswers.length === 0) {
      setLoading(false);
      return;
    }

    const fetchFeedback = async () => {
      try {
        const results = await Promise.all(
          rawAnswers.map((item) =>
            evaluateAnswer(item.question, item.answer, useRealAI).then((res) => ({
              ...res.data,
              time: item.time,
            }))
          )
        );
        setFeedbackData(results);
      } catch (err) {
        console.error(err);
        setFeedbackData(rawAnswers.map(item => ({
          ...item,
          score: 5,
          feedback: "Could not get feedback. Please try again later.",
          isMock: true
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [rawAnswers, useRealAI]);

  const averageScore = feedbackData.length
    ? (feedbackData.reduce((sum, item) => sum + (item.score || 0), 0) / feedbackData.length).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="feedback-page" style={{ justifyContent: "center", alignItems: "center" }}>
        <Loader />
        <p style={{ marginTop: "20px", color: "#94a3b8" }}>Analyzing your responses...</p>
      </div>
    );
  }

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <h1>Interview Feedback</h1>
        <p className="feedback-subtitle">
          Overall Score: <strong style={{ color: "#22c55e" }}>{averageScore} / 10</strong>
        </p>

        {feedbackData.map((item, index) => (
          <FeedbackCard
            key={index}
            index={index}
            question={item.question}
            answer={item.answer}
            score={item.score}
            feedback={item.feedback}
            time={item.time}
            isMock={item.isMock}
          />
        ))}

        <button onClick={() => navigate("/")} style={{ marginTop: "30px" }}>
          Start New Interview
        </button>
      </div>
    </div>
  );
}

export default Feedback;