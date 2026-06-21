import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getQuestions } from "../services/interviewService";
import Loader from "../components/Loader";

function Interview() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || "frontend";
  const difficulty = location.state?.difficulty || "easy";
  const useRealAI = location.state?.useRealAI || false;

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestions(role, difficulty);
        setSelectedQuestions(res.data);
      } catch (err) {
        setError("Failed to load questions. Is the server running?");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [role, difficulty]);

  useEffect(() => {
    setTime(0);
    const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [currentQuestion]);

  if (loading) return <Loader />;
  if (error) {
    return <div className="interview-page"><div className="interview-container"><p style={{color: "red"}}>{error}</p></div></div>;
  }

  const question = selectedQuestions[currentQuestion];

  const nextQuestion = () => {
    if (answer.trim() === "") {
      alert("Please write an answer before proceeding.");
      return;
    }

    const newAnswer = { question, answer, time };

    const updatedAnswers = [...answers, newAnswer];

    if (currentQuestion === selectedQuestions.length - 1) {
      navigate("/feedback", { 
        state: { 
          answers: updatedAnswers,
          useRealAI 
        } 
      });
    } else {
      setAnswers(updatedAnswers);
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
    }
  };

  return (
    <div className="interview-page">
      <div className="interview-container">
        <div className="interview-header">
          <h1>Interview Session</h1>
          <p>Question {currentQuestion + 1} / {selectedQuestions.length}</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / selectedQuestions.length) * 100}%` }} />
        </div>

        <div style={{ textAlign: "center", margin: "15px 0", fontSize: "18px", fontWeight: "bold" }}>
          Time: <span style={{ color: "#60a5fa" }}>{time}s</span>
        </div>

        <div className="question-card">
          <p className="question-number">Question {currentQuestion + 1}</p>
          <h2>{question}</h2>
        </div>

        <textarea
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button onClick={nextQuestion}>
          {currentQuestion === selectedQuestions.length - 1 ? "Finish Interview" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default Interview;