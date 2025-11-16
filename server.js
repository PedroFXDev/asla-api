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
                { role: "system", content: "Você é a ASLA, IA corporativa da Ascendant. Seja objetiva e clara." },
                { role: "user", content: message }
            ]
        });

        res.json({ reply: r.choices[0].message.content });

    } catch (error) {
        console.log(error);
        res.json({ reply: "Erro ao processar requisição da ASLA." });
    }
});

app.listen(10000, () => {
    console.log("ASLA API rodando na porta 10000");
});
