from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from flask import Flask, jsonify, request
from flask_cors import CORS  
from selenium.webdriver.chrome.options import Options

app = Flask(__name__)
CORS(app, origins=["*"])
@app.route('/scrape', methods=['POST'])

def get_ranks():
    data = request.json
    url = data.get('url')
    options = Options()
    options.add_argument("--no-sandbox")
    # options.add_argument("--headless")
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

    ranks = soup.findAll("div", class_="mmr")
    names = soup.findAll("div", class_="playlist")
    mmr = []
    playlist = []
    for rank in ranks:
        mmr.append(rank.text)
    for name in names:
        playlist.append(name.text)
    driver.quit()
    return jsonify({'data':mmr, 'playlist':playlist})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)