import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.KEY
});

app.post("/ai", async (req, res) => {
  try {
    const { text } = req.body;
    const response = await client.responses.create({
      model: "gpt-5",
      input: text
    });
    res.json({ reply: response.output_text });
  } catch (e) {
    res.status(500).json({ error: "حدث خطأ في الذكاء الاصطناعي" });
  }
});

app.listen(3000, () => {
  console.log("السيرفر يعمل على http://localhost:3000");
});