import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDZmJPmVKiWPcTHgumxliCSUWbO8GjkC9c");

export async function generateQuestions(role) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
  Generate 5 interview questions for ${role}.
  Only return questions.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  return response.text().split("\n");
}