
    

var check_yes = "<i class='fa fa-check-circle-o' aria-hidden='true'></i>";
var check_no = "<i class='fa fa-times-circle-o' aria-hidden='true'></i>";

// Function for when a player has a Clue item. Means two things:
// The other players do not have this item
// This item is not one of the three items to guess
$('.have').click(function(){

  if( (! $(this).hasClass('check_yes')) && (! $(this).hasClass('na') ) ){

      // Change status of item for this player to yes
      $(this).html(check_yes);
      $(this).addClass('check_yes');

      // Make the No and Maybe cells for this player "N/A"
      $(this).siblings().addClass('na');
      $(this).siblings('.dont_have').html('');
      $(this).siblings().children().children('.mabes').removeClass('maybe_has');
      $(this).siblings().children().children('.mabes').addClass('na');


      // Change other player's to "No" for item
      $(this).parent().parent().siblings().children().children('.dont_have').html(check_no);
      $(this).parent().parent().siblings().children().children('.dont_have').addClass('check_no');

      // Change other player's "Yes" and "Maybe" Cells to "na"
      $(this).parent().parent().siblings().children().children('.have').html('');
      $(this).parent().parent().siblings().children().children('.have').addClass('na');
      $(this).parent().parent().siblings().children().children('.maybe_container').children().children('.mabes').removeClass('maybe_has');
      $(this).parent().parent().siblings().children().children('.maybe_container').children().children('.mabes').addClass('na');
      $(this).parent().parent().siblings().children().children('.maybe_container').addClass('na');

      // Change the overall item status to no
      $(this).parent().parent().siblings().children('.clue_item').addClass('not_this_item');

  }

});



$('.dont_have').click(function(){

  if( (! $(this).hasClass('check_no')) && (! $(this).hasClass('na') ) ){

      // Change status of item for this player to no
      $(this).html(check_no);
      $(this).addClass('check_no');

      // Make the Yes and Maybe cells for this player "N/A"
      $(this).siblings().addClass('na');
      $(this).siblings('.have').html('');
      $(this).siblings().children().children('.mabes').removeClass('maybe_has');
      $(this).siblings().children().children('.mabes').addClass('na');

  }





});



$('.mabes').click(function(){

  // Maybe Cell is neither in maybe state nor an na state
  if( (! $(this).hasClass('maybe_has')) && (! $(this).hasClass('na') ) ){

    $(this).addClass('maybe_has');

  } else if ( $(this).hasClass('maybe_has') ){

    $(this).removeClass('maybe_has');

  }



})