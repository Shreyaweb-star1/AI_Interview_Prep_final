import { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export function InterviewProvider({ children }) {

  const [role, setRole] = useState("frontend");

  const [difficulty, setDifficulty] = useState("easy");

  const [answers, setAnswers] = useState([]);

  const resetInterview = () => {
    setAnswers([]);
  };

  return (
    <InterviewContext.Provider
      value={{
        role,
        setRole,
        difficulty,
        setDifficulty,
        answers,
        setAnswers,
        resetInterview,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );

}

export function useInterview() {
  return useContext(InterviewContext);
}

export default InterviewContext;
