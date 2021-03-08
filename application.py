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
    return render_template('temperature.html')

@app.route('/humidity')
def humidity():
    return render_template('humidity.html')

@app.route('/pressure')
def pressure():
    return render_template('pressure.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/compare')
def comapare():
    return render_template('compare.html')    

@app.route('/getData')
def get_data():
    temperature_data = db.execute("SELECT round(temperature, 3) as Temperature, round(humidity, 2) as Humidity, round(pressure, 2) as Pressure, timestamp FROM datapoints")
    for entry in range(len(temperature_data)):
        temperature_data[entry]['Time'] = datetime.fromtimestamp(temperature_data[entry]['Timestamp']).strftime("%m/%d/%Y %H:%M:%S")
    temperature_data = temperature_data[-45:]
    avg_data = db.execute("SELECT round(avg(temperature), 2) as avg_Temperature, round(avg(pressure), 3) as avg_Pressure, round(avg(humidity), 2) as avg_Humidity FROM datapoints")
    data = {
        'data' : temperature_data,
        'avg': avg_data
    }
    return json.dumps(data)

@app.route('/getAvg')
def avg():
    avg_data = db.execute("SELECT avg(temperature) as avg_Temperature, avg(pressure) as avg_Pressure, avg(humidity) as avg_Humidity FROM datapoints")
    print(avg_data)
    return json.dumps(avg_data)

def errorhandler(e):
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)

for code in default_exceptions:
    app.errorhandler(code)(errorhandler)

if __name__ == '__main__':
    app.run(threaded=True, port=5555, host='0.0.0.0', debug=False)