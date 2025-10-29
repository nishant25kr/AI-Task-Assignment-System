import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeticket = async (ticket) => {
  // ✅ Create AI agent
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-2.5-flash", // ✅ using the working model
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistant",
    system: `You are an expert AI assistant that processes technical support tickets.
Your job is to:
1. Summarize the issue.
2. Estimate its priority (low | medium | high).
3. Provide helpful notes and resource links.
4. List relevant technical skills required using short, general names only (e.g., "React", "JavaScript", "Node.js", "MongoDB", "UI/UX").


Respond ONLY with a **valid raw JSON object** (no markdown, code blocks, or commentary).`
  });

  try {
    // ✅ Ask the AI to analyze the ticket
    const response = await supportAgent.run(`
Analyze this support ticket and respond strictly in JSON:

{
  "summary": "short summary",
  "priority": "low | medium | high",
  "helpfulNotes": "detailed notes and possible resources",
  "relatedSkills": ["skill1", "skill2", ...]
}

Title: ${ticket.title}
Description: ${ticket.description}
`);

    let raw =
      response?.output?.[0]?.content ||
      response?.output?.[0]?.context ||
      response?.output ||
      "";

    const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = match ? match[1] : raw.trim();

    try {
      const parsed = JSON.parse(jsonString);
      return parsed;
    } catch (parseErr) {
      return { error: "Invalid JSON from AI", rawResponse: raw };
    }
  } catch (err) {
    return { error: err.message };
  }
};

export default analyzeticket;
