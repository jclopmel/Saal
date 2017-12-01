var user, historial,tirada = [];

bdGet();

function randomNumber(max){
	return Math.floor(Math.random(1,max)*(max-1)+1);				//Random between 1 and max
}

var dado,cantidad;

$("select").change(function (){
	dado = $("#dado").val();
});

$("#tirar").click(function (){				//Al clicker envia dados y crea array
	$("#result").empty();
	cantidad = $("#cantidad").val();
	$("#result").append("<h2>"+user+" ha tirado los dados: </h2><br>");
	for (var i =0; i<cantidad ; i++) {
		tirada.push(randomNumber(dado))
		$("#result").append("<div class='dado col-md-1 text-center'><p>"+tirada[i]+"</p></div>");
	}
	bdPost (user,tirada);
});

$("#login > button").click(function (){				//crea user al clicker y expone el nombre
	user = $("#mySearch").val();
	$("#nombres").append("<button class='btn btn-default mg1'>"+user+"</button>");
	$("#login").addClass("hide");
	$("#diceTable").removeClass("hide");
});

function bdGet (){
	$.getJSON( "js/database.json", function( data ) {									//Get JSON data
		historial = data;
		console.log(historial)
	});
	
}

function bdPost (data1,data2){																	//Add a new Object to JSON
	var temp = {
		"user": data1,
		"tirada": data2
	};
	console.log("tempoal: "+JSON.stringify(temp));
	historial.tiradas.push(temp);
		$.ajax({
	    	url: "/js/database.json",
			method: "post",
			dataType: "json",
			data:temp,
		    success: function(data){
				console.log("success!", data);
			}
	});
	//showResults();
	bdGet();
}



/*var choice, resultsearch, position, vehicles;

bdGet();

$("#mySearch").click(function(){
	showResults();
})

function showResults(){														//Display the suggestion and dissapear after 3 seconds
	$("#resultsBox").empty();
	for(var i=0;i<vehicles.length;i++){
		$(".suggest").append("<li class='list-group-item list-group-item-action'>"+vehicles[i].name+" is "+vehicles[i].type+"</li>");
	}
	setTimeout(function(){
		$("li").remove();
	}, 3000); 
}

function selectedData(){													//Show the name of searched data
	$("#resultsBox").empty();
	var data = $("#mySearch").val();
	for(var i=0;i<vehicles.length;i++){
		if(data == vehicles[i].name || data == vehicles[i].type){
			$("#resultsBox").append("<a class='list-group-item list-group-item-action' onclick='infoShow(this.innerText)'>"+vehicles[i].name+"</a>");
		}
	}
}
function infoShow(data){													//Show  informacion about the object
	choice = data;
	choose();
	objectTarget();
}

function choose(){																//Show the selected option and save array position
	for(var i=0;i<vehicles.length;i++){
		if(choice==vehicles[i].name){
			position 	= i;
		}
	}
}

function objectTarget(){														//Display the results in objectBox
	$("#objectBox").empty();
	$("#objectBox").append("<a class='list-group-item list-group-item-action'>Name of the vehicle: "+vehicles[position].name+"</a>");
	$("#objectBox").append("<a class='list-group-item list-group-item-action'>Characteristics of the vehicle: "+vehicles[position].description+"</a>");
	$("#objectBox").append("<a class='list-group-item list-group-item-action'>Type: "+vehicles[position].type+"</a>");
}

function openForm(data){														//Display the add or modify Forms
	$("#addModifyForm").empty();
	$("#addModifyForm").append('<input id="nameholder" class="form-control" type="text" placeholder="Name">');
	$("#addModifyForm").append('<input id="descriptionholder" class="form-control" type="text" placeholder="Description">');
	$("#addModifyForm").append('<input id="typeholder" class="form-control" type="text" placeholder="Type">');

	if (data.innerText == "Modify this vehicle"){
		$("#addModifyForm").append('<button class="btn btn-primary" onclick="bdPut()">Modify</button>');
	}else{
		$("#addModifyForm").append('<button id="addButton" class="btn btn-primary" onclick="bdPost()">Add</button>');
	}
}

/*                                       ajax functions                                

function bdPost (){																	//Add a new Object to JSON
		$.ajax({
	    	url: "/",
			method: "put",
			dataType: "json",
			data: {name: $("#nameholder").val(), description: $("#descriptionholder").val(), type: $("#typeholder").val()},
		    success: function(data){
				console.log("success!", data);
			}
	});
	showResults();
	bdGet();
}


function bdPatch (){																	//Patch the displayed object
	$("#objectBox").empty();
	$.ajax({
		url: "/",
	    method: "PATCH",
	    dataType: "json",
	    data: {position: position},
	    success: function(data){
	                console.log("success!", data);
	            }
	});
	bdGet();
}

function bdPut (){																		//Modify an object in JSON

	if($("#objectBox").children().length != 0){

		bdPost ()
		bdPatch();

		}else{
			alert("An object must be selected");
		}

}*/