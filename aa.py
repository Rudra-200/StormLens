from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows CORS for all domains on all routes

# Load the model from the pickle file
with open('DIC_final.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    
    # Extract features in the correct order
    features = np.array([
        data['Wind'],
        data['Pressure'],
        data['Latitude'],
        data['Longitude'],
        data['Humidity'],
        data['Temperature'],
        data['Visibility'],
        data['Precipitation'],
        data['Sea Surface(SST)'],
        data['Storm Surge'],
        data['Wave Height'],
        data['Air Density']
    ]).reshape(1, -1)

    # Make prediction
    intensity = model.predict(features)[0]

    return jsonify({'intensity': float(intensity)})

if __name__ == '__main__':
    app.run(debug=True)