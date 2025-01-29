import spacy
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
from itertools import combinations




### Pre-loading the excel
def pre_load_excel(excel):
    # Load English language model
    nlp = spacy.load("en_core_web_sm")

    df = pd.read_excel(excel)
    records = []
    for doc_text in df["Text"]:
        doc = nlp(doc_text)
        for ent in doc.ents:
            records.append((doc_text, ent.text, ent.label_))
    ner_graph_df = pd.DataFrame(records, columns=["original_text", "entity", "label"])

    return ner_graph_df


### Activate the bunch of buttons here
def preset_ner_dct(ner_graph_df):
    ner_list = list(ner_graph_df['label'].unique())
    dct = {}
    for n in ner_list:
        dct[n] = {}
        for i,v in enumerate(ner_graph_df['entity']):
            if ner_graph_df['label'][i] == n:
                dct[n][v] = False
    
    return dct


def update_ner(type, v, dct):
    try:
        dct[type][v] = True
    except:
        raise ValueError()
    

def filter(dct, approve = False):
    ### Do the filtering here
    return 
