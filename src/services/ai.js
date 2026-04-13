import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

// ===== AI CHAT (already used) =====
export const getTravelAdvice = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a smart African travel assistant. Keep answers short and practical.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    return "AI error. Check API key.";
  }
};

// ===== PRICE PREDICTION =====
export const predictPrice = async (flight) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a flight price prediction assistant. Answer short: Buy now or Wait, with a brief reason.",
        },
        {
          role: "user",
          content: `Flight from ${flight.from} to ${flight.to}, price ${flight.price}, departure ${flight.departure}. Should I buy now or wait?`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    return "Prediction error.";
  }
};