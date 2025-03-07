import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)
client = OpenAI()

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Harassment Legal Advisor API'})

@app.route('/submit_profile', methods=['POST'])
def submit_profile():
    data = request.json
    category = data.get('category', 'unspecified category')
    location = data.get('location', 'unspecified location')
    financial = data.get('financial', 'unspecified')
    description = data.get('description', '')
    #AI model response
    prompt = (
        f"You are a legal advisor. A user has submitted a profile regarding {category} harassment. "
        f"The user is located in {location} and their financial independence is {financial}. "
        f"Here is the user's description of their situation: {description}. "
        "Based on this, provide some recommendations regarding legal options and next steps. Design your response in the following fashion: One paragraph on surface-level legal advice, one paragraph on some more in-depth options for the user to pursue, and end with a short paragraph that provides the user with some real-life options (such as law firms specialising in the category of harassment they face within their area using the location they gave). Finally, please fit your response within 500 tokens"
    )
    
    try:
        response = client.chat.completions.create(
            model = "gpt-4o-mini",
            messages = [
                {"role": "system", "content": "You are a helpful legal advisor."},
                {"role": "user", "content": prompt}],
            temperature = 0.7,
            max_tokens = 475
        )
        advice = response.choices[0].message.content.strip()
    except Exception as e:
        advice = "There was an error generating legal advice. Please try again later."
        print(f"error generating response: {e}")
    return jsonify({'message': 'Profile submitted successfully', 'advice': advice})

if __name__ == '__main__':
    app.run(debug=True)
