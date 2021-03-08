var time = [], temperature = [], pressure = [], humidity = [];
var count = 0;
var min_left = 0, max_left = 24, min_right = 940, max_right = 1030;

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
				borderColor: window.chartColors.red,
				backgroundColor: window.chartColors.red,
				fill: false,
				data: temperature,
				yAxisID: 'y-axis-1',
			}, {
				label: 'Pressure',
				borderColor: window.chartColors.blue,
				backgroundColor: window.chartColors.blue,
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
                        min: min_left,
                        max: max_left
                    }
                }, {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    ticks: {
                        min: min_right,
                        max: max_right
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
				borderColor: window.chartColors.red,
				backgroundColor: window.chartColors.red,
				fill: false,
				data: temperature,
				yAxisID: 'y-axis-1',
			}, {
				label: 'Pressure',
				borderColor: window.chartColors.blue,
				backgroundColor: window.chartColors.blue,
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
                        min: min_left,
                        max: max_left
                    }
                }, {
                    type: 'linear', 
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    ticks: {
                        min: min_right,
                        max: max_right
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