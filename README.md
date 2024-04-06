<p align="center">
  <img width="600" alt="logo" src="https://github.com/John-Ling/CODEBREW-2024/assets/100111224/28289577-7360-450e-a248-05640c4b7930">
</p>


# Ramble: Turn your ramblings into productivity.

CISSA Codebrew hackathon 2024 submission.
Team Members: John Ling, Han-Fong "Frank" Hsu, Nirav Pandey 

Ramble is a web app built using ReactJS, Flask and Anthropic's Claude 3 Opus LLM. Usage of the app is simple. 

__Just type.__

Just type out what you need to do for today doesn't matter how informal or formal it is, serious or light-hearted, coherent or basically garbage.
Just type about what 

Ramble will then take your text or your "ramble" and discern important tasks from it.
From that it generates a coherent and clean looking schedule for you to follow complete with ideal start and end times.

![image](https://github.com/John-Ling/CODEBREW-2024/assets/100111224/6dd3d648-c603-429c-8ab8-4283797a2467)

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
