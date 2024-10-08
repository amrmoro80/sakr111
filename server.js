const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow requests from any origin
app.use(bodyParser.json()); // Parse JSON bodies

// File path to store grades
const gradesFilePath = path.join(__dirname, 'grades.json');

// Endpoint to save grades
app.post('/save-grades', (req, res) => {
    const grades = req.body;

    // Save grades to a file (grades.json)
    fs.writeFile(gradesFilePath, JSON.stringify(grades, null, 2), (err) => {
        if (err) {
            console.error('Error saving grades:', err);
            return res.status(500).send('Error saving grades');
        }
        console.log('Grades saved successfully');
        res.status(200).send('Grades saved successfully');
    });
});

// Endpoint to retrieve grades
app.get('/grades', (req, res) => {
    // Read grades from the file
    fs.readFile(gradesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading grades:', err);
            return res.status(500).send('Error reading grades');
        }
        res.status(200).json(JSON.parse(data || '[]')); // Send back the grades or an empty array
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
