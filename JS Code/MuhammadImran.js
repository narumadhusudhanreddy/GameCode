const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongo-exercises')
.then(() => console.log('connected to mongo db...')) 
.catch(err => console.error("could not connect to mongodb...", err))

const prompt=require('prompt-sync')();
var  rand; attempts=0; //username;
 var username= prompt("enter user name:");

 do{
    
 rand = (Math.random()*10000).toFixed(0);
//console.log(rand);
 var s = new Set();
 s.add(rand[0]);
 s.add(rand[1]);
 s.add(rand[2]);
 s.add(rand[3]);
  if (s.size == 4)
     break; 
}while(true);
console.log(rand);

console.time("timeout ");

setTimeout(() => {
    console.timeEnd("timeout ");
},5000);
  
do{
    
    attempts++;
    var val= prompt("enter a 4 digit number:");
    if (rand==val){
        console.log("Bingo you have won the game !!");
        break;
    }     
//logic to count digits
var output="";
   for(var i=0;i<rand.length;i++)
   {
      for(var j=0;j<val.length;j++)
      {
        if(rand[i]==val[j])
        {
            if(i==j)
            output+=`${'+'}`; //"+";
            else 
           output+=`${'-'}`;// "-";
        }
      }
   }
   console.log(output);

}while(true);
console.log(` congrats ${username} you completed the game in ${attempts} attempts `);
//newFunction();

/*function newFunction() {
  console.time("finished game in");
  let total = 0;
  for (n = 1; n < 60000; n++) {
      total += n;
  }
  console.timeEnd("finished game in");
}*/
const gameSchema = new mongoose.Schema({
    user: String,
    attempts:Number,
    time:{
        min:Number,
        sec:Number,
    }
});
const Data= mongoose.model('Data',gameSchema);
async function createdata(){
    const gamedata=new Data(
        {
            "username":username,
            "attempts":attempts,
            setTimeout:{ }
        }
    );
    const result=await gamedata.save();
    console.log(result);
}
 createdata();
