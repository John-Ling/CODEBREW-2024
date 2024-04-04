from flask import Flask, request, jsonify
from dotenv import load_dotenv, find_dotenv
import os
import anthropic
import datetime

app = Flask(__name__)

# Load the API key
load_dotenv(find_dotenv())
key = os.environ.get("API_KEY")

@app.route('/', methods=['POST'])
def get_tasks():
    user_query = request.json.get('user_query')

    # Get current date time
    current_datetime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    system_prompt = f"""
        You are a professional time and calendar management assistant.
        You will take in the user query
        Respond as json like the following: 
        {{
            "tasks": [
                {{
                "task": "Cook dinner",
                "priority": 10
                }},
                {{
                "task": "Revise for test next week",
                "priority": 3
                }},
                {{
                "task": "Plan trip for next year",
                "priority": 1
                }}
            ]
        }}
        Follow the rules stated below: 
        - The task should be a short description of what the task is
        - Do not split a single task into two
        - The priority should be an integer between 1 and 10

        Here are some background information: 
        - Current Date Time: {current_datetime}
        """

    client = anthropic.Anthropic(api_key=key)
    message = client.messages.create(
        model="claude-3-opus-20240229",
        system=system_prompt,
        max_tokens=1024,
        messages=[
            {"role": "user", "content": user_query}
        ]
    )
    
    response = {
        "tasks": message.content[0].text.splitlines()
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
