const ollamaClient = require('../ollama-client');

async function generateReview(diff, model) {
    const prompt = `
Review the following pull request diff. 

Focus on:
- Potential bugs or logical errors.
- Security vulnerabilities.
- Performance optimizations.
- Code quality and maintainability.

Provide actionable recommendations in markdown format.

---
${diff}
---
`;

    return await ollamaClient.generate(prompt, model);
}

module.exports = {
    generateReview
};
