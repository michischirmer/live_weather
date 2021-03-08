var time = [], temperature = [], pressure = [], humidity = [];
var count = 0;

var temperature_data = [0, 24, window.chartColors.yellow, temperature, 'Temperature'];
var pressure_data = [940, 1030, window.chartColors.red, pressure, 'Air Pressure'];
var humidity_data = [0, 100, window.chartColors.blue, humidity, 'Humidity'];
var sets = [temperature_data, pressure_data, humidity_data];

var current_left = temperature_data, current_right = pressure_data;
var left_display = true, right_display = true;

function init(){
    temperature_data = [0, 24, window.chartColors.yellow, temperature, 'Temperature'];
    pressure_data = [940, 1030, window.chartColors.red, pressure, 'Air Pressure'];
    humidity_data = [0, 100, window.chartColors.blue, humidity, 'Humidity'];
    sets = [temperature_data, pressure_data, humidity_data];
}


function get_data(){
    var json;
    $.ajax({
        url: '/getData',
        type: 'GET',
        success: function(response) {
            json = $.parseJSON(response);
        },
        error: function(error) {
            console.log(error);
        }
    });

    for(let i = 1; i < time.length; i += 2){
        time[i] = "";
    }
    setTimeout(start, 500);

    function start() {
        time = [], temperature = [], pressure = [], humidity = [];
        temperature_data = [], pressure_data = [], humidity_data = [];
        json['data'].forEach(element => {
            time.push(element['Time']);
            temperature.push(element['Temperature']);
			pressure.push(element['Pressure']);
			humidity.push(element['Humidity']);
        });
    }
    temperature_data = [0, 24, window.chartColors.yellow, temperature, 'Temperature'];
    pressure_data = [940, 1030, window.chartColors.red, pressure, 'Air Pressure'];
    humidity_data = [0, 100, window.chartColors.blue, humidity, 'Humidity'];
    sets = [temperature_data, pressure_data, humidity_data];
}

function update(){
    get_data();
    init();
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: {
			labels: time,
			datasets: [{
				label: current_left[4],
				borderColor: current_left[2],
				backgroundColor: current_left[2],
				fill: false,
				data: current_left[3],
				yAxisID: 'y-axis-1',
			}, {
				label: current_right[4],
				borderColor: current_right[2],
				backgroundColor: current_right[2],
				fill: false,
				data: current_right[3],
				yAxisID: 'y-axis-2'
			}]
		},
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: ''
            },
            scales: {
                yAxes: [{
                    type: 'linear', 
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        min: current_left[0],
                        max: current_left[1]
                    }
                }, {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    ticks: {
                        min: current_right[0],
                        max: current_right[1]
                    },

                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }],
            }
        }
    });
    if (count >= 10){
        setTimeout(update, 10000);
    }else{
        setTimeout(update, 250);
        count ++;
    }
}

window.onload = function() {
    current_left = temperature_data, current_right = pressure_data;
    Chart.defaults.global.animation.duration = 0;
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: {
			labels: time,
			datasets: [{
				label: current_left[4],
				borderColor: current_left[2],
				backgroundColor: current_left[2],
				fill: false,
				data: current_left[3],
				yAxisID: 'y-axis-1',
			}, {
				label: current_right[4],
				borderColor: current_right[2],
				backgroundColor: current_right[2],
				fill: false,
				data: current_right[3],
				yAxisID: 'y-axis-2'
			}]
		},
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: ''
            },
            scales: {
                yAxes: [{
                    type: 'linear', 
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        min: current_left[0],
                        max: current_left[1]
                    }
                }, {
                    type: 'linear', 
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    ticks: {
                        min: current_right[0],
                        max: current_right[1]
                    },

                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }],
            }
        }
    });
    setTimeout(get_data, 300);
    setTimeout(update, 250);
};

function changed(val, direction){
    if (direction == 0){
        if (val == 3){
            left_display = false;
            current_left = [0, 10, window.chartColors.grey, [0,0,0,0,0], '']
        }else{
            left_display = true;
            current_left = sets[val];
        }   
    }else if (direction == 1){
        if (val == 3){
            right_display = false;
            current_right = [0, 10, window.chartColors.grey, [0,0,0,0,0], '']
        }else{
            right_display = true;
            current_right = sets[val];
        }  
    }
    temperature_data = [0, 24, window.chartColors.yellow, temperature, 'Temperature'];
    pressure_data = [940, 1030, window.chartColors.red, pressure, 'Air Pressure'];
    humidity_data = [0, 100, window.chartColors.blue, humidity, 'Humidity'];
    sets = [temperature_data, pressure_data, humidity_data];
    console.log(sets[val]);
    update();
}
