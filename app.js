const express= require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const request=require("request");
const rp=require("request-promise");
const port=9090;
const app=express();

app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect(
    "mongodb://localhost:27017/QuizDB",
    { useUnifiedTopology: true, useNewUrlParser: true },
    function (err) {
        if (!err) console.log("Connnect to database");
        else console.log(err);
    }
);

let marks=0;
let isStarted=false;
let correct=0;
var questions;
let i=0;
app.get("/",async function(req,res){
 
    if(!isStarted){
        questions=await getQuestion();
        console.log(typeof(questions));
        isStarted=true;
    }
    
      //  console.log(element);

    if(i== questions.length){
        res.render("marks",{marks : marks});
        isStarted=false;i=0;marks=0;
    }

    let element = questions[i];
        let options=element.options;
        correct=element.correctAns;
        res.render("index",{question : element.question, option1 :options[0],option2 :options[1],option3 :options[2],option4 :options[3]});
    
});
app.post("/",function(req,res){
    //console.log(req.body);
    if(req.body.q_answer == correct){
        marks++;
    }
    i++;
    res.redirect("/");
});

async function getQuestion(){
    let questions;
    
        var options = {
            uri: 'http://localhost:9000/questions',
            json: true // Automatically parses the JSON string in the response
        };
         
        await rp(options)
            .then(function (repos) {
               // console.log(repos);
                questions = repos;
               
            })
            .catch(function (err) {
                console.log(err);
            });
    console.log("data received");
    return questions;
}

app.listen(port,function(){
    console.log("Server started on port "+port);
});