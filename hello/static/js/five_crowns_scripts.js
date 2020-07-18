var current = 3;
var numberOfPlayers;

// Function to read number of players and build the form dynamically
$(function(){
    $('#player_number_form').on('submit', function(e){
    e.preventDefault();
    
    // Go to top of page
    $('html,body').scrollTop(0);
        
    // Set the number of players based on user input
    // Ensure a value was entered
    numberOfPlayers = document.getElementById("number_of_players").value;
    if ( numberOfPlayers === '' ){
        return;
    }
        
    // Turn off the form as it is no longer needed
    document.getElementById("player_number_form").classList.toggle('display_block');
    document.getElementById("player_number_form").classList.toggle('display_none');
        
    //Build the player name header
    var scoreHTML = "<div class='full_row'><div class='round'></div>";
    for(var i=1; i<= numberOfPlayers; i++){
        scoreHTML+="<div class='player player_width' id='P"+i+"'>Plyr. "+i+"</div>";
    }
    scoreHTML+="</div>";
        
    // Build the entire scorecard
    // Outer loop for number of rounds in a five crowns game
    for(var j=3; j<=13; j++){
        if( j == 11 ){
            roundValue = "J";
        } else if( j == 12 ){
            roundValue = "Q";
        } else if( j == 13 ){
            roundValue = "K";
        } else {
            roundValue = j;
        }
        scoreHTML+="<div id='row_round_"+j+"' class='full_row'><div id='round_"+j+"' class='fc_round'>"+roundValue+"</div>";
        // Inner Loop based on how many players are playing
        for(var k=1; k<=numberOfPlayers; k++){
            scoreHTML+="<div class='score_cont player_width'><div class='this_score' id='p"+k+"_"+j+"_n'></div><div class='this_update' id='p"+k+"_"+j+"_u'></div></div>"
        }
        scoreHTML+="</div>";  
    }
        
    // Populate HTML for the name form
    var nameFormHTML='';
    for(var l=1; l<=numberOfPlayers; l++){
        nameFormHTML+="<input id='PN_"+l+"' type='text' placeholder='Player "+l+"'/><br>";
    }
        
    // Populate HTML for the score form
    var scoreFormHTML='';
    for(var m=1; m<=numberOfPlayers; m++){
        scoreFormHTML+="<input type='text' pattern='[0-9]*' id='P_"+m+"' placeholder=''/><br>";
    }
    scoreFormHTML+="<input type='hidden' id='hid_round'/><br>";
        
    // Set the HTML for the name form
    document.getElementById("name_form_input").innerHTML=nameFormHTML;
        
    // Set the HTML for the score form
    document.getElementById("score_form_input").innerHTML=scoreFormHTML;
        
    // Set the form HTML on the page 
    document.getElementById("scorecard_master_container").innerHTML=scoreHTML;
       
    // Enable the name form to gather player's names
    document.getElementById("name_form_cont").classList.toggle('display_block');
    document.getElementById("name_form_cont").classList.toggle('display_none');
        
    // Set column width based on number of players
    var scoreColumnWidth = Math.round(90 / numberOfPlayers);
    $("<style/>", {text: ".player_width {width:"+scoreColumnWidth+"%;}"}).appendTo('head');    
    });  
}); 
 

// Function to add player's names to scorecard
$(function(){
    $('#name_form').on('submit', function(e){
        e.preventDefault();
        
        // Go to top of page
        $('html,body').scrollTop(0);
        
        // Turn off the form as it is no longer needed
        document.getElementById("name_form_cont").classList.toggle('display_block');
        document.getElementById("name_form_cont").classList.toggle('display_none');
        
        // Loop through names one by one
        for(var i=1; i<=numberOfPlayers; i++){
            
            // ID of form input element containing player name 
            var inputNameID = "PN_"+i;
            var playerName = document.getElementById(inputNameID).value;
            // ID of element to replace score form placeholder with name
            var scoreFormNameID = 'P_'+i;
            // ID of element containing the player's name at top of card
            var nameColumnHeaderID = 'P'+i;
            
            // Update the DOM with player's name
            if( playerName != ""){
                document.getElementById(scoreFormNameID).placeholder = playerName;
                document.getElementById(nameColumnHeaderID).innerHTML = playerName;
            } else{
               document.getElementById(scoreFormNameID).placeholder = "N/A";
               document.getElementById(nameColumnHeaderID).innerHTML = "N/A"; 
            }  
        }
        
        // Set the background for row three column
        document.getElementById("row_round_3").style.backgroundColor="#C494D2";
        
    });                 
}); 


// Function to update player's score
function column_update(round_number, player, score){
    console.log("Round "+round_number+" | Player "+player+" | Score "+score);
    
    // ID of cell for player's score this round
    var s_new_cell = 'p'+player+'_'+round_number+'_n';
                    
    // ID of cell for player's cumulative score after this round
    var s_upd_cell = 'p'+player+'_'+round_number+'_u';
    
    // If not the first (third) round, need to know the current cumulative score for player
    if(round_number != 3){
        // ID of cell holdin player's current cumulative score from last round
        var s_old_total;
        s_old_total = 'p'+player+'_'+(round_number - 1)+'_u';
    }
    
    // If this is not a correction, update the score for current round
    if(round_number == current){
        
        // Enter the player's score for this round
        document.getElementById(s_new_cell).innerHTML = Number(score);
        
        if(round_number == 3 ){
            // Cumulative score is the same as round score since round one
            document.getElementById(s_upd_cell).innerHTML = Number(score);
        } else{
            // Add this round score to cumulative score         
            document.getElementById(s_upd_cell).innerHTML = Number(score) + Number(document.getElementById(s_old_total).innerHTML);
        }   
    // If not a score correction, this player is all set. Move onto next player
        
    // Else this is a correction
    } else{
        // Enter the corrected round score 
        document.getElementById(s_new_cell).innerHTML = Number(score);
        
        // Start with round 3, set round equal to cumulative
        var roundThreeScoreID = 'p'+player+'_3_n';
        var roundThreeCumulID = 'p'+player+'_3_u';
        document.getElementById(roundThreeCumulID).innerHTML = Number(document.getElementById(roundThreeScoreID).innerHTML);
        
        // Loop through player's scorecard to update cumulative score
        for( var i=3; i<(current-1); i++){
            
            // Cell ID for last cumulative score
            var lastCumulScore = 'p'+player+'_'+i+'_u';
            // Cell ID for round score of next round
            var nextRoundScore = 'p'+player+'_'+(i+1)+'_n';
            // Cell ID for cumulative score after next round
            var nextRoundCumul = 'p'+player+'_'+(i+1)+'_u';
            
            // Update Score
            document.getElementById(nextRoundCumul).innerHTML = Number(document.getElementById(lastCumulScore).innerHTML) + Number(document.getElementById(nextRoundScore).innerHTML);
        
        } 
    }
}


// Submit the score form
$(function(){
    $('#score_form').on('submit', function(e){
        e.preventDefault();
        
    // Hide the form
    document.getElementById("score_form_cont").classList.toggle('display_block');
    document.getElementById("score_form_cont").classList.toggle('display_none');
     
    // Get the round number of form being submitted
    var this_round = document.getElementById("hid_round").value;
    console.log("Score update for round: "+this_round);
        
    // Loop over all players for score updates
    for(var i=1; i<=numberOfPlayers; i++){
            
        // ID Variable to read scores out of submitted form
        var formPlayerID = 'P_'+i;
                
        // Populate the score for the player
        var playerScore = document.getElementById(formPlayerID).value;
             
        // If score is not empty, update player's score and clear it from the form ID
        if( playerScore != ""){
            column_update(this_round, i, playerScore);
            document.getElementById(formPlayerID).value='';
        }                  
    }
    
    // Update for next round   
    if((this_round < 13) && (this_round == current)){
        var this_row;
        var next_row;
        this_row = "row_round_"+this_round;
        next_row = "row_round_"+(Number(this_round) + 1);
        document.getElementById(this_row).style.backgroundColor = "#FFFFFF";
        document.getElementById(next_row).style.backgroundColor = "#C494D2";
        current++;
    }
        
    // Go to top of page
    $('html,body').scrollTop(0);
        
    });    
}); 


// Display the Score form 
$('#scorecard_master_container').on("click", ".fc_round", function(){
    document.getElementById("score_form_cont").classList.toggle('display_block');
        document.getElementById("score_form_cont").classList.toggle('display_none');
    var this_id = $(this).attr('id');
    var splt = this_id.split("_");
    var new_id = Number(splt[1]);
    document.getElementById("hid_round").value = new_id; 
});
