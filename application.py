from flask import Flask, redirect, render_template, request
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from helpers import apology
from functools import wraps
import json

import dateutil.parser
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
    return render_template('data.html', var="Temperature", name="Temperature", unit="°C", min=10, max=24)

@app.route('/humidity')
def humidity():
    return render_template('data.html', var="Humidity", name="Humidity", unit="%", min=0, max=100)

@app.route('/pressure')
def pressure():
    return render_template('data.html', var="Pressure", name="Air Pressure", unit="hPa", min=940, max=1030)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/compare')
def comapare():
    return render_template('compare.html')

@app.route('/getData')
def get_data():
    if not request.args.get('min'):
        with open('sql/datapoints.sql') as f:
            sql_data = f.read()

        temperature_data = db.execute(sql_data)
        for entry in range(len(temperature_data)):
            temperature_data[entry]['Time'] = datetime.fromtimestamp(temperature_data[entry]['Timestamp']).strftime("%m/%d/%Y %H:%M")

        with open('sql/average.sql') as f:
            sql_avg = f.read()
        avg_data = db.execute(sql_avg)
        data = {
            'data' : temperature_data[::-1],
            'avg': avg_data
        }
        return json.dumps(data)
    else:
        min = datetime.timestamp(datetime.strptime(request.args.get('min'), '%Y-%m-%dT%H:%M:%S.%fZ'))
        max = datetime.timestamp(datetime.strptime(request.args.get('max'), '%Y-%m-%dT%H:%M:%S.%fZ'))
        with open('sql/period.sql') as f:
            sql_data = f.read()

        temperature_data = db.execute(sql_data, min=min, max=max)
        for entry in range(len(temperature_data)):
            temperature_data[entry]['Time'] = datetime.fromtimestamp(temperature_data[entry]['Timestamp']).strftime("%m/%d/%Y %H:%M")

        with open('sql/period_avg.sql') as f:
            sql_avg = f.read()
        avg_data = db.execute(sql_avg, min=min, max=max)
        data = {
            'data' : temperature_data[::-1],
            'avg': avg_data
        }

        return json.dumps(data)

def errorhandler(e):
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)

for code in default_exceptions:
    app.errorhandler(code)(errorhandler)

if __name__ == '__main__':
    app.run(threaded=True, port=5555, host='0.0.0.0', debug=False)