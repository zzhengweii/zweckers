from flask import Flask, render_template, request, jsonify
import openai
from flask_cors import CORS  # For React communication with Flask
import os

app = Flask(__name__)
CORS(app)

# API Key Set-Up
openai.api_key = os.getenv("DEEPSEEK_API_KEY")
print("DEEPSEEK_API_KEY:", openai.api_key)


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template('chat.html')


@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form["msg"]
    input = msg
    return get_Chat_response(input)


def get_Chat_response(text):
    
    # Call model:
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        store=True,
        messages=[
            {"role": "system", "content": "You are an expert in ER diagrams and database design and you are also called botER."},
            {"role": "user", "content": text},
        ],
    )

    # Getting the response text
    return response.choices[0].message.content.strip()


if __name__ == '__main__':
    app.run()