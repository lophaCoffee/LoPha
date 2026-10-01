import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { LOPHA_AI_SYSTEM_PROMPT, getSmartLocalResponse } from './src/utils/aiKnowledgeEngine';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI SDK
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// Proxy endpoint for Lopha Coffee AI Chat Agent
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // If Gemini API is available and key is present, query Gemini model
    if (ai) {
      try {
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

        // Add current user prompt
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
          return res.json({ text: replyText, source: 'gemini-3.8-flash' });
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to smart local knowledge engine:', geminiErr);
      }
    }

    // Fallback to grounded local knowledge engine
    const fallbackText = getSmartLocalResponse(message);
    return res.json({ text: fallbackText, source: 'local-knowledge-engine' });
  } catch (error) {
    console.error('Error handling /api/chat:', error);
    const fallbackText = getSmartLocalResponse(req.body?.message || '');
    return res.json({ text: fallbackText, source: 'local-fallback' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Lopha Coffee',
    company: 'Công ty TNHH SX - TM - DV Long Phan',
    aiEnabled: !!ai
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development mode with Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serve
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lopha Coffee Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
