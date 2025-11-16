import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

const client = new Groq({
    apiKey: process.env.GROQ_KEY
});

app.get("/", (req, res) => {
    res.send("ASLA API ONLINE 🚀");
});

app.post("/asla", async (req, res) => {
    try {
        const { message } = req.body;

        const r = await client.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [
                { role: "system", content: "Você é a ASLA, IA corporativa da Ascendant." },
                { role: "user", content: message }
            ]
        });

        res.json({ reply: r.choices[0].message.content });

    } catch (err) {
        console.error(err);
        res.json({ reply: "Erro ao processar a ASLA." });
    }
});

// CORREÇÃO PARA O RENDER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("ASLA API rodando na porta " + PORT));
