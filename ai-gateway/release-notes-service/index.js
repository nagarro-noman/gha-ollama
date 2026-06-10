const ollamaClient = require('../ollama-client');

async function generateReleaseNotes(commits, model) {
    const prompt = `
Generate professional release notes based on the following commit messages.

Group changes by:
- Features
- Fixes
- Improvements
- Breaking Changes

Provide the output in markdown format.

---
${commits}
---
`;

    return await ollamaClient.generate(prompt, model);
}

module.exports = {
    generateReleaseNotes
};
