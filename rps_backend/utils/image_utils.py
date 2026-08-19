from PIL import Image
import numpy as np


def preprocess_image(image):
    """
    Prepare image for the Teachable Machine Keras model.
    """

    # Convert to RGB
    image = image.convert("RGB")

    # Teachable Machine image models commonly use 224x224
    image = image.resize((224, 224))

    # Convert image to numpy array
    image_array = np.asarray(image).astype(np.float32)

    # Normalize pixel values from [0,255] to [-1,1]
    image_array = (image_array / 127.5) - 1

    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)

    return image_array