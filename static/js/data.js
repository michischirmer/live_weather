var time = [], data_field = [];
var count = 0;
var range_min = parseInt(document.getElementById("min").value), range_max = parseInt(document.getElementById("max").value);
var range = false;
var init = true;
var dateMax, dateMin;
var clicked = false;
var variable = document.getElementById("var").value;
var name = document.getElementById("name").value;
var unit = document.getElementById("unit").value;
var colors = {
    'Temperature': window.chartColors.yellow,
    'Humidity': window.chartColors.blue,
    'Pressure': window.chartColors.red,
}

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
                document.getElementById("avg").innerHTML = json['avg'][0]['avg_' + variable] + ' ' + unit;
                document.getElementById("current").innerHTML = json['data'][json['data'].length-1][variable] + ' ' + unit;
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
                document.getElementById("avg").innerHTML = json['avg'][0]['avg_' + variable] + ' ' + unit;
                document.getElementById("current").innerHTML = json['data'][json['data'].length-1][variable] + ' ' + unit;
                //console.log(json['range'][0][0]['Timestamp']);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
    
    setTimeout(start, 1000);

    function start() {
        time = [];
        data_field = [];
        json['data'].forEach(element => {
            time.push(element['Time']);
            data_field.push(element[variable]);
        });

        let timeMinR = new Date(Date.parse(time[0]));
        let timeMaxR = new Date(Date.parse(time[time.length - 1]));

        timeMinR.setMinutes(timeMinR.getMinutes() + 60);
        let timeMin = new Date(timeMinR).toISOString();
        timeMaxR.setMinutes(timeMaxR.getMinutes() + 60);
        let timeMax = new Date(timeMaxR).toISOString();

        if (clicked){
            document.getElementById("timeMin").value = timeMin.substring(0, timeMin.length - 5);
            document.getElementById("timeMax").value = timeMax.substring(0, timeMax.length - 5);
            clicked = false;
        }
        if (init){
            let timeMinR = new Date(Date.parse(json['range'][0][0]['Time']));
            let timeMaxR = new Date(Date.parse(json['range'][1][0]['Time']));

            timeMinR.setMinutes(timeMinR.getMinutes() + 60);
            let timeMin = new Date(timeMinR).toISOString();
            timeMaxR.setMinutes(timeMaxR.getMinutes() + 60);
            let timeMax = new Date(timeMaxR).toISOString();

            console.log(timeMin.substring(0, timeMin.length - 5))
            console.log(timeMax.substring(0, timeMax.length - 5))
            
            document.getElementById("timeMin").min = timeMin.substring(0, timeMin.length - 5);
            document.getElementById("timeMin").max = timeMax.substring(0, timeMax.length - 5);
            document.getElementById("timeMax").min = timeMin.substring(0, timeMin.length - 5);
            document.getElementById("timeMax").max = timeMax.substring(0, timeMax.length - 5);
            init = false;
        }
        

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
                label: name,
                backgroundColor: colors[variable],
                borderColor: colors[variable],
                data: data_field,
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
                        labelString: name + ' in ' + unit
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
    if (count >= 15){
        setTimeout(update, 10000);
    }else{
        setTimeout(update, 1500);
        count ++;
    }
    
}

var config = {
    type: 'line',
    data: {
        labels: ['125214', '34go', 'uzgbui', 'iuzgbiu', 'iuzgbuzi', 'uizgbzui', 'iuzgbzi', 'iuzgb'],
        datasets: [{
            label: '',
            backgroundColor: colors[variable],
            borderColor: colors[variable],
            data: data_field,
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
                    labelString: name + ' in ' + unit
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
    clicked = true;
    Chart.defaults.global.animation.duration = 0;
    Chart.defaults.global.legend.display = false;
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);

    setTimeout(get_data, 100);
    setTimeout(update, 100);
};

function show () {
    clicked = true;
    var min = document.getElementById("timeMin").value;
    var max = document.getElementById("timeMax").value;
    dateMinR = new Date(min);
    dateMaxR = new Date(max);

    dateMinR.setMinutes(dateMinR.getMinutes() + 60);
    dateMinR = new Date(dateMinR);
    dateMaxR.setMinutes(dateMaxR.getMinutes() + 61);
    dateMaxR = new Date(dateMaxR);

    dateMin = dateMinR.toJSON();
    dateMax = dateMaxR.toJSON();

    range = true;
    get_data();
    update();
};