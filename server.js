import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

// --- Groq client ---
const groq = new Groq({
  apiKey: process.env.GROQ_KEY
});

// --- Rota da ASLA ---
app.post("/asla", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "Você é a ASLA, assistente corporativa da Ascendant. Seja objetiva, profissional, educada e eficaz."
        },
        { role: "user", content: userMessage }
      ],
      temperature: 0.6,
      max_tokens: 300
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.error("ERRO NA ASLA:", err);
    res.json({ reply: "Erro ao processar a ASLA." });
  }
});

// --- Porta dinâmica Render ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("ASLA API rodando na porta " + PORT);
});
