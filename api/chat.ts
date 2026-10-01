import { GoogleGenAI } from '@google/genai';
import { LOPHA_AI_SYSTEM_PROMPT, getSmartLocalResponse } from '../src/utils/aiKnowledgeEngine';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        history.forEach((h: { role: string; parts: Array<{ text: string }> }) => {
          if (h && (h.role === 'user' || h.role === 'model') && Array.isArray(h.parts) && h.parts[0]?.text) {
            contents.push({
              role: h.role,
              parts: [{ text: h.parts[0].text }]
            });
          }
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const result = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: LOPHA_AI_SYSTEM_PROMPT,
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      });

      const replyText = result.text;
      if (replyText) {
        return res.status(200).json({ text: replyText, source: 'gemini-3.8-flash' });
      }
    } catch (e) {
      console.warn('Gemini API call failed on Vercel handler:', e);
    }
  }

  const fallbackText = getSmartLocalResponse(message);
  return res.status(200).json({ text: fallbackText, source: 'local-knowledge-engine' });
}
