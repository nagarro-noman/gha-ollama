# GitHub Actions Ollama Integration (gha-ollama)

This project provides a centralized way to use locally hosted Ollama LLMs within GitHub Actions workflows for tasks like PR reviews, release note generation, and more.

## Architecture

1.  **Ollama Server:** A central server running Ollama API.
2.  **AI Gateway (Node.js):** A lightweight API service (included in this repo) that acts as a proxy between GitHub Actions and Ollama, standardizing prompts and adding a layer of governance.
3.  **Reusable Workflow:** A central GitHub Action workflow that repositories can call to perform AI tasks.

## Setup Instructions

### 1. Deploy AI Gateway
The AI Gateway is located in the `ai-gateway/` directory.

-   **API Documentation:** Once the gateway is running, you can access the interactive Swagger UI at `/api-docs` (e.g., `http://localhost:3000/api-docs`).

-   **Environment Variables:**
    -   `PORT`: Port for the gateway (default: 3000).
    -   `OLLAMA_URL`: URL of your Ollama server.
    -   `DEFAULT_MODEL`: Default model to use (e.g., `llama3.2`).

-   **Deployment:**
    You can run it via Docker:
    ```bash
    docker build -t ai-gateway ./ai-gateway
    docker run -p 3000:3000 --env-file ./ai-gateway/.env ai-gateway
    ```

### 2. Configure GitHub Secrets
In the repositories that will use the AI workflows, add the following secret:
-   `AI_GATEWAY_URL`: The public or internal URL where your AI Gateway is hosted.

### 3. Usage in Workflows

#### AI PR Review
```yaml
jobs:
  ai-review:
    uses: <org>/gha-ollama/.github/workflows/ai-pr-review.yml@main
    secrets:
      AI_GATEWAY_URL: ${{ secrets.AI_GATEWAY_URL }}
```

#### AI Release Notes
```yaml
jobs:
  release-notes:
    uses: <org>/gha-ollama/.github/workflows/ai-release-notes.yml@main
    secrets:
      AI_GATEWAY_URL: ${{ secrets.AI_GATEWAY_URL }}
```

#### AI Infra Review
```yaml
jobs:
  infra-review:
    uses: <org>/gha-ollama/.github/workflows/ai-infra-review.yml@main
    secrets:
      AI_GATEWAY_URL: ${{ secrets.AI_GATEWAY_URL }}
```

#### AI Security Scan Summary
```yaml
jobs:
  security-summary:
    uses: <org>/gha-ollama/.github/workflows/ai-security-summary.yml@main
    with:
      scan_results_path: 'trivy-results.json'
    secrets:
      AI_GATEWAY_URL: ${{ secrets.AI_GATEWAY_URL }}
```

## Project Structure
-   `ai-gateway/`: Node.js Express application for the AI service layer.
    -   `review-service/`: Logic for PR reviews.
    -   `release-notes-service/`: Logic for release notes.
    -   `infra-review-service/`: Logic for IaC analysis.
    -   `scan-summary-service/`: Logic for security scan summaries.
    -   `ollama-client/`: Core client for Ollama API communication.
-   `.github/workflows/`: Centralized reusable GitHub Action workflows.
