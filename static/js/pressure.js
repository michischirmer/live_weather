var time = [], pressure = [];
var count = 0;
var range_min = 940, range_max = 1030;

function get_data(){    
    var json;
    $.ajax({
        url: '/getData',
        type: 'GET',
        success: function(response) {
            json = $.parseJSON(response);
            document.getElementById("avg").innerHTML = "Average Air Pressure: " + json['avg'][0]['avg_Pressure'] + " hPa";
        },
        error: function(error) {
            console.log(error);
        }
    });
    setTimeout(start, 400);

    function start() {
        time = [];
        pressure = [];
        json['data'].forEach(element => {
            time.push(element['Time']);
            pressure.push(element['Pressure']);
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
                label: 'Air Pressure',
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: pressure,
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
                        labelString: 'Air Pressure in hPa'
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
            label: 'Air Pressure',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: pressure,
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
                    labelString: 'Air Pressure in hPa'
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
    setTimeout(get_data, 100);
    setTimeout(update, 100);
};
