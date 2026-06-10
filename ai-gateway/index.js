require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const reviewService = require('./review-service');
const releaseNotesService = require('./release-notes-service');
const infraReviewService = require('./infra-review-service');
const scanSummaryService = require('./scan-summary-service');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

app.use(express.json({ limit: '50mb' }));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/review-pr', async (req, res) => {
    try {
        const { diff, model } = req.body;
        if (!diff) return res.status(400).json({ error: 'Diff is required' });
        const review = await reviewService.generateReview(diff, model);
        res.json({ review });
    } catch (error) {
        console.error('Error in /review-pr:', error.message);
        res.status(500).json({ error: 'Failed to generate review' });
    }
});

app.post('/generate-release-notes', async (req, res) => {
    try {
        const { commits, model } = req.body;
        if (!commits) return res.status(400).json({ error: 'Commits are required' });
        const notes = await releaseNotesService.generateReleaseNotes(commits, model);
        res.json({ notes });
    } catch (error) {
        console.error('Error in /generate-release-notes:', error.message);
        res.status(500).json({ error: 'Failed to generate release notes' });
    }
});

app.post('/analyze-infra', async (req, res) => {
    try {
        const { diff, model } = req.body;
        if (!diff) return res.status(400).json({ error: 'Diff is required' });
        const analysis = await infraReviewService.analyzeInfra(diff, model);
        res.json({ analysis });
    } catch (error) {
        console.error('Error in /analyze-infra:', error.message);
        res.status(500).json({ error: 'Failed to analyze infrastructure' });
    }
});

app.post('/summarize-scan', async (req, res) => {
    try {
        const { scanResults, model } = req.body;
        if (!scanResults) return res.status(400).json({ error: 'Scan results are required' });
        const summary = await scanSummaryService.summarizeScan(scanResults, model);
        res.json({ summary });
    } catch (error) {
        console.error('Error in /summarize-scan:', error.message);
        res.status(500).json({ error: 'Failed to summarize scan' });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`AI Gateway listening at http://localhost:${port}`);
});
