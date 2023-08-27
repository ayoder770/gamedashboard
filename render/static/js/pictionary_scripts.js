// JavaScript For Pictionary Web App

// HTML content for all play elements
var allPlayYes = "<i class='fa fa-check-square-o' aria-hidden='true'></i>"
var allPlayNo = "<i class='fa fa-square-o' aria-hidden='true'></i>"

// HTML content for Red/Blue Pencil Images
var redPencilSrc = "../static/images/redPencil.png";
var bluePencilSrc = "../static/images/bluePencil.png";

// Which card side is being played: will be red or blue
var cardSide = "";

// Function for Selecting which card side to play
$('.selectCardBtn').on('click', function(e){
	
	// Retrieve the ID of the side chosen
	var chooseSide = this.id;
	
	// Set the Card HTML content
	if( chooseSide == "chooseRed" ){
		cardSide = "red";
		document.getElementById("pencilImage").src = bluePencilSrc;
		document.getElementById("pictCard").classList.add("redPictCard");
	} else {
		cardSide = "blue";
		document.getElementById("pencilImage").src = redPencilSrc;
		document.getElementById("pictCard").classList.add("bluePictCard");
	}

	// Take down the intro panel
	document.getElementById("gameSetupContainer").classList.toggle('hide');	

});

// AJAX to Send/Receive Data from Server
$('.categoryTitleBox').on('click', function(e){

	// Get the category (color) of the element clicked
	var category = this.id;

	// Convert JS data to JSON to pass to the server
	var JSdata = {cardColor:cardSide, categoryColor:category};
        var JSjsonData = JSON.stringify(JSdata);

	// Issue AJAX request
        $.ajax({
            type: 'POST',
            url: '/drawPictCard/',
            data: JSjsonData,
            success: function(result) {
		// Print the returned JSON to the console
                console.log("JSON result: "+result);
		// Convert the JSON to a JavaScript Object
		var resultObj = JSON.parse(result);
		// Get the word and allPLay values from the JSON
		thisTurnWord = resultObj['word'];
		thisAllPlay = resultObj['allPlay'];
		// Print the word to the page
                document.getElementById("turnWord").innerHTML = "\""+thisTurnWord+"\"";
	
		// Update the all Play status
		if(thisAllPlay){
			document.getElementById("allPlayYes").innerHTML = " "+allPlayYes;
	                document.getElementById("allPlayNo").innerHTML = " "+allPlayNo;

		} else {
			document.getElementById("allPlayYes").innerHTML = " "+allPlayNo;
	                document.getElementById("allPlayNo").innerHTML = " "+allPlayYes;

		}
		     
		// Unhide the Turn Overlay
		document.getElementById("turnOverlay").classList.toggle('hide');
            }
        });
});

var secondsMaster = 5;
var seconds = secondsMaster;
var soundElement = document.getElementById("gameTimer");
function begin_turn(){
    document.getElementById("clockTime").innerHTML = seconds;
    setTimeout(playBuzzer, 5000);
    clock_func = setInterval(count_down,1000);
}

function count_down(){
    seconds = seconds - 1;
    document.getElementById("clockTime").innerHTML = seconds;
    if(seconds == 0){
        end_turn_wait();
    } 
}

function end_turn_wait(){
	clearInterval(clock_func);
	//document.getElementById("playTurnBuzzer").click();
	clearInterval(clock_func);
	setTimeout(end_turn, 4000);
}

// Play the End of Turn Buzzer when the timer has run out
function playBuzzer(){
	soundElement.play();
}


// Cleanup and reset for the next player's turn
function end_turn(){
	seconds = secondsMaster;
	document.getElementById("clockTime").innerHTML = "";
	document.getElementById("turnOverlay").classList.toggle('hide');
	document.getElementById("turnWord").innerHTML = "";
}
