from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import get_chat_response

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Requests

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')

    if not user_message:
        return jsonify({'reply': 'No message provided.'}), 400

    reply = get_chat_response(user_message)
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)
