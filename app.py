from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import tensorflow as tf
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

# Load the Keras model
model = tf.keras.models.load_model('DA_final.h5')

# Define the class names
class_names = ["Cyclone_Damage", "Fire damage", "Flood damage", "Landslide damage"]

@app.route('/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    try:
        image = request.files['image']
        img = Image.open(io.BytesIO(image.read()))

        # Preprocess the image (resize, normalize, etc.)
        img = img.resize((128, 128))  # Adjust size as needed
        img_array = np.array(img) / 255.0  # Normalize pixel values

        # Add a batch dimension
        img_array = np.expand_dims(img_array, axis=0)

        # Make prediction
        prediction = model.predict(img_array)

        # Get the index of the highest predicted probability
        predicted_class = np.argmax(prediction, axis=1)[0]

        # Return the result as JSON
        return jsonify({'message': f'Predicted Class: {class_names[predicted_class]}'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
