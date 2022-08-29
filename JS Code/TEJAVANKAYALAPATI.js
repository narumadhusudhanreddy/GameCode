const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mongo-exercises')
.then(() => console.log('connected to mongo db...'))
.catch(err => console.error("could not connect to mongodb...", err))

const prompt = require("prompt-sync")();

const t0 = performance.now();
var rand,attempts = 0;
do{
rand = (Math.random()*10000).toFixed(0);
var s = new Set();
s.add(rand[0]);
s.add(rand[1]);
s.add(rand[2]);
s.add(rand[3]);
if(s.size == 4)
    break;

}while(true);
console.log(rand);
var userName="TEJA VANKAYALAPATI";
do{
    attempts++;
    var val  = prompt("Enter a 4 digit number:");
    if(rand == val)
    {    
        console.log("You Won!!");
        break;
    }
    var output="";
    
    for(var i=0;i<rand.length;i++)
    {
        for(var j=0;j<val.length;j++)
        {   
            if(rand[i]==val[j])
            {   
                if(i==j)
                    output+="+";
                else
                    output+="-";
            }
        }
    }
    console.log(output);

}while(true);

const t1 = performance.now();
console.log(`You completed the game in ${attempts} attempts`);

//creating json object on our data
jsonObj = {
    "userName": userName,
    "attempts": attempts
}
console.log(jsonObj);
console.log(`TOTAL TIME TAKEN TO EXECUTE ${t1 - t0} milliseconds.`);
