var time = [], pressure = [];
var count = 0;
var range_min = 940, range_max = 1030;
var range = false;
var dateMax, dateMin;

function get_data(){    
    var json, json_avg;
    if (range){
        $.ajax({
            url: '/getData',
            type: 'GET',
            data: {
                min: dateMin,
                max: dateMax
            },
            success: function(response) {
                json = $.parseJSON(response);
                document.getElementById("avg").innerHTML = json['avg'][0]['avg_Pressure'] + " hPa";
                document.getElementById("current").innerHTML = json['data'][json['data'].length-1]['Pressure'] + " hPa";
                //console.log(json['data'][json['data'].length-1]['pressure']);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
    else{
        $.ajax({
            url: '/getData',
            type: 'GET',
            success: function(response) {
                json = $.parseJSON(response);
                document.getElementById("avg").innerHTML = json['avg'][0]['avg_Pressure'] + " hPa";
                document.getElementById("current").innerHTML = json['data'][json['data'].length-1]['Pressure'] + " hPa";
                //console.log(json['data'][json['data'].length-1]['pressure']);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
    
    setTimeout(start, 700);

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
                backgroundColor: window.chartColors.yellow,
                borderColor: window.chartColors.yellow,
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
    if (window.myLine) window.myLine.destroy();
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
    if (count >= 10){
        setTimeout(update, 10000);
    }else{
        setTimeout(update, 500);
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


function show () {
    var min = document.getElementById("timeMin").value;
    var max = document.getElementById("timeMax").value;
    dateMin = new Date(min).toJSON();
    dateMax = new Date(max).toJSON();
    range = true;
    get_data();
    update();
};