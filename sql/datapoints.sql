SELECT round(temperature, 3) as Temperature, round(humidity, 2) as Humidity, round(pressure, 2) as Pressure, timestamp
FROM datapoints 
ORDER BY Timestamp DESC 
LIMIT 40