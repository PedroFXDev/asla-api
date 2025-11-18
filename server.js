import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

// Debug
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

// ASLA ROUTE — usando modelo atualizado da Groq
app.post("/asla", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // MODELO NOVO E ATIVO
      messages: [
        {
          role: "system",
          content:
            "Você é ASLA, assistente corporativa da Ascendant. Seja objetiva, clara e profissional."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 20000,
      temperature: 0.5
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("======== ERRO GROQ REAL ========");
    console.error(error);
    console.error("================================");

    res.json({
      reply: "Erro ao processar a ASLA. Error #101",
      error: String(error)
    });
  }
});

// Porta Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("ASLA API ativa na porta " + PORT);
  console.log("VERSAO EXECUTADA: ASLA-BUILD-FINAL-200%");
});
