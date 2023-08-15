// scripts/main.js

// Sample data for chart
const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    predictions: [10, 20, 15, 25, 18],
    actualResults: [8, 18, 12, 22, 16],
};



// DOM elements
const accuracyValue = document.getElementById('accuracy');
const precisionValue = document.getElementById('precision');
const recallValue = document.getElementById('recall');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const predictionTable = document.getElementById('predictionTable');
const predictionChart = document.getElementById('predictionChart');

// Update metrics values
accuracyValue.textContent = '0.85';
precisionValue.textContent = '0.75';
recallValue.textContent = '0.90';

// Initialize Chart
const ctx = predictionChart.getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Predictions',
                data: chartData.predictions,
                borderColor: 'blue',
            },
            {
                label: 'Actual Results',
                data: chartData.actualResults,
                borderColor: 'green',
            },
        ],
    },
});

// Simulate API call for predictions
function fetchPredictions() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldSucceed = Math.random() < 0.8; // Simulate success with 80% probability
            if (shouldSucceed) {
                const predictions = [
                    { id: 1, prediction: 'Prediction A', confidence: Math.random() },
                    { id: 2, prediction: 'Prediction B', confidence: Math.random() },
                    { id: 3, prediction: 'Prediction C', confidence: Math.random() },
                ];
                resolve(predictions);
            } else {
                reject(new Error('Failed to fetch predictions.'));
            }
        }, 1000);
    });
}

// Display predictions in a table
async function displayPredictions() {
    try {
        const predictions = await fetchPredictions();
        if (predictions.length === 0) {
            predictionTable.innerHTML = '<p>No predictions available.</p>';
        } else {
            predictionTable.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Prediction</th>
                    <th>Confidence</th>
                </tr>
                ${predictions
                    .map(
                        (prediction) =>
                            `<tr>
                                <td>${prediction.id}</td>
                                <td>${prediction.prediction}</td>
                                <td>${prediction.confidence.toFixed(2)}</td>
                            </tr>`
                    )
                    .join('')}
            `;
        }
    } catch (error) {
        predictionTable.innerHTML = '<p>Error fetching predictions.</p>';
    }
}

let intervalId = null;

// Button click handlers
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    predictionTable.innerHTML = '<p>Loading predictions...</p>';
    
    // Simulate AI model logic
    intervalId = setInterval(() => {
        displayPredictions();
    }, 1500);
});

stopButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    predictionTable.innerHTML = '';
    
    // Stop AI model logic
    clearInterval(intervalId);
    intervalId = null;
});
