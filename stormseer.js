const parameters = [
    { name: "Wind", min: 35, max: 219, step: 1, unit: "" },
    { name: "Pressure", min: 935, max: 1004, step: 1, unit: "" },
    { name: "Humidity", min: 75, max: 99, step: 1, unit: "%" },
    { name: "Temperature", min: 4, max: 60, step: 0.1, unit: "°C" },
    { name: "Visibility", min: 0, max: 14, step: 0.1, unit: "km" },
    { name: "Precipitation", min: 1, max: 99, step: 1, unit: "mm" },
    { name: "Sea Surface(SST)", min: 10, max: 27, step: 0.1, unit: "°C" },
    { name: "Storm Surge", min: 0.1, max: 1.5, step: 0.1, unit: "m" },
    { name: "Wave Height", min: 0.1, max: 2.0, step: 0.1, unit: "m" },
    { name: "Air Density", min: 1.000, max: 1.500, step: 0.001, unit: "kg/m³" },
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
        // Simulating API call to the model
        await new Promise(resolve => setTimeout(resolve, 2000));
        const intensity = Math.random() * 5;
        let intensityDescription;
        if (intensity >= 4) {
            intensityDescription = 'High Intensity: Cyclonic storm conditions expected.Public shall take immediate shelter, chopper should not be used and follow SOPs strictly.';
        } else if (intensity >= 3) {
            intensityDescription = 'Depression: Significant storm activity likely. Stay indoors, chopper should be avoided, and be prepared for possible disruptions.';
        } else if (intensity >= 2) {
            intensityDescription = 'Low Pressure Area: Some storm activity expected. Prepare for possible minor disruptions and stay informed of weather conditions.';
        } else if (intensity >= 1) {
            intensityDescription = 'Very Low Intensity: Minimal storm activity expected. Remain cautious but no immediate action needed.';
        } else {
            intensityDescription = 'High Pressure Area: Continue with normal activities but stay updated on weather changes.';
        }

        resultElement.textContent = `Storm Intensity: ${intensity.toFixed(2)} (on a scale of 0-5) |:|:|:|:|:|:|:|:|:|:|   ${intensityDescription}  |:|:|:|:|:|:|:|:|:|:|`;
        //resultElement.textContent = `Storm Intensity: ${intensity.toFixed(2)} (on a scale of 0-5)`;
    } catch (error) {
        resultElement.textContent = 'An error occurred during analysis. Please try again.';
    } finally {
        analyzeButton.disabled = false;
        analyzeButton.textContent = 'Analyse';
        analyzeButton.classList.remove('bg-gray-500');
        analyzeButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
    }
});