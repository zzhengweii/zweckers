import spacy
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
from itertools import combinations
from flask import Flask, jsonify,render_template, request, send_from_directory
from groq import Groq
import os
import re
import json
from plantuml import PlantUML
from rapidfuzz import fuzz, process


dct = []
# For testing
df = pd.read_csv("ner_graph.csv")
# For live
#df = []
app = Flask(__name__)
### Pre-loading the excel
def pre_load_excel(excel):
    # Load English language model
    nlp = spacy.load("en_core_web_sm")
    global df
    df = pd.read_excel(excel)
    records = []
    for doc_text in df["Text"]:
        doc = nlp(doc_text)
        for ent in doc.ents:
            records.append((doc_text, ent.text, ent.label_))
    ner_graph_df = pd.DataFrame(records, columns=["original_text", "entity", "label"])
    print("NER done, grouping words together right now...")
    final_graph = group_similar_words(ner_graph_df,"entity")
    print("Grouping Done!")
    return final_graph


def is_number(s):
    try:
        # Try to convert to float
        float(s.replace(',', ''))  # Handle commas in numbers like '30,000'
        return True
    except ValueError:
        return False


## group quering them and replacing the entity with grouped_entity
def group_similar_words(df, column, threshold=80):
    unique_words = df[column].unique()
    grouped_words = {}
    
    for word in unique_words:
        if word not in grouped_words:
            matches = process.extract(word, unique_words, scorer=fuzz.token_sort_ratio, score_cutoff=threshold)
            similar_words = [match[0] for match in matches]
            for similar_word in similar_words:
                grouped_words[similar_word] = word
    
    df['grouped_entity'] = df[column].map(grouped_words)
    df['entity'] = df.apply(lambda row: row['grouped_entity'] if not is_number(row['entity']) else row['entity'], axis=1)
    df['label'] = df.groupby('grouped_entity')['label'].transform('first')
    return df

### Button Activation
def preset_ner_dct(ner_graph_df):
    ## each unique 'label'- org, person is a key
    ner_list = list(ner_graph_df['label'].unique())
    dct = {}
    ## each label's item is another empty dict
    for n in ner_list:
        x = {}
        dct[n] = x
        #iterate thru the outer dict to find key w correct label, then assign to false
        for i, v in enumerate(ner_graph_df['entity']):
            if ner_graph_df['label'][i] == n:
                x[v] = False

    return dct

## NER Updating
def update_ner(type, v, dct):
    try:
        dct[type][v] = True
    except:
        raise ValueError()

def filter(json_output,keys):
    data = json.loads(json_output)  # Parse the JSON string
    relationships = data['relationships']
    filtered_dicts = []

    for dict in relationships:
        if (dict['source'] in keys) or (dict['target'] in keys):
            old_ = dict['source']
            new_ = dict['target']
            dict['source'] = old_.replace(' ','_').replace('-','_').replace("'",'').replace("�", '').replace("(","").replace(")","")
            dict['target'] = new_.replace(' ','_').replace('-','_').replace("'",'').replace("�",'').replace("(","").replace(")","")
            filtered_dicts.append(dict)
    return filtered_dicts

def get_true_keys(data_dict):
    true_keys = []
    for category, entities in data_dict.items():
        for entity, is_selected in entities.items():
            if is_selected:
                true_keys.append(entity)
    return true_keys


def filtered_df(df, v):
    filtered_df = df[df['entity'].isin(v)]
    return list(filtered_df['original_text'].unique())


# Simple Flask routes to demonstrate returning JSON
@app.route("/")
def index():
    # Return minimal inline HTML as a placeholder
    return render_template("v.html")

@app.route("/get_dct")
def get_dct():
    print("testing")
    # Example usage with a fake file; replace with a real path
    ner_graph_df = pre_load_excel("news_excerpts_parsed.xlsx")
    global dct
    global df
    df = ner_graph_df
    print(ner_graph_df['label'])
    dct = preset_ner_dct(ner_graph_df)
    return jsonify(dct)

@app.route("/load_ner")
def load_ner():
    print("after testing, we can pre load a cached ner")
    return jsonify(dct)

@app.route("/update_dct", methods=["POST"])
def update_dct():
    global dct
    updated_data = request.get_json()  # e.g. { "ORG": {"NLRB": true, ...}, ... }
    if updated_data:
        dct = updated_data
    filtered_keys = get_true_keys(dct)
    filtered_sentences = filtered_df(df, filtered_keys)
    raw_json = get_relationship(filtered_sentences)
    
    final_json = extract_json_from_output(raw_json)
    filtered_output = filter(final_json,filtered_keys)
    generate_plant_uml_image(filtered_output)
    return jsonify(final_json)

    

def get_relationship(PROMPT, model="deepseek-r1-distill-llama-70b", MaxToken=5000, outputs=2, temperature=0.7):
    client = Groq(api_key="your_api_key")
    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": (
                    "Extract entities and relationships from the following text. "
                    "For relationships, standardize the use of 'source', 'target', 'relation'. "
                    "Format your response in STRICT JSON with the following structure: "
                    "{"
                    "  \"entities\": [{\"name\": <entity_name>, \"attributes\": [<attributes>]}], "
                    "  \"relationships\": [{\"source\": <entity_name>, \"target\": <entity_name>, \"relation\": <relationship_type>}] "
                    "}. "
                    "The name and attributes should be specific to the context given by the input. "
                    f"Respond in STRICT JSON format with 'entities' and 'relationships' keys only: {PROMPT}"
                )
            }
        ],
        temperature=temperature,
        max_completion_tokens=MaxToken,
        top_p=0.95,
        stream=False,
        stop=None,
    )
    print(PROMPT)
    return response.choices[0].message.content

def extract_json_from_output(output):
    # Use regex to find the JSON part
    match = re.search(r'```json(.*?)```', output, re.DOTALL)
    if match:
        json_part = match.group(1).strip()
        return json_part
    else:
        return ""

def generate_plant_uml_image(relationships, output_file = "images/ERD.png"):
    plantuml_code = '@startuml\n'
    x = {}
    for relation in relationships:
        if relation['source'] not in x:
            x[relation['source']] = 0
        if relation['target'] not in x:
            x[relation['target']] = 0

    for relation in relationships:
        if x[relation['source']] == 0:
            plantuml_code += f"entity {relation['source']} " + "{ \
            \ntype: String \n} \n"

            x[relation['source']] = 1
        
        if x[relation['target']] == 0:
            plantuml_code += f"entity {relation['target']} " + "{ \
            \ntype: String \n} \n"

            x[relation['target']] = 1
        
    for relation in relationships:
        plantuml_code += f"{relation['source']} -> {relation['target']} : {relation['relation']}\n"
        
    plantuml_code += '@enduml'


    temp_file = "temp.puml"
    with open(temp_file, "w") as f:
        f.write(plantuml_code)

    server = PlantUML(url='http://www.plantuml.com/plantuml/img/',
                      basic_auth={},
                      form_auth={}, http_opts={}, request_opts={})
    server.processes_file(temp_file, output_file)

@app.route("/images/<filename>")
def serve_image(filename):
    return send_from_directory(os.path.join(app.root_path, 'images'), filename)

@app.route('/view_html')
def view_html():
    return render_template('v.html') 

if __name__ == "__main__":
    app.run(debug=True, port=5001)