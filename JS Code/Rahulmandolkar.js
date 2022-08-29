const prompt = require("prompt-sync")();
const mongoose =require("mongoose");

var username = prompt("Enter your name: ")
var rand, attempts = 0;

do{
    rand = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    // console.log(rand);
// create a set to remove duplicates.
var s = new Set();
s.add(rand[0])
s.add(rand[1])
s.add(rand[2])
s.add(rand[3])


if(s.size == 4){
    break;
}
}while(true)

//Start game
console.log(`computer's random value is ${rand}`);
var start = new Date().getTime();

do{
    attempts++;
    var val = prompt("Enter the 4 digit number: ")
    if(rand == val)
    {
        console.log("You won");
         break;
    }
    var output=""
    for(var i=0; i<rand.length; i++)
    {
        for(var j=0; j<val.length; j++)
        {
            if(val[i]==rand[j])
            {
                if(i==j)
                {
                    output+="+"
                }
                else
                {
                    output+="-"
                }

            }
        }
    }
    console.log(output);
}while(true);



var end = new Date().getTime();
var time = end - start;

console.log(`You complete the game in ${attempts} attempts`)
console.log(`Time taken by ${username}  is  ${time}  ms`)
// console.log(`You completed the game in ${attempts} attempts 
//             at time : ${time}ms`);



mongoose.connect("mongodb://127.0.0.1:27017/myData")
    .then(()=>console.log("connected to mongo db"))
    .catch(err => console.error("conection failed!!!...",err))



const dataSchema = new mongoose.Schema({
    username: String,
    attempts: Number,
    time: Number
}); 



const Data = mongoose.model("Data", dataSchema)



async function jsonData(){
    const post = new Data(
        {
            "username": username,
            "attempts": attempts,
            "time" : time
        }
    );
    const result = await post.save();
    console.log(result);
}
jsonData();
//console.log("Data Updated in DB");
