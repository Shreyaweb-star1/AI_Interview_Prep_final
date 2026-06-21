import api from "./api";

export const getQuestions = (role, difficulty) => {
  return api.get(`/questions?role=${role}&difficulty=${difficulty}`);
};

export const evaluateAnswer = (question, answer, useRealAI = false) => {
  return api.post("/feedback", { question, answer, useRealAI });
};