const axios = require('axios');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || 'llama3.2';

async function generate(prompt, model = DEFAULT_MODEL) {
    try {
        const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
            model: model,
            prompt: prompt,
            stream: false
        });
        return response.data.response;
    } catch (error) {
        console.error('Ollama Client Error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to communicate with Ollama');
    }
}

module.exports = {
    generate
};
