from vertexai.generative_models import GenerativeModel
import vertexai

# Initialize Vertex AI environment
vertexai.init(project="kasik-alpha-trade", location="us-central1")

# Load Gemini model
model = GenerativeModel("gemini-1.5-pro-001")

prompt = "Narrate strategic clarity for AlphaFusion, fill rate 0.82, entropy 0.27, latency 54ms."

try:
    response = model.generate_content(prompt)
    print(f"""🧾 Narration Output:
{response.text}""")
except Exception as e:
    print(f"""❌ Narration failed: {type(e).__name__}
{e}""")