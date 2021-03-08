var time = [], temperature = [], pressure = [], humidity = [];
var count = 0;

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
        json.forEach(element => {
            time.push(element['Time']);
            temperature.push(element['Temperature']);
			pressure.push(element['Pressure']);
			humidity.push(element['Humdity']);
        });
    }
}

function update(){
    get_data();
    config = {
        type: 'line',
        data: {
            labels: time,
            datasets: [
				{
					label: 'Temperature',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: temperature,
					fill: false,
            	},
				{
					label: 'Pressure',
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					data: pressure,
					fill: false,
				}
			]
        },
        options: {
            responsive: true,
            title: {
                display: false,
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature'
                    },
                    ticks: {
                        stepSize: 1
                    }
                }]
            }
        }
    };
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
    if (count >= 5){
        setTimeout(update, 10000);
    }else{
        setTimeout(update, 100);
        count ++;
    }
    
}



var config = {
    type: 'line',
    data: {
        labels: ['125214', '34go', 'uzgbui', 'iuzgbiu', 'iuzgbuzi', 'uizgbzui', 'iuzgbzi', 'iuzgb'],
        datasets: [
			{
				label: 'Temperature',
				backgroundColor: window.chartColors.red,
				borderColor: window.chartColors.red,
				data: temperature,
				fill: false,
			},
			{
				label: 'Pressure',
				backgroundColor: window.chartColors.blue,
				borderColor: window.chartColors.blue,
				data: pressure,
				fill: false,
			}
		]
    },
    options: {
        responsive: true,
        title: {
            display: false,
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Temperature'
                },
                ticks: {
                    stepSize: 1
                }
            }]
        }
    }
};

window.onload = function() {
    Chart.defaults.global.animation.duration = 0;
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
    setTimeout(get_data, 100);
    setTimeout(update, 100);
};