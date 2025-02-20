import os
import io
import numpy as np
import tensorflow as tf
from django.conf import settings
from django.core.files.storage import default_storage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import ImageUploadForm
from tensorflow.keras.preprocessing import image

# Load the trained model
model_path = os.path.join(settings.BASE_DIR, 'classifier', 'animal_classifier_model.h5')
model = tf.keras.models.load_model(model_path)

# Define the class labels
class_labels = ["bear", "bird", "cat", "cow", "deer", "dog", "dolphin", "duck", "elephant", "fish", "goose", "horse", "lion", "monkey", "pig", "rabbit", "raccoon", "shark", "skunk", "snake", "spider", "squirrel", "tiger", "whale"]

import io

@csrf_exempt
def predict_animal_view(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image_file = request.FILES['image']

            try:
                # Convert InMemoryUploadedFile to BytesIO
                image_bytes = image_file.read()
                image_stream = io.BytesIO(image_bytes)

                # Load and preprocess the image directly from the uploaded file
                img = image.load_img(image_stream, target_size=(150, 150))
                img_array = image.img_to_array(img)
                img_array = np.expand_dims(img_array, axis=0)
                img_array /= 255.0  # Rescale the image

                # Make a prediction
                predictions = model.predict(img_array)
                predicted_class = np.argmax(predictions[0])
                predicted_label = class_labels[predicted_class]

                return JsonResponse({'predicted_label': predicted_label})
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
        else:
            return JsonResponse({'error': form.errors}, status=400)

    return JsonResponse({'error': 'Invalid request'}, status=400)