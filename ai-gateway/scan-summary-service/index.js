const ollamaClient = require('../ollama-client');

async function summarizeScan(scanResults, model) {
    const prompt = `
Summarize the following security scan results (Trivy, SonarQube, or Dependency-Check).

Provide:
- A high-level summary of risks.
- Top critical and high vulnerabilities.
- Recommended immediate actions.

Output example:
Critical: X
High: Y

Top Risks:
1. ...

Recommended Actions:
...

---
${scanResults}
---
`;

    return await ollamaClient.generate(prompt, model);
}

module.exports = {
    summarizeScan
};
