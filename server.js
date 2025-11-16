import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

// DEBUG ROUTE
app.get("/debug", (req, res) => {
  res.json({
    GROQ_KEY: process.env.GROQ_KEY ? "OK" : "MISSING",
    PORT: process.env.PORT
  });
});

// Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_KEY
});

// ASLA route
app.post("/asla", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

   const completion = await groq.chat.completions.create({
  model: "llama3-8b-8192",
  messages: [
    {
      role: "system",
      content:
        "Você é ASLA, a assistente operacional da Ascendant. Responda de forma profissional e clara."
    },
    {
      role: "user",
      content: userMessage
    }
  ],
  temperature: 0.3,
  max_tokens: 300,
  top_p: 1,
  stream: false
});


    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    console.error("ASLA ERRO:", err);
    res.json({ reply: "Erro ao processar a ASLA." });
  }
});

// Render dynamic port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("ASLA API ativa na porta " + PORT));
console.log("VERSAO EXECUTADA: ASLA-BUILD-77");

