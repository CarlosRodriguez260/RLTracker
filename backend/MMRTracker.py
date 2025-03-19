from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from flask import Flask, jsonify, request
from flask_cors import CORS  
from selenium.webdriver.chrome.options import Options
import requests
import json

context = [] # Stores conversation history
app = Flask(__name__)
CORS(app,origins=["*"])

@app.route('/scrape', methods=['POST'])
def get_ranks():
    data = request.json
    url = data.get('url')
    options = Options()
    options.add_argument("--no-sandbox")
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
    driver = webdriver.Chrome(options = options)
    driver.get(url)

    try:
        # Wait for the table to be present in the DOM
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.TAG_NAME, "table"))
        )
    except Exception as e:
        print(f"Error waiting for table: {e}")
        driver.quit()
        return jsonify({"data":[]})
    
    page = driver.page_source
    soup = BeautifulSoup(page, "html.parser")

    # Check if player is error
    try:
        error = soup.find("div", class_="content content--error")
        error.text
        return jsonify({"data":[]})
    except AttributeError:
        # No error
        ranks = ""

    data = soup.find_all("div", class_="mmr")
    names = soup.find_all("div", class_="playlist")
    ranks = soup.find_all("td", class_="name")
    pictures = soup.find_all("td", class_="icon-container")

    mmr = []
    playlist = []
    rank = []
    picture = []
    for value in data:
        mmr.append(value.text)
    for value in names:
        playlist.append(value.text)
    for value in ranks:
        try:
            temp = value.find("div", class_="rank")
            rank.append(temp.text)
        except AttributeError:
            continue
    for value in pictures:
        try:
            temp = value.find("img", class_="icon")
            picture.append(temp.get("src"))
        except AttributeError:
            continue
    
    driver.quit()
    return jsonify({'data':mmr, 'playlist':playlist, 'rank':rank, 'picture':picture})

@app.route('/api/chat', methods=['POST'])
def chat_ai():

    # Code for talking to OpenAI models
    # try:
    #     print("First step")
    #     data = request.json
    #     message = data.get("message", "")
        
    #     print("Second step")
    #     response = requests.post(
    #         "https://api.openai.com/v1/chat/completions",
    #         headers={"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"},
    #         json={"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": message}]}
    #     )

    #     print("Third step")
    #     print(response.status_code, response.text)  # Debug API response
    #     response_json = response.json()
    #     reply = response_json["choices"][0]["message"]["content"]

    #     print(reply)
    #     return jsonify({"reply":reply})

    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500

    # Code for talking to local AI models hosted with ollama

    try:
        global context
        data = request.json
        message = data.get("query","")
        model = "llama3.2"

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                'model':model,
                'prompt':message,
                'context':context,
            })
        response.raise_for_status()

        print("Llama3.2 responded!")
        print("Response Status Code:", response.status_code)

        reply = ""
        for line in response.iter_lines():
            body = json.loads(line)
            print(body)

            if body.get('done',True):
                context = body["context"]
                return jsonify({'reply':reply})
            reply += body.get('response','')

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)