# Entity Relationship (ER) Visualisation and Chatbot App

This application is aimed to accelerate the analysis of relationships of any data with an interactive ER diagram and will have salient features including:

1️⃣ **Relationship Extraction:** Application automatically extracts all the r/s from the dataset and presents complete insight into how entities are interconnected.
   
2️⃣ **Dynamic Filtering:** Relationships can be filtered by selecting specific entities through the use of checkboxes, and upon selecting, the application updates the ER diagram on the fly to show the relevant relationships for better clarity and focus.

2️⃣ **Integration of an Interactive Chatbot:** The application offers a chatbot that can take an image of either the ER diagram or a selected row of data and process it. Then, it waits for the user to enter something and hence query the dataset based on the visualized relationships or selected data.

---
# 🌐 Live Website
👉 view our live website [**here**](https://yourwebsite.com)

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

### 🔑 API Key Setup  
Before running the chatbot backend, you **must** set up your **DeepSeek API key**. 

1. Navigate to the `server` folder:  
```bash
cd server
python main.py
```
2. Create a .env folder and get your Deepseek API and put it in your .env file
```bash
   echo "DEEPSEEK_API_KEY=your_deepseek_api_key_here" > .env
```

#### Backend 1 (NER Diagram): 
```bash
cd ner_diagram
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
- Click **"Clear All"** to clear selections and start over.

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
- **Backend:** Python (Flask/FastAPI) 🐍 || GroqAI (Model: deepseek-r1-distill-llama-70b) 🤖 || Firebase (Firestore) 🔥
- **Visualisation:** PlantUML 🖥️
- **Chatbot:** OpenAI (OpenAI API)  🤖

---

## 📜 License
This project is licensed under the **MIT License**. See [MIT License](LICENSE) for details.

---

## 🤝 Contributing
Contributions are welcome! Please open an **issue** or submit a **pull request**. 🚀

---


