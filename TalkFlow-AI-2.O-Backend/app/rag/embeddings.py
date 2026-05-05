import json
import os
from openai import OpenAI
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from huggingface_hub import login

load_dotenv()

hf_token = os.getenv("HF_TOKEN")

if hf_token:
    login(token=hf_token)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
print("Embedding model loaded successfully")

def generate_embedding(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )

    return response.data[0].embedding


def embedding_to_string(embedding):
    return json.dumps(embedding)


def string_to_embedding(embedding_str):
    return json.loads(embedding_str)