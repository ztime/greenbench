var msg = ["[1/35] Starting test",
           "[2/35] Checking resources available",
           "[3/35] Measure time switching apps",
           "[4/35] Measure time opening apps",
           "[5/35] Measure time opening camera",
           "[6/35] Taking photo",
           "[7/35] Saving photo",
           "[8/35] Done with camera, deleting photo",
           "[9/35] Another feature",
           "[10/35] ",
           "[11/35] ",
           "[12/35] ",
           "[13/35] ",
           "[14/35] ",
           "[15/35] ",
           "[16/35] ",
           "[17/35] ",
           "[18/35] ",
           "[19/35] ",
           "[20/35] ",
           "[21/35] ",
           "[22/35] ",
           "[23/35] ",
           "[24/35] ",
           "[25/35] ",
           "[26/35] ",
           "[27/35] ",
           "[28/35] ",
           "[29/35] ",
           "[30/35] ",
           "[31/35] ",
           "[32/35] ",
           "[33/35] ",
           "[34/35] ",
           "[35/35] Done"];

var canvas = document.getElementById('circle');
var list = document.getElementById('list');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;
var currPercent = 0;
var currMsg = 1;
var lastPercent = 0;

context.lineWidth = 5;
context.strokeStyle = '#009933';
context.font = '20pt Monaco';
context.fillStyle = 'grey';
context.textAlign = 'center';

function animate(percent){
    var percentText = (percent * 100).toFixed() + "%";
    context.clearRect(0,0,canvas.width, canvas.height);
    context.beginPath();
    context.arc(centerX, centerY, radius, -(Math.PI / 2), ( ((Math.PI * 2) * percent) - (Math.PI / 2)) , false);
    context.stroke();
    //y + 10 = y + font.height
    context.fillText(percentText, centerX , centerY + 10);
    currPercent++;
    if(currPercent < 1001) {
        requestAnimationFrame(function () {
            animate(currPercent / 1000);
        });
    }else{
        fadeOutPercentAndInScore();
    }
    //update list
    addItemsToList(percent);
}

function addItemsToList(percent){
    if(percent == 0.001){
        insertTopList(msg[0]);
    }else if(percent == 1){
        insertTopList(msg[34]);
    }else{
        var realPercent = (percent * 100).toFixed();
        if(realPercent % 3 == 0 && realPercent != lastPercent){
            insertTopList(msg[currMsg]);
            currMsg++;
            lastPercent = realPercent;
        }
    }
}

function insertTopList(textToInsert){
    var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(textToInsert));
    list.insertBefore(listItem, list.firstChild);
}

function fadeOutPercentAndInScore(){
    var alphaPercent = 1.0; //percent alpha
    var alphaScore = 0.0; //Score alpha
    interval = setInterval(function () {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.beginPath();
        context.arc(centerX,centerY, radius, -(Math.PI / 2), 1.5 * Math.PI, false);
        context.stroke();
        //draw percent
        if(alphaScore > 0.05){
            context.fillStyle = "rgba(255, 0, 0, " + alphaPercent + ")";
        context.fillText("100%", centerX, centerY + 10);
        }
        //draw score
        context.fillStyle = "rgba(255, 0, 0, " + alphaScore + ")";
        context.fillText("78p", centerX, centerY + 10);
        //change alphas
        var amount = 0.05;
        alphaPercent = alphaPercent - amount;
        alphaScore = alphaScore + amount;
        if(alphaPercent <= 0){
            clearInterval(interval);
        }
    }, 100);
}

animate();
