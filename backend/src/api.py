from flask import Flask, request, jsonify, Response
from dotenv import load_dotenv, find_dotenv
from ics import Calendar, Event
import json
import base64
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

@app.route('/ping')
def pong():
    return "pong";

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
    current_datetime = datetime.datetime.now().strftime("%H:%M")

    system_prompt = """
        You are a restful API.
        Using only the queries you will be provided, your job is to extract tasks from the query and return them.
        Your response should be json with a list of tasks. An example with two tasks:
        {
            "tasks": [
                {
                    "task": "Task Name",
                    "priority": 10,
                    "startTime": "09:00",
                    "endTime": "10:15"
                },
                {
                    "task": "Task Name",
                    "priority": 0,
                    "startTime": "11:00",
                    "endTime": "15:30"
                },
            ]
        }

        The task name should be a short description of what the task is ideally under 5 words.
        The first letter in each word of the task name should be capitalised.
        The task name may also incorporate the timeframe in its name.

        You are only concerned with what can be done today. 
        If the user talks about a meeting tomorrow your tasks for them would be to prepare for the meeting not attend it.
        Keep your tasks high level. Create 1 task for 1 event.

        The priority should be an integer between 1 and 10 and based on the timeframe of the task. 
        A incredibly urgent task due today would have a score of 10. A task due tomorrow or in a very small timeframe will have a high score.
        Something due in a few weeks or months will have a score close to 0. 
        A task with no timeframe will have a score of 0.
        Tasks involved with academics or work such as revising, answering emails or chores should have higher priority then activities for leisure.

        You will be provided with the current time. Within the next 8 hours,
        for each task you should make an estimate in how long the task will take and give a start and end time based on the current time. 
        Time should be in 24 hour mode in the format "HOURS:MINUTES".
        The start times of two tasks should not overlap. They should be separate. 
        The end times of two tasks should not overlap. They should be separate.
        Events that should be done today should have an earlier start time then events that can be done tomorrow or events of low priority.
        The time estimate should be an time estimation in minutes

        The current time is: 
        """ + current_datetime

    client = anthropic.Anthropic(api_key=key)
    message = client.messages.create(
        model="claude-3-haiku-20240307",
        system=system_prompt,
        max_tokens=1024,
        messages=[
            {"role": "user", "content": f"Query: {user_query}"}
        ]
    )
    
    response = jsonify(message.content[0].text)
    response.headers.add("access-control-allow-origin", ORIGIN)
    return response
@app.route('/calendar', methods=['POST'])
def generate_calendar():
    """Returns base64 encoded ics calendar as json object"""
    data = json.loads(request.data)
    tasks = data['tasks']
    priorities = [task['priority'] for task in tasks]

    cal = Calendar()

    for i, task in enumerate(tasks):
        event = Event()
        event.name = task['task']
        event.begin = '20240101T000000Z'
        event.priority = priorities[i]
        cal.events.add(event)

    ics_calendar = cal.serialize()
    ics_calendar_base64 = base64.b64encode(ics_calendar.encode('utf-8')).decode('utf-8')

    response = {
        'ics': ics_calendar_base64
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(host="0.0.0.0")