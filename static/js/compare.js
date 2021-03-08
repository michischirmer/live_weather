var time = [], temperature = [], pressure = [], humidity = [];
var count = 0;

var temperature_data = [0, 24, window.chartColors.yellow];
var pressure_data = [940, 1030, window.chartColors.red];
var humidity_data = [0, 100, window.chartColors.blue];

var current_left = temperature_data, current_right = pressure_data;

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
    
    setTimeout(start, 100);

    function start() {
        time = [], temperature = [], pressure = [], humidity = [];
        json['data'].forEach(element => {
            time.push(element['Time']);
            temperature.push(element['Temperature']);
			pressure.push(element['Pressure']);
			humidity.push(element['Humdity']);
        });
    }
}

function update(){
    get_data();
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: {
			labels: time,
			datasets: [{
				label: 'Temperature',
				borderColor: current_left[2],
				backgroundColor: current_left[2],
				fill: false,
				data: temperature,
				yAxisID: 'y-axis-1',
			}, {
				label: 'Pressure',
				borderColor: current_right[2],
				backgroundColor: current_right[2],
				fill: false,
				data: pressure,
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
    if (count >= 5){
        setTimeout(update, 10000);
    }else{
        setTimeout(update, 100);
        count ++;
    }
}

window.onload = function() {
    Chart.defaults.global.animation.duration = 0;
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: {
			labels: time,
			datasets: [{
				label: 'Temperature',
				borderColor: current_left[2],
				backgroundColor: current_left[2],
				fill: false,
				data: temperature,
				yAxisID: 'y-axis-1',
			}, {
				label: 'Pressure',
				borderColor: current_right[2],
				backgroundColor: current_right[2],
				fill: false,
				data: pressure,
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
    setTimeout(get_data, 100);
    setTimeout(update, 100);
};