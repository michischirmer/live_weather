SELECT round(avg(temperature), 2) as avg_Temperature, round(avg(pressure), 2) as avg_Pressure, round(avg(humidity), 2) as avg_Humidity
FROM (
	SELECT round(temperature, 3) as Temperature, round(humidity, 2) as Humidity, round(pressure, 2) as Pressure, timestamp
	FROM datapoints 
	WHERE timestamp > :min AND timestamp < :max
	ORDER BY Timestamp DESC
)