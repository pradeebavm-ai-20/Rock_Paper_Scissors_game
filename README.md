# Rock Paper Scissors game

A full-stack Rock Paper Scissors application that combines a React frontend with a Flask backend and a TensorFlow/Keras image classification model.

The application uses the user's camera to capture a hand gesture, sends the captured image to the backend for AI-based classification, determines the computer's move, and displays the result in the frontend.

## Project Overview

The project consists of two applications:

* Frontend: React and Vite-based web application
* Backend: Flask REST API with TensorFlow/Keras model inference

The frontend manages the user interface, camera access, game state, countdown, score, animations, sound controls, and result display.

The backend receives the captured image, processes the image, runs the TensorFlow/Keras model, identifies the player's gesture, generates the computer's move, calculates the game result, and returns the prediction through a REST API.

## Technology Stack

### Frontend

* React
* JavaScript
* Vite
* HTML5
* CSS3
* Browser MediaDevices API
* REST API

### Backend

* Python 3.10
* Flask
* Flask-CORS
* TensorFlow 2.12.1
* Keras 2.12.0
* NumPy 1.24.3
* Pillow
* h5py

### Machine Learning

The application uses a pre-trained TensorFlow/Keras H5 model for Rock Paper Scissors hand gesture classification.

The model recognizes three classes:

```text
rock
paper
scissors
```

## System Architecture

```text
User
  |
  | Camera
  v
React Frontend
  |
  | POST /predict
  | Multipart Image
  v
Flask Backend
  |
  v
Image Processing
  |
  v
TensorFlow/Keras Model
  |
  v
Gesture Prediction
  |
  v
Game Logic
  |
  v
JSON Response
  |
  v
React Frontend
  |
  v
Game Result and Score
```

## Project Structure

```text
RPS_GAME/
|
├── backend/
|   |
|   ├── model/
|   |   ├── keras_model.h5
|   |   └── labels.txt
|   |
|   ├── routes/
|   |   ├── __pycache__/
|   |   └── prediction_routes.py
|   |
|   ├── services/
|   |   ├── __pycache__/
|   |   ├── game_service.py
|   |   └── model_service.py
|   |
|   ├── uploads/
|   |   └── .gitkeep
|   |
|   ├── utils/
|   |   ├── __pycache__/
|   |   └── image_utils.py
|   |
|   ├── app.py
|   ├── requirements.txt
|   ├── .gitignore
|   └── venv/
|
├── frontend/
|   |
|   ├── public/
|   |
|   ├── src/
|   |   |
|   |   ├── assets/
|   |   |
|   |   ├── components/
|   |   |   ├── CameraPanel.jsx
|   |   |   ├── ComputerPanel.jsx
|   |   |   ├── Countdown.jsx
|   |   |   ├── GameControls.jsx
|   |   |   ├── Header.jsx
|   |   |   ├── ResultBanner.jsx
|   |   |   ├── ScoreBoard.jsx
|   |   |   ├── SoundToggle.jsx
|   |   |   ├── Timer.jsx
|   |   |   └── VSBadge.jsx
|   |   |
|   |   ├── data/
|   |   |   └── gameData.js
|   |   |
|   |   ├── hooks/
|   |   |   ├── useGame.js
|   |   |   └── useSound.js
|   |   |
|   |   ├── pages/
|   |   |   └── Game.jsx
|   |   |
|   |   ├── services/
|   |   |   └── api.js
|   |   |
|   |   ├── styles/
|   |   |   ├── animations.css
|   |   |   ├── game.css
|   |   |   └── global.css
|   |   |
|   |   ├── App.jsx
|   |   └── main.jsx
|   |
|   ├── package.json
|   ├── package-lock.json
|   ├── vite.config.js
|   ├── eslint.config.js
|   ├── index.html
|   └── .gitignore
|
├── README.md
└── .gitignore
```

## Backend

The backend is implemented using Flask and provides the REST API used by the React frontend.

The main Flask application is located at:

```text
backend/app.py
```

The backend loads the TensorFlow/Keras model and registers the prediction API route.

## Prediction API

The prediction endpoint is:

```text
POST /predict
```

The endpoint expects an uploaded image using the following multipart form-data field:

```text
image
```

The prediction process is:

```text
Receive Image
    |
    v
Validate Image
    |
    v
Read Image
    |
    v
Preprocess Image
    |
    v
TensorFlow/Keras Prediction
    |
    v
Identify User Move
    |
    v
Generate Computer Move
    |
    v
Calculate Result
    |
    v
Return JSON Response
```

## Backend Model Service

The model service is located at:

```text
backend/services/model_service.py
```

The service loads the H5 model and performs gesture classification.

The model classes are:

```text
rock
paper
scissors
```

The model file is located at:

```text
backend/model/keras_model.h5
```

The class labels are stored in:

```text
backend/model/labels.txt
```

## Backend Game Service

Game logic is implemented in:

```text
backend/services/game_service.py
```

The application follows standard Rock Paper Scissors rules:

```text
Rock     beats Scissors
Scissors beats Paper
Paper    beats Rock
```

When both players select the same move, the result is a draw.

## Backend Image Processing

Image processing utilities are located at:

```text
backend/utils/image_utils.py
```

These utilities are used to prepare the captured image before it is passed to the TensorFlow/Keras model.

## Backend Environment

The backend uses Python 3.10.

A Python virtual environment is used to isolate the backend dependencies from the system Python installation.

Create the virtual environment:

```bash
python3.10 -m venv venv
```

Activate the virtual environment:

```bash
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Backend Requirements

The backend uses the following important versions:

```text
Python 3.10
TensorFlow 2.12.1
Keras 2.12.0
NumPy 1.24.3
```

All backend dependencies are listed in:

```text
backend/requirements.txt
```

The Python virtual environment should not be committed to GitHub.

## Run Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Activate the virtual environment:

```bash
source venv/bin/activate
```

Start the Flask server:

```bash
python app.py
```

The backend will be available at:

```text
http://127.0.0.1:5000
```

## Frontend

The frontend is implemented using React and Vite.

It provides the user interface for the game and communicates with the Flask backend through the prediction API.

## Frontend Components

The main React components are located in:

```text
frontend/src/components/
```

The components include:

```text
CameraPanel.jsx
ComputerPanel.jsx
Countdown.jsx
GameControls.jsx
Header.jsx
ResultBanner.jsx
ScoreBoard.jsx
SoundToggle.jsx
Timer.jsx
VSBadge.jsx
```

## Camera Panel

The camera interface is implemented in:

```text
frontend/src/components/CameraPanel.jsx
```

The component uses the browser MediaDevices API to request camera access.

The browser will ask the user for permission to access the camera.

Camera access must be allowed for gesture detection to work correctly.

## Game Page

The main game page is:

```text
frontend/src/pages/Game.jsx
```

It combines the game interface components and controls the overall game screen.

## Game State Management

Game state is managed using:

```text
frontend/src/hooks/useGame.js
```

The game hook manages:

* Game phase
* Countdown
* Round number
* Player score
* Computer score
* User move
* Computer move
* Game result
* Result message
* Round transitions

## Sound Management

Sound functionality is implemented in:

```text
frontend/src/hooks/useSound.js
```

The hook manages the sound state and generates game-related audio effects.

## API Service

Frontend-to-backend communication is handled by:

```text
frontend/src/services/api.js
```

The frontend sends the captured image to:

```text
http://127.0.0.1:5000/predict
```

using a POST request.

The image is sent as multipart form data.

## Frontend Environment

The frontend uses Node.js and npm.

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

The exact URL will be displayed in the terminal when Vite starts.

## Running Frontend and Backend

The frontend and backend must run simultaneously in separate terminals.

### Terminal 1: Backend

```bash
cd backend
source venv/bin/activate
python app.py
```

The backend should be running on:

```text
http://127.0.0.1:5000
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Open the frontend URL provided by Vite in the browser.

Both services must be running for the complete application flow to work.

## Camera Permission

The application requires access to the device camera.

When the browser displays the camera permission dialog, select:

```text
Allow
```

If camera access was previously blocked, open the browser site permissions and enable camera access for the application.

## API Response

A successful prediction request returns a response similar to:

```json
{
  "success": true,
  "userMove": "rock",
  "computerMove": "scissors",
  "result": "win",
  "confidence": 0.98
}
```

The response fields are:

```text
success
Indicates whether the request was processed successfully.

userMove
The gesture detected by the TensorFlow/Keras model.

computerMove
The move selected by the computer.

result
The result of the game round.

confidence
The model's prediction confidence.
```

## Error Response

If the frontend does not send an image, the backend returns:

```json
{
  "success": false,
  "error": "No image provided"
}
```

Unexpected processing errors are returned as JSON responses with an appropriate error message.

## Model Compatibility

The H5 model used in this project was created using an older TensorFlow/Keras environment.

The backend environment is therefore configured with compatible versions:

```text
Python 3.10
TensorFlow 2.12.1
Keras 2.12.0
NumPy 1.24.3
```

Using the specified environment is recommended to maintain compatibility with the existing H5 model.

## Development Workflow

The complete application workflow is:

```text
1. Start the Flask backend.
2. Start the React frontend.
3. Open the frontend in a browser.
4. Allow camera access.
5. Start a game round.
6. Capture the player's hand gesture.
7. Send the image to the Flask API.
8. Process the image.
9. Run TensorFlow/Keras prediction.
10. Identify the player's move.
11. Generate the computer's move.
12. Calculate the game result.
13. Return the result to the frontend.
14. Display the result and update the score.
```

## Troubleshooting

### TensorFlow or Keras Model Loading Error

Check the Python version:

```bash
python --version
```

The backend should use Python 3.10.

Check TensorFlow and Keras:

```bash
python -c "import tensorflow as tf; import keras; print('TensorFlow:', tf.__version__); print('Keras:', keras.__version__)"
```

Expected output:

```text
TensorFlow: 2.12.1
Keras: 2.12.0
```

Check NumPy:

```bash
python -c "import numpy; print(numpy.__version__)"
```

Expected:

```text
1.24.3
```

### Frontend Dependencies Not Installed

Run:

```bash
cd frontend
npm install
```

Then start the frontend:

```bash
npm run dev
```

### Camera Does Not Appear

Check the following:

* Camera permission is allowed in the browser.
* The camera is not being used exclusively by another application.
* The frontend is running correctly.
* The browser supports the MediaDevices API.
* The CameraPanel component is mounted correctly.
* The browser is accessing the correct frontend URL.

### Prediction Returns HTTP 400

Verify that the frontend sends the captured image using the form-data field:

```text
image
```

Also verify that the Flask backend is running:

```text
http://127.0.0.1:5000
```

and that the prediction endpoint is:

```text
POST /predict
```

### Backend and Frontend Connection Issue

Make sure both services are running at the same time.

Backend:

```text
http://127.0.0.1:5000
```

Frontend:

```text
http://localhost:5173
```

Verify that the frontend API configuration points to the correct backend address.

## Git Repository

The project is maintained as a single Git repository containing both the frontend and backend applications.

The repository should contain:

```text
README.md
frontend/
backend/
```

Generated and environment-specific directories should not be committed.

Examples include:

```text
backend/venv/
frontend/node_modules/
frontend/dist/
__pycache__/
```

These directories should be excluded through `.gitignore`.

## Installation Summary

### Backend

```bash
cd backend
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Project Status

The application provides:

* React-based game interface
* Browser camera integration
* TensorFlow/Keras gesture classification
* Rock Paper Scissors game logic
* Computer move generation
* Prediction confidence
* Real-time game result display
* Score tracking
* Countdown system
* Sound controls
* Flask REST API
* Modular frontend and backend architecture

## License

This project is developed for educational and application development purposes.
