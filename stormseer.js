const parameters = [
    { name: "Wind", min: 35, max: 219, step: 1, unit: "" },
    { name: "Pressure", min: 935, max: 1004, step: 1, unit: "" },
    { name: "Humidity", min: 75, max: 99, step: 1, unit: "%" },
    { name: "Temperature", min: 4, max: 27, step: 0.1, unit: "°C" },
    { name: "Visibility", min: 0, max: 14, step: 0.1, unit: "km" },
    { name: "Precipitation", min: 1, max: 99, step: 1, unit: "mm" },
    { name: "Sea Surface(SST)", min: 10, max: 27, step: 0.1, unit: "°C" },
    { name: "Storm Surge", min: 0.1, max: 1.5, step: 0.1, unit: "m" },
    { name: "Wave Height", min: 0.1, max: 2.0, step: 0.1, unit: "m" },
    { name: "Air Density", min: 1.225, max: 1.225, step: 0.001, unit: "kg/m³" }
];

const values = {};
const parametersContainer = document.getElementById('parameters-container');
const resultElement = document.getElementById('result');
const analyzeButton = document.getElementById('analyze-button');

function createSlider(param) {
    const div = document.createElement('div');
    div.className = 'flex flex-col';

    const label = document.createElement('label');
    label.className = 'mb-1 text-sm';
    label.textContent = param.name;

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = param.min;
    slider.max = param.max;
    slider.step = param.step;
    slider.value = param.min;
    slider.className = 'slider mb-1';

    const valueSpan = document.createElement('span');
    valueSpan.className = 'text-xs';
    valueSpan.textContent = `${param.min.toFixed(param.step < 1 ? 1 : 0)} ${param.unit}`;

    slider.addEventListener('input', () => {
        const value = parseFloat(slider.value);
        values[param.name] = value;
        valueSpan.textContent = `${value.toFixed(param.step < 1 ? 1 : 0)} ${param.unit}`;
    });

    div.appendChild(label);
    div.appendChild(slider);
    div.appendChild(valueSpan);
    parametersContainer.appendChild(div);

    values[param.name] = param.min;
}

parameters.forEach(createSlider);

analyzeButton.addEventListener('click', async () => {
    analyzeButton.disabled = true;
    analyzeButton.textContent = 'Analyzing...';
    analyzeButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');
    analyzeButton.classList.add('bg-gray-500');

    try {
        // Prepare data for API call
        const response = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values) // Send the selected parameter values
        });

        const result = await response.json();

        if (response.ok) {
            // Display the category of storm intensity
            resultElement.textContent = `Storm Intensity Category: ${result.intensity}`;
        } else {
            resultElement.textContent = 'Failed to analyze. Try again.';
        }
    } catch (error) {
        resultElement.textContent = 'An error occurred during analysis. Please try again.';
    } finally {
        analyzeButton.disabled = false;
        analyzeButton.textContent = 'Analyze';
        analyzeButton.classList.remove('bg-gray-500');
        analyzeButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
    }
});
