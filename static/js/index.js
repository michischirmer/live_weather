var json;
$.ajax({
	url: '/getData',
	type: 'GET',
	success: function(response){
		json = $.parseJSON(response);
	} ,
	error: function(error){
		console.log(error);
	}
});
setTimeout(start, 100);
function start(){
	var time = [], temperature = []
	json.forEach(element => {
		time.push(element['Time']);
		temperature.push(element['Temperature']);
	});

	console.log(time);
	console.log(temperature);
}
