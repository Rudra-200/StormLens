from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # This allows CORS for all domains on all routes

# Load the model from the pickle file
with open('DIC_final.pkl', 'rb') as f:
    model = pickle.load(f)

# List of feature names expected by the model (matching trained model)
feature_names = [
    'Wind', 'Pressure', 'Humidity(%)', 'Temperature(°C)', 'Visibility(km)',
    'Precipitation(mm)', 'SST(°C)', 'Storm Surge(m)',
    'Wave Height(m)', 'Air Density(kg/m³)'
]

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    
    # Extract features in the correct order, matching the names used during training
    features = pd.DataFrame([{
        'Wind': data.get('Wind', np.nan),
        'Pressure': data.get('Pressure', np.nan),
        'Humidity(%)': data.get('Humidity', np.nan),
        'Temperature(°C)': data.get('Temperature', np.nan),
        'Visibility(km)': data.get('Visibility', np.nan),
        'Precipitation(mm)': data.get('Precipitation', np.nan),
        'SST(°C)': data.get('Sea Surface(SST)', np.nan),
        'Storm Surge(m)': data.get('Storm Surge', np.nan),
        'Wave Height(m)': data.get('Wave Height', np.nan),
        'Air Density(kg/m³)': data.get('Air Density', np.nan)
    }])

    # Ensure correct feature order
    features = features[feature_names]

    # Make prediction
    intensity = model.predict(features)[0]

    # Reverse mapping from integer to class name
    class_mapping = {
        0: 'Cyclonic Storm', 1: 'Depression', 2: 'Disturbance',
        3: 'Extremely Severe Cyclonic Storm', 4: 'Low Pressure Area',
        5: 'Severe Cyclonic Storm', 6: 'Very Severe Cyclonic Storm'
    }
    intensity_label = class_mapping.get(intensity, 'Unknown')

    return jsonify({'intensity': intensity_label})


if __name__ == '__main__':
    app.run(debug=True)