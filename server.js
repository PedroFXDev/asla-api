import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// Debug Route
// =====================
app.get("/debug", (req, res) => {
  res.json({
    GROQ_KEY: process.env.GROQ_KEY ? "OK" : "MISSING",
    PORT: process.env.PORT
  });
});

// =====================
// Groq Client
// =====================
const groq = new Groq({
  apiKey: process.env.GROQ_KEY
});

// =====================
// ASLA Chat Route (FINAL VERSION)
// =====================
app.post("/asla", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",   // MODELO ATUAL, SUPORTADO, FUNCIONA!
      messages: [
        {
          role: "system",
          content:
            "Você é ASLA, a assistente corporativa da Ascendant. Sempre responda com clareza, objetividade e profissionalismo."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.5,
      max_tokens: 300
    });

    const reply = completion.choices[0].message.content;
    return res.json({ reply });

  } catch (error) {
    console.error("======== ERRO GROQ REAL ========");
    console.error(error);
    console.error("================================");

    return res.json({
      reply: "Erro ao processar a ASLA.",
      error: String(error)
    });
  }
});

// =====================
// Porta dinâmica (Render)
// =====================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("ASLA API ativa na porta " + PORT);
  console.log("VERSAO EXECUTADA: ASLA-BUILD-FINAL-100%");
});
