from flask import Blueprint, request, jsonify
from PIL import Image
import io

from services.model_service import model_service
from services.game_service import play_round


prediction_bp = Blueprint(
    "prediction",
    __name__
)


@prediction_bp.route("/predict", methods=["POST"])
def predict():

    try:

        # Check whether image exists
        if "image" not in request.files:
            return jsonify({
                "success": False,
                "error": "No image provided"
            }), 400

        image_file = request.files["image"]

        # Read image
        image_bytes = image_file.read()

        image = Image.open(
            io.BytesIO(image_bytes)
        )

        # Model prediction
        prediction = model_service.predict(
            image
        )

        # Get user move
        user_move = prediction["label"]

        # Game logic
        game_result = play_round(
            user_move
        )

        return jsonify({
            "success": True,

            "userMove": game_result["userMove"],

            "computerMove": game_result["computerMove"],

            "result": game_result["result"],

            "confidence": round(
                prediction["confidence"],
                4
            )
        })

    except Exception as error:

        print("Prediction error:", error)

        return jsonify({
            "success": False,
            "error": str(error)
        }), 500