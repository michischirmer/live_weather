var time = [], temperature = [];
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
        time = [];
        temperature = [];
        json.forEach(element => {
            time.push(element['Time']);
            temperature.push(element['Temperature']);
        });
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
                        stepSize: 0.3
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
                    // TODO: add variable step size
                    stepSize: 0.3
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