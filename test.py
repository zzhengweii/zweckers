# Import required libraries
import pandas as pd
import spacy
import networkx as nx
import matplotlib.pyplot as plt
from itertools import combinations

# Load English language model for spaCy
nlp = spacy.load("en_core_web_sm")

# Read Excel file
df = pd.read_excel('news_excerpts_parsed.xlsx')  # Replace with your file path

# Verify required columns exist
if not all(col in df.columns for col in ['Link', 'Text']):
    raise ValueError("Excel file must contain 'link' and 'text' columns")

# Process text and extract entities
entities = []
for index, row in df.iterrows():
    doc = nlp(row['Text'])
    for ent in doc.ents:
        entities.append({
            'entity': ent.text,
            'label': ent.label_,
            'link': row['Link']
        })

# Create a DataFrame from entities
entities_df = pd.DataFrame(entities)

# Create a knowledge graph
G = nx.Graph()

# Add nodes and edges
for _, row in entities_df.iterrows():
    # Add entity node with attributes
    G.add_node(row['entity'], type='entity', label=row['label'])
    
    # Add link node
    G.add_node(row['link'], type='link')
    
    # Connect entity to its link
    G.add_edge(row['entity'], row['link'])
    
# Add connections between entities that appear in the same text
for _, group in entities_df.groupby('link'):
    entities_in_group = group['entity'].unique()
    for ent1, ent2 in combinations(entities_in_group, 2):
        G.add_edge(ent1, ent2)

# Visualize the graph
plt.figure(figsize=(15, 12))

# Create positions for all nodes
pos = nx.spring_layout(G, k=0.5)

# Separate node types for coloring
entity_nodes = [node for node, attr in G.nodes(data=True) if attr['type'] == 'entity']
link_nodes = [node for node, attr in G.nodes(data=True) if attr['type'] == 'link']

# Draw nodes
nx.draw_networkx_nodes(G, pos, nodelist=entity_nodes, node_color='lightblue', node_size=800)
nx.draw_networkx_nodes(G, pos, nodelist=link_nodes, node_color='lightgreen', node_size=300)

# Draw edges
nx.draw_networkx_edges(G, pos, width=1.0, alpha=0.5)

# Draw labels
nx.draw_networkx_labels(G, pos, font_size=8)

# Create legend
plt.scatter([], [], c='lightblue', label='Entities')
plt.scatter([], [], c='lightgreen', label='Links')
plt.legend(scatterpoints=1, frameon=False, labelspacing=1)

plt.title("Knowledge Graph of Entities and Links")
plt.axis('off')
plt.show()

# Optional: Display entities table
print("Extracted Entities:")
display(entities_df)