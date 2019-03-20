const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const todosRoute = require('./routes/todos.router');
const path = require('path');

//MongoDB connection
//var mUrl = 'mongodb+srv://adminv:<pass>@todomern-cluster-1xmp7.mongodb.net/test?retryWrites=true';
var mUrl = 'mongodb://localhost/todomern';
mongoose.connect(mUrl, {useNewUrlParser:true}, db =>{
console.log("DB connected!!");
});

app.use(cors());
app.use(bodyParser());

//End-point Middleware
app.use('/',todosRoute);

//error:404 Handler
app.use((req,res,next) =>{
    res.status(404).send("You seem to be lost... Return to home");
});

//error:500 Handler
app.use((err,req,res,next) =>{
    res.status(500).sendFile(__dirname + '/public/error500.html');
    console.log(err.message);
});

//heroku middleware
/*if(process.env.NODE_ENV === 'production'){
app.use(express.static('client/build'));
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
}*/
var PORT = process.env.PORT || 4000;
app.listen(PORT, () =>{
    console.log(`Listening on the port: ${PORT}`);
});