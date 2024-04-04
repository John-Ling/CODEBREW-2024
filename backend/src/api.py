from flask import Flask, request, jsonify, Response
from dotenv import load_dotenv, find_dotenv
import os
import anthropic
import datetime

# TODO
# change origin to something better
# refine prompt for more nuanced answers

# change later
ORIGIN = '*'

app = Flask(__name__)

# Load the API key
load_dotenv(find_dotenv())
key = os.environ.get("API_KEY")

@app.route('/query', methods=['POST', "OPTIONS"])
def get_tasks():
    if request.method == "OPTIONS":
        return Response(headers={
            "access-control-allow-origin": ORIGIN,
            "access-control-allow-headers": ORIGIN,
            "access-control-allow-methods": ORIGIN
        })

    user_query = request.json.get('user_query')

    # Get current date time
    current_datetime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    system_prompt = """
        You are a professional time and calendar management assistant.
        You will take in the user query
        Your response should be json with a list of tasks. An example with two tasks:
        {
            "tasks": [
                {
                    "task": "TASK NAME",
                    "priority": PRIORITY
                },
                {
                    "task": "TASK NAME",
                    "priority": PRIORITY
                },
            ]
        }
        The task name should be a short description of what the task is ideally under 10 words.
        The task name may also incorporate the timeframe in its name.
        You are only concerned with what can be done today. 
        If the user talks about a meeting tomorrow your tasks for them would be to prepare for the meeting not attend it.
        Keep your tasks high level. Create 1 task for 1 event.
        The priority should be an integer between 1 and 10 and based on the timeframe of the task. 
        A incredibly urgent task due today would have a score of 10. A task due tomorrow or in a very small timeframe will have a high score.
        Something due in a few weeks or months will have a score close to 0. 
        A task with no timeframe will have a score of 0.

        The current time is: 
        """ + current_datetime

    client = anthropic.Anthropic(api_key=key)
    message = client.messages.create(
        model="claude-3-opus-20240229",
        system=system_prompt,
        max_tokens=1024,
        messages=[
            {"role": "user", "content": user_query}
        ]
    )
    
    response = jsonify(message.content[0].text)
    response.headers.add("access-control-allow-origin", ORIGIN)
    return response

if __name__ == '__main__':
    app.run(host="127.0.0.1", debug=True)
