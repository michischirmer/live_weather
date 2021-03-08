from cs50 import SQL
import bme280
from datetime import datetime
import time

db = SQL("sqlite:///data.db")
while(1):
	print("Reading Value & Adding to DB")
	temperature,pressure,humidity = bme280.readBME280All()

	now = datetime.now()
	timestamp = datetime.timestamp(now)

	db.execute("INSERT INTO datapoints ([Temperature], [Humidity], [Pressure], [Timestamp]) VALUES (?, ?, ?, ?);", temperature, humidity, pressure, timestamp)
	time.sleep(60)
