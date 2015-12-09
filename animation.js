/**
 * Animating a circle
 */
var msg = ["[1/35] Starting test",
           "[2/35] Checking resources available",
           "[3/35] Measure time switching apps",
           "[4/35] Measure time opening apps",
           "[5/35] Measure time opening camera",
           "[6/35] Taking photo",
           "[7/35] Saving photo",
           "[8/35] Done with camera, deleting photo",
           "[9/35] Suspending background service",
           "[10/35] Measuring time",
           "[11/35] Re-open from suspension",
           "[12/35] Done",
           "[13/35] Saving file to memory",
           "[14/35] Opening file",
           "[15/35] Done",
           "[16/35] Open browser",
           "[17/35] Collecting measurments",
           "[18/35] Closing browser",
           "[19/35] Done",
           "[20/35] Checking battery statistics",
           "[21/35] Calculating...",
           "[22/35] Done",
           "[23/35] Sending background http request",
           "[24/35] Waiting for response from server",
           "[25/35] Response recived",
           "[26/35] Calculating time",
           "[27/35] Done",
           "[28/35] Loading iOS Api",
           "[29/35] Testing core-functions...",
           "[30/35] Screen resolution",
           "[31/35] Page-speed",
           "[32/35] Opening lobster-cage",
           "[33/35] Collecting device statistics",
           "[34/35] Done",
           "[35/35] Test is done"];

var canvas;
var list;
var context;
var centerX;
var centerY;
var radius = 70;
var currPercent = 0;
var currMsg = 1;
var lastPercent = 0;

function setUp(){
    canvas = document.getElementById('circle-ani');
    list = document.getElementById('list');
    context = canvas.getContext('2d');
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    context.lineWidth = 5;
    context.strokeStyle = '#009933';
    context.font = '20pt Courier';
    context.textAlign = 'center';
}

function animate(percent){
    var percentText = (percent * 100).toFixed() + "%";
    context.clearRect(0,0,canvas.width, canvas.height);

    context.beginPath();
    context.arc(centerX, centerY, radius + 1, -(Math.PI / 2), ( ((Math.PI * 2) * percent) - (Math.PI / 2)) , false);
    context.stroke();

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, (Math.PI * 2), false);
    context.fillStyle = '#EFEFEF';
    context.fill();

    //y + 10 = y + font.height
    context.fillStyle = 'silver';
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
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, (Math.PI * 2), false);
        context.fillStyle = '#EFEFEF';
        context.fill();
        //draw percent
        if(alphaScore > 0.05){
            context.fillStyle = "rgba(192, 192, 192, " + alphaPercent + ")";
        context.fillText("100%", centerX, centerY + 10);
        }
        //draw score
        context.fillStyle = "rgba(0, 0, 0, " + alphaScore + ")";
        context.fillText("78p", centerX, centerY + 10);
        //change alphas
        var amount = 0.05;
        alphaPercent = alphaPercent - amount;
        alphaScore = alphaScore + amount;
        if(alphaPercent <= 0){
            clearInterval(interval);
            window.location.href = "afterTest.html";
        }
    }, 100);
}
