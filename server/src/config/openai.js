const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-xxxx'
  ? process.env.OPENAI_API_KEY.trim()
  : null;

const openai = apiKey ? new OpenAI({ apiKey }) : null;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

module.exports = { openai, MODEL };

