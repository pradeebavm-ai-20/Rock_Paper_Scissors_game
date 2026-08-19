/*

import { MOVES, decideResult } from '../data/gameData'

// Replace this function with POST http://localhost:5000/predict when the Flask API is ready.
export function predictMove() {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const userMove = MOVES[Math.floor(Math.random() * MOVES.length)]
      const computerMove = MOVES[Math.floor(Math.random() * MOVES.length)]
      resolve({ userMove, computerMove, result: decideResult(userMove, computerMove) })
    }, 1350)
  })
}




const API_URL = "http://127.0.0.1:5000";

export async function predictMove(imageFile) {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Prediction failed: ${response.status}`);
  }

  const data = await response.json();

  return data;
}*/

const API_URL = 'http://127.0.0.1:5000'

export async function predictMove(imageBlob) {
  if (!imageBlob) {
    throw new Error('No camera image captured')
  }

  const formData = new FormData()

  formData.append('image', imageBlob, 'camera.jpg')

  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Prediction failed')
  }

  return data
}