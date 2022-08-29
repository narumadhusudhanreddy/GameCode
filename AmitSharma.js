// import package
const prompt = require("prompt-sync")();
const mongoose =require("mongoose");

// Enter the user name 
var username = prompt("Enter your name: ")

var rand, attempts = 0;

do{
// Generate random number.
var rand = (Math.random()*10000).toFixed(0);


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
console.log(rand)
// time start 
var t0 = performance.now();

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

// time end 

var t1 = performance.now();
const time = ((t1-t0)/60000)

console.log(`You complete the game in ${attempts} attempts`)
console.log("Time taken by "+ username+ " is "+time+" min.")


// Save the data in database

// 1. connecting to mongoose database 
mongoose.connect("mongodb://127.0.0.1:27017/amit")
    .then(()=>console.log("connected to mongo db"))
    .catch(err => console.error("could not connect to mongodb...",err))


// 2. Define schema 
const dataSchema = new mongoose.Schema({
    username: String,
    attempts: Number,
    time: Number
}); 


// 3. create a model or class 
const Data = mongoose.model("Data", dataSchema)


// 4. create a data in json Object
async function createData(){
    const record = new Data(
        {
            "username": username,
            "attempts": attempts,
            "time" : time
        }
    );
    const result = await record.save();
    console.log(result);
}
createData();

