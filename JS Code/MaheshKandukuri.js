const prompt = require("prompt-sync")();
 const mongoose=require("mongoose");
var attempts = 0 ;
do {
    var rand = (Math.random() * 10000).toFixed(0);
    var s = new Set();
    s.add(rand[0]);
    s.add(rand[1]);
    s.add(rand[2]);
    s.add(rand[3]);
    if (s.size == 4)
        break;
} while (true);
var username=prompt("enter your name : ");
console.log(rand);
var st=performance.now();
do {
    attempts++;
    var val = prompt("enter  4 digit number");
    if (rand == val)
    {
        console.log("win!!!");
        break;
    }
    var output="";
    for (var i = 0; i < rand.length; i++)
     {
        for(var j=0;j < val.length;j++)
        {
            if(rand[i]==val[j])
            {
            if(i==j)
                output+="+";
            else
                output+="-";
             }
        }  
    } console.log(output);
} while (true);
var end=performance.now();
var time=end-st;


var min=(time/1000/60).toFixed();
var sec=(time/1000%60).toFixed();
console.log(username);
console.log(`execution time is ${min}:${sec} `);
console.log(`your total attempts is ${attempts}`);

mongoose.connect('mongodb://127.0.0.1:27017/usersdb')
.then(()=> console.log('connected to mongodb..'))
.catch(err=>console.log('could not connected to mongodb..',err))

const dataschema=new mongoose.Schema({
      username:String,
      attempts:Number,
      time:{min:Number,
            sec:Number},
});

const Data = mongoose.model('Data',dataschema);
async function createData(){
    const data=new Data(
{
    "username":username,
    "attempts": attempts,
    "time"    :{"min" :min,
                "sec" : sec,}
}
    );
    const result=await data.save();
    console.log(result);
}
createData();
