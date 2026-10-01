export default function handler(req: any, res: any) {
  res.status(200).json({
    status: 'ok',
    brand: 'Lopha Coffee',
    company: 'Công ty TNHH SX - TM - DV Long Phan',
    aiEnabled: !!process.env.GEMINI_API_KEY
  });
}
