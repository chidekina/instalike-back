import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateText(req, res) {
    const prompt = "Gere uma descrição em português do brasil para a seguinte imagem";
 
    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };
            const res = await model.generateText([prompt, image]);
            return res.response.text() || "Alt-text não disponível";
    } catch {
        console.error("Erro ao obter alt-text", error.message);
        throw new Error("Erro ao obter alt-text");
    }
}