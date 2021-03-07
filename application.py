from flask import Flask, redirect, render_template, request
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from helpers import apology
from functools import wraps
import json

from datetime import datetime
from cs50 import SQL

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

db = SQL("sqlite:///data.db")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/temperature')
def temp():
    temperature_data = db.execute("SELECT temperature, timestamp FROM datapoints")
    for entry in range(len(temperature_data)):
        temperature_data[entry]['Time'] = datetime.fromtimestamp(temperature_data[entry]['Timestamp']).strftime("%m/%d/%Y %H:%M:%S")
    return render_template('temperature.html', data=temperature_data)

@app.route('/getData')
def get_data():
    temperature_data = db.execute("SELECT temperature, timestamp FROM datapoints")
    for entry in range(len(temperature_data)):
        temperature_data[entry]['Time'] = datetime.fromtimestamp(temperature_data[entry]['Timestamp']).strftime("%m/%d/%Y %H:%M:%S")
    return json.dumps(temperature_data)

def errorhandler(e):
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)

for code in default_exceptions:
    app.errorhandler(code)(errorhandler)

if __name__ == '__main__':
    app.run(threaded=True, port=5555, host='0.0.0.0')