var a_pts = 0;
var b_pts = 0;
var whosup_block;
var whosup;
var notup;
var up_cont;
var not_cont;
var seconds = 60;
var clock_func;
 
function team_a_turn(){
    whosup_block = "team_a_block";
    whosup = "a";
    up_cont = "team_a_pts";
    not_cont = "team_b_pts";
    notup = "b";
    begin_turn();
}

function team_b_turn(){
    whosup_block = "team_b_block";
    whosup = "b";
    notup = "a";
    up_cont = "team_b_pts";
    not_cont = "team_a_pts";
    begin_turn();
}

function begin_turn(){
    document.getElementById("turn_pick").classList.toggle('hide');
    document.getElementById(whosup_block).classList.toggle('my_turn');
    clock_func = setInterval(count_down,1000);
}

function count_down(){
    seconds = seconds - 1;
    document.getElementById("clock_time").innerHTML = seconds;
    if(seconds == 0){
        end_turn_wait();
    }
}


function end_turn_wait(){
    clearInterval(clock_func);
    document.getElementById("turn_over").classList.toggle('hide');
    document.getElementById(whosup_block).classList.toggle('my_turn');
    seconds = 60;
    var endturn = setTimeout(end_turn, 3000);
}

function end_turn(){
    document.getElementById("turn_over").classList.toggle('hide');
    document.getElementById("turn_pick").classList.toggle('hide');
    document.getElementById("clock_time").innerHTML = seconds;
}


function add_pts(){
    if(whosup == "a"){
        a_pts = a_pts + 1;
        var update = a_pts;
    } else{
        b_pts = b_pts + 1;
        var update = b_pts;
    }
    document.getElementById(up_cont).innerHTML = update;
}

function sub_pts(){
    if(whosup == "a"){
        a_pts = a_pts - 1;
        var update = a_pts;
    } else{
        b_pts = b_pts - 1;
        var update = b_pts;
    }
    document.getElementById(up_cont).innerHTML = update;
}

function taboo_or_pass(){
    if(whosup == "a"){
        b_pts = b_pts + 1;
        var update = b_pts;
    } else{
        a_pts = a_pts + 1;
        var update = a_pts;
    }
    document.getElementById(not_cont).innerHTML = update;
}

function new_game(){
    a_pts = 0;
    b_pts = 0;
    seconds = 60;
    document.getElementById("team_a_one").innerHTML = "Team A";
    document.getElementById("team_a_two").innerHTML = "Team A";
    document.getElementById("team_b_one").innerHTML = "Team B";
    document.getElementById("team_b_two").innerHTML = "Team B";
    document.getElementById("form_cont").classList.toggle('hide');
    document.getElementById("clock_time").innerHTML = seconds;
}

function stop_clock(){
    clearInterval(clock_func);
    document.getElementById(whosup_block).classList.toggle('my_turn');
    document.getElementById("turn_pick").classList.toggle('hide');
    seconds = 60;
    document.getElementById("clock_time").innerHTML = seconds;
}

$(function(){
    $('#team_names').on('submit', function(e){
        e.preventDefault();
        var ta_name = document.getElementById("TA").value;
        var tb_name = document.getElementById("TB").value;
        document.getElementById("team_a_one").innerHTML = ta_name;
        document.getElementById("team_a_two").innerHTML = ta_name;
        document.getElementById("team_b_one").innerHTML = tb_name;
        document.getElementById("team_b_two").innerHTML = tb_name;
        $('#team_names').children('input').val('');
        document.getElementById("form_cont").classList.toggle('hide');
        document.getElementById("turn_pick").classList.toggle('hide');
    });                 
});