const ollamaClient = require('../ollama-client');

async function analyzeInfra(diff, model) {
    const prompt = `
Review the following infrastructure change (CloudFormation, CDK, Terraform, or Kubernetes).

Check:
- Security vulnerabilities
- IAM permissions (least privilege)
- Cost impact
- Reliability
- AWS/Cloud best practices

Provide actionable recommendations in markdown format.

---
${diff}
---
`;

    return await ollamaClient.generate(prompt, model);
}

module.exports = {
    analyzeInfra
};
