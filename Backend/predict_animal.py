import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image

# Load the trained model
model = tf.keras.models.load_model('animal_classifier_model.h5')

# Define the class labels
class_labels = ["bear", "bird", "cat", "cow", "deer", "dog", "dolphin", "duck", "elephant", "fish", "goose", "horse", "lion", "monkey", "pig", "rabbit", "raccoon", "shark", "skunk", "snake", "spider", "squirrel", "tiger", "whale"]

def predict_animal(image_path):
    # Load and preprocess the image
    img = image.load_img(image_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Rescale the image

    # Make a prediction
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions[0])
    predicted_label = class_labels[predicted_class]

    return predicted_label

if __name__ == "__main__":
    image_path = "/Users/aadikulsh/Documents/Python Projects/AnimalClassifier/Backend/Anser_anser_1_(Piotr_Kuczynski).jpg"  # Replace with the path to your image
    predicted_animal = predict_animal(image_path)
    print(f'The predicted animal is: {predicted_animal}')