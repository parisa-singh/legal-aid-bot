from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Harassment Legal Advisor API'})

@app.route('/submit_profile', methods=['POST'])
def submit_profile():
    data = request.json
    #AI model response
    advice = f"Based on your input regarding {data['category']}, here are some recommendations..."
    return jsonify({'message': 'Profile submitted successfully', 'advice': advice})

if __name__ == '__main__':
    app.run(debug=True)
