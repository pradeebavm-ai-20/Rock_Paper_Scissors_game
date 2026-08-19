from flask import Flask, jsonify
from flask_cors import CORS

from routes.prediction_routes import prediction_bp


app = Flask(__name__)

# Allow React frontend to communicate with Flask
CORS(app)


# Register prediction routes
app.register_blueprint(
    prediction_bp
)


@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "Rock Paper Scissors AI Backend is running!"
    })


@app.route("/health", methods=["GET"])
def health():

    return jsonify({
        "status": "ok"
    })


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )