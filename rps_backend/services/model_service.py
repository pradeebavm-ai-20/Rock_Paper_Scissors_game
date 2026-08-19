import os
import numpy as np
import tensorflow as tf
from PIL import Image

from utils.image_utils import preprocess_image


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "keras_model.h5"
)

LABELS_PATH = os.path.join(
    BASE_DIR,
    "model",
    "labels.txt"
)


class ModelService:

    def __init__(self):
        print("Loading TensorFlow/Keras model...")

        self.model = tf.keras.models.load_model(
            MODEL_PATH,
            compile=False
        )

        self.labels = self.load_labels()

        print("Model loaded successfully.")
        print("Labels:", self.labels)

    def load_labels(self):
        labels = []

        with open(LABELS_PATH, "r") as file:
            for line in file:
                line = line.strip()

                if not line:
                    continue

                # Teachable Machine labels can be:
                # "0 Rock"
                # "1 Paper"
                # "2 Scissors"

                parts = line.split(maxsplit=1)

                if len(parts) == 2:
                    labels.append(parts[1])
                else:
                    labels.append(parts[0])

        return labels

    def predict(self, image: Image.Image):

        # Preprocess image
        input_data = preprocess_image(image)

        # Prediction
        prediction = self.model.predict(
            input_data,
            verbose=0
        )

        probabilities = prediction[0]

        # Highest probability index
        predicted_index = int(
            np.argmax(probabilities)
        )

        confidence = float(
            probabilities[predicted_index]
        )

        # Get label
        if predicted_index < len(self.labels):
            predicted_label = self.labels[predicted_index]
        else:
            predicted_label = "Unknown"

        return {
            "label": predicted_label,
            "confidence": confidence
        }


# Load model once when backend starts
model_service = ModelService()