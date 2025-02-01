# Entity Relationship (ER) Visualisation and Chatbot App

This app allows users to visualise relationships between entities using an ER diagram generated with PlantUML and interact with a chatbot to query these relationships. The app consists of a **Dashboard** for ER diagram generation and a **Chatbot** for querying relationships.

---

## 📑 Table of Contents
1. [🚀 Setup Instructions](#-setup-instructions)
2. [🛠️ App Usage](#-app-usage)
   - [📊 Dashboard](#-dashboard)
   - [💬 Chatbot](#-chatbot)
3. [📝 Notes](#-notes)
4. [🖼️ Screenshots](#-screenshots)
5. [🛠️ Technologies Used](#-technologies-used)
6. [📜 License](#-license)
7. [🤝 Contributing](#-contributing)

---

## 🚀 Setup Instructions

Follow these steps to set up and run the app locally:

### 1️⃣ Clone the Repository
```bash
git clone git@github.com:clarequek/zweckers.git
cd .../zweckers
```

### 2️⃣ Activate Virtual Environment
#### Mac/Linux:
```bash
source venv/bin/activate
```
#### Windows:
```bash
venv\Scripts\activate
```

### 3️⃣ Install Python Libraries
```bash
pip install -r requirements.txt
```

### 4️⃣ Install Node.js Dependencies
```bash
cd app
npm install
```

### 5️⃣ Run Backend Servers
#### Backend 1 (NER Diagram):
```bash
cd server/ner_diagram
python main.py
```
#### Backend 2 (Chatbot):
```bash
cd ../chatbot
python main.py
```

### 6️⃣ Start the Frontend App
```bash
cd ../../app
npm start
```
The app should now be running on **http://localhost:3000**.

---

## 🛠️ App Usage

### 📊 Dashboard
- Visualise relationships between entities using an ER diagram generated with PlantUML.
- Click **"Show Checkbox"** to display the list of entities.
- Click **"Load NER"** to load the entities.
- Select entities (e.g., **"Starbucks"** and **"National Labor Relations Board Judge"**).
- Press **"Submit"** to generate the ER diagram.
- Click **"Clear all"** to clear selections and start over.

### 💬 Chatbot
- Query the relationships visualised in the Dashboard.
- Create a new chat by naming the chat and clicking **"Submit"**.
- Start chatting (e.g., **"What is the relationship between Starbucks and National Labor Relations Board Judge?"**).

---

## 📝 Notes
- **Switching Between Dashboard and Chatbot:** There is a known bug where switching between the Dashboard and Chatbot requires reloading the Dashboard to refresh the data.
- Ensure **both backend servers** (NER Diagram and Chatbot) are running before using the app.

---

## 🖼️ Screenshots
### 📊 Dashboard
![Dashboard Screenshot](screenshots/dashboard.png)

### 💬 Chatbot
![Chatbot Screenshot](screenshots/chatbot.png)  

---

## 🛠️ Technologies Used
- **Frontend:** React.js ⚛️
- **Backend:** Python (Flask/FastAPI) 🐍 || GroqAI (Model: deepseek-r1-distill-llama-70b) 🤖
- **Visualisation:** PlantUML 🖥️
- **Chatbot:** OpenAI (OpenAI API)  🤖

---

## 📜 License
This project is licensed under the **MIT License**. See [MIT License](LICENSE) for details.

---

## 🤝 Contributing
Contributions are welcome! Please open an **issue** or submit a **pull request**. 🚀

---


