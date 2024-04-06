# Ramble
Turning your ramblings into producivity.

CISSA Codebrew hackathon 2024 submission.
Team Members: John Ling, Han-Fong "Frank" Hsu, Nirav Pandey 

Ramble is a web app built using ReactJS, Flask and Anthropic's Claude 3 Opus LLM. Usage of the app is simple. 

Just type.

Just type out what you need to do for today and Ramble wil take your text and discern important tasks from it.
From your ramblings it generates a coherent and clean looking schedule for you to follow complete with ideal start and end times.

### How to Build

You will need an Anthropic API key. 
Place this key in a .env file under the backend/src/ directory.
Format should be 
```
API_KEY="{your key}"
```
Then build using docker

```
git clone https://github.com/John-Ling/CODEBREW-2024.git
cd CODEBREW-2024
docker compose build
docker compose up
```

Navigate over to http://localhost and give it a try!
