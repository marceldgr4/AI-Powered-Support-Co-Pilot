from langchain.prompts import ChatPromptTemplate

ANALYSIS_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """
Eres un experto en análisis de tickets de soporte.

Categorías: Técnico, Facturación, Comercial, General
Sentimientos: Positivo, Neutral, Negativo

{format_instructions}
"""),
    ("user", "{ticket_text}")
])
