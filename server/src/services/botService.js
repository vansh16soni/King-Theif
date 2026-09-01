const { openai, MODEL } = require('../config/openai');
const { EMOTES } = require('../utils/constants');

function buildSystemPrompt({ role, username, otherPlayers, personality }) {
  return `You are a player in "Raja Mantri Chor Sipahi" - an Indian card game.
Your role in this round is: ${role} (Raja/Mantri/Sipahi/Chor)
Your username is: ${username}
Other players are: ${otherPlayers.join(', ')}

Game Rules:
- Raja gets 1000 points
- Mantri guesses who is Sipahi and who is Chor among the other 2 players
- If Mantri guesses right: Mantri=500, Sipahi=300, Chor=0
- If Mantri guesses wrong: Mantri=0, Sipahi=300, Chor=500

Your personality: ${personality} (friendly, competitive, mischievous, strategic, or nervous)

Reply with ONE short chat message (max 20 words) in character. No preamble, no quotes, just the message.`;
}

/**
 * Generate a short in-character chat line for a bot.
 */
async function generateBotChatMessage({ role, username, otherPlayers, personality, context }) {
  if (!openai) {
    return fallbackLine(personality);
  }
  try {
    const systemPrompt = buildSystemPrompt({ role, username, otherPlayers, personality });
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: context || 'Send a natural in-game chat message for this moment.' }
      ],
      max_tokens: 60,
      temperature: 0.8
    });
    return response.choices[0]?.message?.content?.trim() || fallbackLine(personality);
  } catch (err) {
    console.error('Bot chat generation failed:', err.message);
    return fallbackLine(personality);
  }
}

/**
 * Bot-as-Mantri: decide which of the two candidates is Sipahi vs Chor.
 * candidates: [{ playerId, username }, { playerId, username }]
 * chatLog: recent messages for context (array of strings)
 * Falls back to random guess if OpenAI call fails.
 */
async function generateBotGuess({ username, personality, candidates, chatLog }) {
  const [a, b] = candidates;
  if (!openai) {
    return Math.random() < 0.5
      ? { sipahiPlayerId: a.playerId, chorPlayerId: b.playerId }
      : { sipahiPlayerId: b.playerId, chorPlayerId: a.playerId };
  }
  try {
    const systemPrompt = `You are ${username}, playing Mantri in Raja Mantri Chor Sipahi.
Your personality: ${personality}.
You must guess which of these two players is Sipahi and which is Chor: ${a.username}, ${b.username}.
Recent chat: ${(chatLog || []).join(' | ')}
Respond with ONLY JSON, no markdown, no preamble: {"sipahi": "<username>", "chor": "<username>"}`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Make your guess now.' }
      ],
      max_tokens: 60,
      temperature: 0.7
    });
    const raw = response.choices[0]?.message?.content?.trim() || '';
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    const sipahiPlayer = [a, b].find(p => p.username === parsed.sipahi) || a;
    const chorPlayer = [a, b].find(p => p.username === parsed.chor) || b;
    return { sipahiPlayerId: sipahiPlayer.playerId, chorPlayerId: chorPlayer.playerId };
  } catch (err) {
    console.error('Bot guess generation failed, using random fallback:', err.message);
    return Math.random() < 0.5
      ? { sipahiPlayerId: a.playerId, chorPlayerId: b.playerId }
      : { sipahiPlayerId: b.playerId, chorPlayerId: a.playerId };
  }
}

function fallbackLine(personality) {
  const lines = {
    friendly: "Good luck everyone! 🤝",
    competitive: "I've got this round. 💪",
    mischievous: "Hehe, you'll never guess... 😏",
    strategic: "Watching closely this round.",
    nervous: "Oh no, hope I don't mess this up! 😰"
  };
  return lines[personality] || "Let's play!";
}

function randomEmote() {
  return EMOTES[Math.floor(Math.random() * EMOTES.length)];
}

module.exports = { generateBotChatMessage, generateBotGuess, randomEmote };
