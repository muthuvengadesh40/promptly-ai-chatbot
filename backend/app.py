from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_bot_response

app = Flask(__name__)
CORS(app)  # allow React frontend to call API

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")
    if not user_input:
        return jsonify({"error": "Message required"}), 400
    
    bot_response = get_bot_response(user_input)
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
