mongoose = require("mongoose");
const prompt = require("prompt-sync")();
const user = prompt(" please Enter your name:");
var rand, attempts = 0;
var start = new Date().getTime();
do {
    rand = (Math.random() * 10000).toFixed(0);
    var s = new Set();
    s.add(rand[0]);
    s.add(rand[1]);
    s.add(rand[2]);
    s.add(rand[3]);
    if (s.size == 4)

        break;
} while (true);
console.log(rand);
do {
    attempts++;
    var val = prompt("please enter 4 digit number:");
    if (rand == val) {
        console.log(" Boya!! ");
        break;
    }
    var output = "";

    for (var i = 0; i < rand.length; i++) {
        for (var j = 0; j < val.length; j++) {
            if (rand[i] == val[j]) {
                if (i == j)
                    output += "+";
                else
                    output += "-";
            }
        }
    }
    console.log(output);

} while (true);

console.log("You completed the game in " + attempts + "attempts");
var end = new Date().getTime();
var time = end - start;
var ms = time,
    min = Math.floor((time / 1000 / 60) << 0),
    sec = Math.floor((time / 1000) % 60);
console.log(`Time-${min}:${sec}`);
mongoose.connect('mongodb://127.0.0.1:27017/game')
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log('could not connected to mongodb', err))
const gameSchema = new mongoose.Schema({
    user: String,
    attempts: Number,
    time: {
        min: Number,
        sec: Number,
    }
});
const Data = mongoose.model('Data', gameSchema);
async function createdata() {
    const gamedata = new Data({
        "user name": user,
        "NO of Attempts": attempts,
        time: {
            "minutes": min,
            "seconds": sec
        }
    });
    const result = await gamedata.save();
    console.log(result);
}
createdata();
