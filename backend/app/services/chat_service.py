import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# ✅ USE THIS MODEL
model = genai.GenerativeModel("gemini-2.5-flash")

def get_chat_response(message, user_data=None):
    try:
        context = ""

        if user_data:
            context = f"""
            Skills: {user_data.get('skills')}
            Missing Skills: {user_data.get('missing_skills')}
            Match Score: {user_data.get('match_score')}
            """

        prompt = f"""
        You are an AI placement mentor.

        {context}

        User Question:
        {message}
        """

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:
        print("ERROR:", e)
        return "Something went wrong"