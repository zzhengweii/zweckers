from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # For React communication with Flask
import os
from groq import Groq

app = Flask(__name__)
CORS(app)

# API Key Set-Up
api_key = os.getenv("DEEPSEEK_API_KEY") 

# Load Groq API Key from environment
client = Groq(api_key="api_key")

# Define your custom prompt
PROMPT = "Your input text or content that will be processed"

temperature=0.7
MaxToken=5000


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template('chat.html')


@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form["msg"]
    input = msg
    return get_Chat_response(input)


def get_Chat_response(text):
    # Read the PlantUML diagram from the 'server/ner_diagram' directory
    try:
        with open('../ner_diagram/temp.puml', 'r') as file:
            plantuml_content = file.read()
    except FileNotFoundError:
        return jsonify({"error": "PlantUML diagram file not found."})

    # Construct the prompt based on the user's input (with the diagram)
    prompt = f"""
    You are named botER.

    You are an expert in ER diagrams and relationship extraction.

    The user has asked: "{text}"

    Here is the PlantUML diagram:

    {plantuml_content}

    Your task is to:

    1. Extract the relevant **entities**, **relationships**, and **attributes** from the diagram.
    2. Explain the relationships between the entities in plain language.
    3. Describe the key attributes of each entity.
    4. Provide a detailed explanation of how the entities and relationships are related, but **do not use JSON or any structured formatting**.
    5. Focus on clarity, and provide a confident, elaborative response to the user's question.

    Answer directly and confidently without using JSON, just natural language explanations. 

    """

    # Call the Groq API with the prompt
    response = client.chat.completions.create(
        model="deepseek-r1-distill-llama-70b",  # You can change the model to the one you're using
        messages=[
            {"role": "system", "content": "You are an expert in ER diagrams and database design, also known as botER."},
            {"role": "user", "content": prompt},
        ],
        temperature=temperature,
        max_completion_tokens=MaxToken,
        top_p=0.95,
        stream=False,
        stop=None,
    )

    # Extract and return the response
    return response.choices[0].message.content.strip()


if __name__ == '__main__':
    app.run()