var time = [], temperature = [];
var count = 0;
var range_min = 16, range_max = 24;

function get_data(){    
    var json, json_avg;
    $.ajax({
        url: '/getData',
        type: 'GET',
        success: function(response) {
            json = $.parseJSON(response);
            document.getElementById("avg").innerHTML = "Average Temperature: " + json['avg'][0]['avg_Temperature'] + "°C";
            console.log(json['data']);
        },
        error: function(error) {
            console.log(error);
        }
    });
    setTimeout(start, 500);

    function start() {
        time = [];
        temperature = [];
        json['data'].forEach(element => {
            time.push(element['Time']);
            temperature.push(element['Temperature']);
        });

        for(let i = 1; i < time.length; i += 2){
            time[i] = "";
        }
    }
}

function update(){
    get_data();
    config = {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'Temperature',
                backgroundColor: window.chartColors.yellow,
                borderColor: window.chartColors.yellow,
                data: temperature,
                fill: false,
            }]
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
                        labelString: ''
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature in °C'
                    },
                    ticks: {
                        min: range_min,
                        max: range_max
                    }
                }]
            }
        }
    };
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
    if (count >= 10){
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
        datasets: [{
            label: '',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: temperature,
            fill: false,
        }]
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
                    labelString: ''
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Temperature in °C'
                },
                ticks: {
                    min: range_min,
                    max: range_max
                }
            }]
        }
    }
};

window.onload = function() {
    Chart.defaults.global.animation.duration = 0;
    Chart.defaults.global.legend.display = false;
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
    document.getElementById("rangeMax").value = range_max;
    document.getElementById("rangeMin").value = range_min;
    setTimeout(get_data, 100);
    setTimeout(update, 100);
};

function updateTextInputMin(val) {
    document.getElementById('rangeMinText').innerHTML = "Minimum: " + val + "°C"; 
    range_min = parseInt(val);
    update();
}

function updateTextInputMax(val) {
    document.getElementById('rangeMaxText').innerHTML = "Maximum: " + val + "°C"; 
    range_max = parseInt(val);
    update();
}
