const ollamaClient = require('../ollama-client');

async function analyzeInfra(diff, model) {
    const prompt = `
You are an expert Cloud Architect and Security Engineer. 
Review the following infrastructure changes. The input provided below contains the Git Diff and, if available, the Terraform Plan Output.

### Your Goal:
Analyze the changes to identify security risks, cost implications, reliability concerns, and adherence to AWS/Cloud best practices.

### Instructions:
1. **Git Diff Analysis**: Review the code changes (HCL, YAML, etc.) for misconfigurations or hardcoded secrets.
2. **Terraform Plan Analysis**: If a "Terraform Plan Output" section is present, prioritize it to understand the ACTUAL impact.
   - Look for "destroy" or "replace" actions on critical resources (e.g., databases, networking).
   - Verify if the plan aligns with the intent of the code changes.
   - Check for any unexpected side effects or resources being created/modified.
3. **Categories to Cover**:
   - **Security**: IAM permissions (least privilege), encryption, network exposure (Security Groups/NACLs).
   - **Cost**: Identify any resources that might lead to significant cost increases.
   - **Reliability**: Single points of failure, lack of multi-AZ, missing backup/recovery configurations.
   - **Best Practices**: Naming conventions, tagging, modularization.

### Output Format:
Provide your analysis in clear Markdown with the following sections:
- **Summary**: A high-level overview of the changes.
- **Critical Findings**: (Only if applicable) High-risk security or downtime issues.
- **Detailed Recommendations**: Actionable advice categorized by Security, Cost, and Reliability.
- **Verdict**: (Approve / Request Changes / Critical Warning)

---
${diff}
---
`;

    return await ollamaClient.generate(prompt, model);
}

module.exports = {
    analyzeInfra
};
