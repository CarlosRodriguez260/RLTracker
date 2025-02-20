from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import schedule
import time
from flask import Flask, jsonify, request
from flask_cors import CORS  
from selenium.webdriver.chrome.options import Options
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
@app.route('/scrape', methods=['POST'])

def get_ranks():
    data = request.json
    url = data.get('url')
    print(url)
    options = Options()
    options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=options)
    driver.minimize_window()
    driver.get(url)
    time.sleep(7)
    page = driver.page_source
    soup = BeautifulSoup(page, "html.parser")
    

    verifiedName = 0
    # Test if player name is invalid
    if verifiedName == 0:
        error404 = soup.find("div", class_="content content--error")
        try:
            test = error404.text
            print("Invalid player name...")
            return " "
        except AttributeError:
            print("Valid player name. Searching for rank information...")
            verifiedName = 1

    # Finds information of 1v1 rank
    mmr = soup.find("table", class_="trn-table")
    duelindex = ""
    try:
        duelIndex = mmr.text.find("Duel")
    except AttributeError:
        print("Blah")
        driver.quit()
    duelInformation = ""
    for character in mmr.text[duelIndex::]:
        if character != "#":
            duelInformation = duelInformation + character
        else:
            break

    # Finds information of 2v2 rank
    doublesIndex = mmr.text.find("Doubles")
    doublesInformation = ""
    for character in mmr.text[doublesIndex::]:
        if character != "#":
            doublesInformation = doublesInformation + character
        else:
            break
    
    # Finds information of 3v3 rank
    standardIndex = mmr.text.find("Standard")
    standardInformation = ""
    for character in mmr.text[standardIndex::]:
        if character != "#":
            standardInformation = standardInformation + character
        else:
            break

    infoArray = [duelInformation, doublesInformation, standardInformation]
    print("Done!")
    driver.quit()
    return jsonify({'data':infoArray})

if __name__ == '__main__':
    app.run(debug=True)