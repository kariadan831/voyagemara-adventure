import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
console.log("OPENAI KEY START:", process.env.OPENAI_API_KEY?.slice(0, 10));
const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.send("✅ VoyageMara AI Server is running");
});

// Chat route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are VoyageMara Safaris' AI assistant. Help visitors learn about Maasai Mara, Amboseli, Lake Nakuru, Samburu, and other Kenya safari destinations. Be friendly, concise, and encourage booking through WhatsApp: +254705814181.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI Error:", error);

    res.status(500).json({
      reply: "Sorry, I'm having trouble responding right now.",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 VoyageMara AI Server running at http://localhost:${PORT}`);
});