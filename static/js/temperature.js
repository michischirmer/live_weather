var time = [], temperature = [];
var count = 0;
var range_min = 13, range_max = 24;
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
                document.getElementById("avg").innerHTML = json['avg'][0]['avg_Temperature'] + "°C";
                document.getElementById("current").innerHTML = json['data'][json['data'].length-1]['Temperature'] + "°C";
                //console.log(json['data'][json['data'].length-1]['Temperature']);
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
                document.getElementById("avg").innerHTML = json['avg'][0]['avg_Temperature'] + "°C";
                document.getElementById("current").innerHTML = json['data'][json['data'].length-1]['Temperature'] + "°C";
                //console.log(json['data'][json['data'].length-1]['Temperature']);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
    
    setTimeout(start, 700);

    function start() {
        time = [];
        temperature = [];
        json['data'].forEach(element => {
            time.push(element['Time']);
            temperature.push(element['Temperature']);
        });

        console.log(time[0]);
        console.log(time[time.length - 1]);

        // add time to input thingy here
        let timeMin = new Date(Date.parse(time[0])).toISOString();
        let timeMax = new Date(Date.parse(time[time.length - 1])).toISOString();

        document.getElementById("timeMin").value = timeMin.substring(0, timeMin.length - 5);
        document.getElementById("timeMax").value = timeMax.substring(0, timeMax.length - 5);

        console.log(Date.parse(time.length - 1));

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
    setTimeout(get_data, 100);
    setTimeout(update, 100);
};

function show () {
    var min = document.getElementById("timeMin").value;
    var max = document.getElementById("timeMax").value;
    dateMinR = new Date(min);
    dateMaxR = new Date(max);

    dateMinR.setMinutes(dateMinR.getMinutes() + 60);
    dateMinR = new Date(dateMinR);
    dateMaxR.setMinutes(dateMaxR.getMinutes() + 60);
    dateMaxR = new Date(dateMaxR);

    dateMin = dateMinR.toJSON();
    dateMax = dateMaxR.toJSON();

    range = true;
    get_data();
    update();
};