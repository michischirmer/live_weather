var time = [], humidity = [];
var count = 0;
var range_min = 0, range_max = 100;

function get_data(){    
    var json;
    $.ajax({
        url: '/getData',
        type: 'GET',
        success: function(response) {
            json = $.parseJSON(response);
            document.getElementById("avg").innerHTML = "Average Humidity: " + json['avg'][0]['avg_Humidity'] + "%";
            console.log(json['data']);
        },
        error: function(error) {
            console.log(error);
        }
    });
    setTimeout(start, 200);

    function start() {
        time = [];
        humidity = [];
        json['data'].forEach(element => {
            time.push(element['Time']);
            humidity.push(element['Humidity']);
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
                label: 'Humidity',
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: humidity,
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
                        labelString: 'Humidity in %'
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
        datasets: [{
            label: '',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: humidity,
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
                    labelString: 'Humidity in %'
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