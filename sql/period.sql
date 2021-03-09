SELECT round(temperature, 3) as Temperature, round(humidity, 2) as Humidity, round(pressure, 2) as Pressure, timestamp
FROM datapoints 
WHERE timestamp > :min AND timestamp < :max
ORDER BY Timestamp DESC