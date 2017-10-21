var express 	= require("express"),
	app			= express(),
	port 		= process.env.PORT || 3000;


/*                                      App files load                           */

app.use("/style", express.static(__dirname + '/style'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/files", express.static(__dirname + '/files'));

app.get("/", function(req, res){
	res.sendFile(__dirname + ("/index.html"))
})

app.listen(port, function(){
	console.log("Running server at localhost: "+port);
})