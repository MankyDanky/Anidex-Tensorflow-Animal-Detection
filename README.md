# Anidex-Tensorflow-Animal-Detection
 An app that's meant to replicate the pokedex in real life. Uses a React Native front end for both mobile and web support, and a Django backend that uses a personally trained Tensorflow model to predict what animal is in an image. The stats and descriptions for the animals are made using the OpenAI API.

## Inspiration
I have always loved Pokemon, and also wanted to do something cool with AI and ML. The natural byproduct of this is this app. I hope you find it cool!

## Running the app
To run the app you must:
1. Scrape the images using download_training_data.py. Download more images for more accuracy, it's set to 200 right now, which usually leads to about ~75% accuracy on the augmented training.
2. Train the model using train_model.py or train_model_augmented.py (if you want to use a pretrained model to improve accuracy)
3. Place the trained model in the classifer folder in the AnimalClassiferBackend folder of Backend
3. Generate the animal descriptions and stats using collect_descriptions.py, and place the outputted animal_descriptions.json in the app folder of Frontend/Anidex. Doing this will necessitate you putting in your OpenAI key. If you don't have one you can use the json data already generated and skip this step.
4. Run the backend and then using ngrok to redirect to it from an https URL. Put this URL in index.tsx where it says "SERVER_ADDRESS_HERE".

## Demo
https://github.com/user-attachments/assets/13aeb72e-cf4a-4d05-aa24-1b4ec77d60b1

