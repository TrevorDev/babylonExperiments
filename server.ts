import express = require('express')
import browserify = require("browserify")
import http = require('http');

var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/*', function (req, res) {
	
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		let reqFile:string = req.params[0]

		if(reqFile.indexOf(".js")==-1){
			console.log(__dirname+reqFile)
			res.sendFile(__dirname+"/"+reqFile);
		}else{
			let b = browserify(["./"+reqFile], {noParse: []})
			var stream = b.bundle((err,buf)=>{
				if(err){
					res.send("file not found" + err)
				}
			})
			stream.on("data", function(buffer){
				res.write(buffer)
			})
			stream.on("end", function(){
				res.end()
				console.log("file served")
			})
		}
})

var server = http.createServer(app)
server.listen(3008)