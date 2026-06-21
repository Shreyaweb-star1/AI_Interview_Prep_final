import questions from "../data/questions.js";

export const getQuestions = (req, res) => {

  const role = req.query.role;

  const difficulty = req.query.difficulty;

  const result = questions[role]?.[difficulty];

  if (!result) {

    return res.status(404).json({

      message: "Questions not found"

    });

  }

  res.json(result);

};