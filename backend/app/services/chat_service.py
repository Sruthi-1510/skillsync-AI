import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

# simple memory
chat_history = []

# def get_chat_response(message, user_data=None):
#     """
#     message: user question
#     user_data: dict (skills, missing skills, score)
#     """

#     context = ""

#     if user_data:
#         context = f"""
#         Student Profile:
#         Skills: {user_data.get('skills')}
#         Missing Skills: {user_data.get('missing_skills')}
#         Match Score: {user_data.get('match_score')}
#         """

#     full_prompt = f"""
#     You are an AI Placement Mentor.

#     {context}

#     User Question:
#     {message}

#     Give clear, practical, and personalized guidance.
#     """

#     chat_history.append(full_prompt)

#     response = model.generate_content(chat_history)

#     reply = response.text

#     chat_history.append(reply)

#     return reply

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
        print("ERROR:", e)   # 👈 THIS WILL SHOW REAL ERROR
        return "Something went wrong"
    