from vertexai.generative_models import GenerativeModel
import vertexai

print("🔍 Narrator booting up...")

vertexai.init(
    project="kasik-alpha-trade",
    location="us-central1",
)

model = GenerativeModel("gemini-1.5-pro-001")

prompt = (
    "Narrate strategic clarity for AlphaFusion, "
    "fill rate 0.82, entropy 0.27, latency 54ms."
)

try:
    response = model.generate_content(prompt)
    print(f"""🧾 Narration Output:
{response.text}
""")
except Exception as error:
    print(f"""❌ Narration failed: {type(error).__name__}
{error}""")

# ensure a final newline
