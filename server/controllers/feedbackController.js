// server/controllers/feedbackController.js
import answerBank from "../data/answerBank.js";  
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Groq Client
const groq = process.env.GROQ_API_KEY 
  ? new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    })
  : null;

// Grok (xAI) Client
const grok = process.env.XAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.XAI_API_KEY,
      baseURL: "https://api.x.ai/v1",
    })
  : null;

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) 
  : null;

export const evaluateAnswer = async (req, res) => {
  const { question, answer, useRealAI = false } = req.body;

  if (!answer?.trim()) {
    return res.status(400).json({ message: "Answer is required" });
  }

  const prompt = `You are a senior software engineer interviewing a fresher candidate.

Question: "${question}"
Candidate Answer: "${answer}"

Return **only** valid JSON in this exact format:
{
  "score": <number from 1 to 10>,
  "feedback": "2-4 sentences: what was good, what was missing, and one specific improvement tip"
}`;

  // === REAL AI ATTEMPT (Priority: Groq → Grok → Gemini → OpenAI) ===
  if (useRealAI) {

    // 1. Groq (Fast & Generous Free Tier)
    if (groq) {
      try {
        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 300,
        });

        let text = completion.choices[0].message.content.trim();
        text = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(text);

        return res.json({
          question,
          answer,
          score: parsed.score,
          feedback: parsed.feedback,
          isMock: false
        });
      } catch (err) {
        console.log("Groq failed");
      }
    }

    // 2. Grok (xAI)
    if (grok) {
      try {
        const completion = await grok.chat.completions.create({
          model: "grok-3",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 300,
        });

        let text = completion.choices[0].message.content.trim();
        text = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(text);

        return res.json({
          question,
          answer,
          score: parsed.score,
          feedback: parsed.feedback,
          isMock: false
        });
      } catch (err) {
        console.log("Grok failed");
      }
    }

    // 3. Gemini
    if (process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();
        text = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(text);

        return res.json({
          question,
          answer,
          score: parsed.score,
          feedback: parsed.feedback,
          isMock: false
        });
      } catch (err) {
        console.log("Gemini failed");
      }
    }

    // 4. OpenAI
    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 300,
        });

        let text = completion.choices[0].message.content.trim();
        text = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(text);

        return res.json({
          question,
          answer,
          score: parsed.score,
          feedback: parsed.feedback,
          isMock: false
        });
      } catch (err) {
        console.log("OpenAI failed");
      }
    }
  }

    // === STRICT SMART MOCK USING ANSWER BANK ===
  const qLower = question.toLowerCase();
  const aLower = answer.toLowerCase();
  const length = aLower.length;

  let score = 2;           // Minimum score is now 2
  let feedback = "Answer needs significant improvement.";

  // Try to find matching question in answerBank
  let expected = null;

  Object.values(answerBank).forEach(category => {
    Object.values(category).forEach(difficultyLevel => {
      Object.keys(difficultyLevel).forEach(q => {
        if (q.toLowerCase() === qLower) {
          expected = difficultyLevel[q];
        }
      });
    });
  });

  if (expected) {
    const matched = expected.keywords.filter(kw => aLower.includes(kw)).length;

    if (matched >= 3) {
      score = 8;
      feedback = "Strong and relevant answer with good technical coverage.";
    } 
    else if (matched === 2) {
      score = 6;
      feedback = "Partially relevant. Include more key technical terms.";
    } 
    else if (matched === 1) {
      score = 4;
      feedback = "Answer is only slightly relevant. Focus more on the question topic.";
    } 
    else {
      score = 2;   // Strict minimum for completely off-topic answers
      feedback = "Answer is not relevant to the question. Please answer what was asked.";
    }
  } 
  else {
    // For questions not in answerBank
    if (length < 50) {
      score = 2;
      feedback = "Answer is too short and unclear.";
    } else {
      score = 3;
      feedback = "Answer is off-topic or lacks relevance to the question.";
    }
  }

  // Small length bonus only if somewhat relevant
  if (length > 160 && score >= 4) {
    score = Math.min(9, score + 1);
  }

  res.json({
    question,
    answer,
    score: Math.min(10, score),
    feedback,
    isMock: true,
    message: "Using Strict Smart Mock Evaluation"
  });
};