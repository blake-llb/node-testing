
var express = require("express");
var http = require("http");
var app = express();

var cookieParser = require("cookie-parser");
var ejs = require("ejs");
var session = require("express-session");
app.set("port",8099);

app.configure(function(){
    app.set("views",__dirname+"/client/views");
    app.engine("html",ejs.__express);
    app.set("view engine","html");
    app.use(cookieParser());
    app.use(session({
        secret: "123456",
        name: "node-testing",
        cookie: {maxAge: 10000},
        resave: true,
        saveUninitialized: true
    }));
    app.use(express.logger("dev"));  //开发者日志
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname+"/client/"));
    app.use(express.favicon());
    app.use(express.errorHandler());  //处理异常错误
});

http.createServer(app).listen(app.get("port"));
console.log("http://localhost:" + app.get("port") + "/index.html");
