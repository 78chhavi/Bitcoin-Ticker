const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
  var first=req.body.first;
  var second=req.body.second;
  // request("https://apiv2.bitcoinaverage.com/indices/global/ticker/"+first+second,function(error,response,body){
  //   var jsobject=JSON.parse(body);
  //   res.send("The price of Bitcoin is: "+ jsobject.last+ second);
  // })
  var amount=req.body.amount;
  var object={
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:{
      from:first,
      to:second,
      amount:amount
    }
  };
  request(object,function(error,response,body){
    res.write("<p>The current date is: "+body.time+"</p>");
    res.write("<h1>The "+amount+first+" costs "+body.price+second+"</h1>");
    res.send();
  });


});

app.listen(3000,function(){
  console.log("Server is connected at port 3000.");
});
