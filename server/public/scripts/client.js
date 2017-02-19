/// removed data button, all student data shows

// global person array
var people;
var personIndex = 0;

$(document).ready(function(){
  // console.log('jQuery is running!'); // verify jQuery

    // make ajax request
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        // yay! we have data!
        // console.log('data from server: ', data.phirephiters);
          people = data.phirephiters;
          addPersonToDom();
          addNavDots();
          moveNavDot();
        } // end success
      }); // end ajax

      // next button
      $('#nextButton').on('click', function functionName() {
        personIndex++;
        if (personIndex >= people.length) { // log when you reach the end of the person array
          personIndex = 0; // start back at the beginning of the person array list
        }
        addPersonToDom();
        moveNavDot();
      });

      // prev button
      $('#prevButton').on('click', function() {
        personIndex--;
        if (personIndex < 0) { // log when you reach the front of the person array
          personIndex = people.length - 1; // start back at the end of the person array list
        }
        addPersonToDom();
        moveNavDot();
      });

    // function to add a single person
    function addPersonToDom() {
      $('#carouselcontainer').empty();
      var currentPerson = people[personIndex];
      // console.log('appending person ', currentPerson);
      $('#carouselcontainer').append('<div class="person"></div>');
      var $el = $('#carouselcontainer').children().last();
      $el.append('<img src="' + currentPerson.image + '" />');
      $el.append('<b>' + currentPerson.name + '</b><br>');
      $el.append('<a href="https://github.com/' + currentPerson.git_username + '">' + 'https://github.com/' + currentPerson.git_username + '</a><br>');
      if (currentPerson.shoutout == "") {
          // if this person has no shoutout, don't create the shoutout container
        } else {
          $el.append('<b>Shoutout!</b> "' + currentPerson.shoutout + '"<br>')
        }; // end if person.shoutout else
    }; // end addPersonToDom

    function addNavDots(person, i) { // add navdots to the page
      for (var i = 0; i < people.length; i++) {
        // $('li').last().data("index", i);
        $('#navdots').append('<li id="' + i + '"></li>');
      }

      $('li').on('click', function() { // on click jump to person associated with this li index
        personIndex = $(this).attr('id');
        addPersonToDom();
        moveNavDot();
      });
    }; // end addNavDots

    function moveNavDot() { // move the dot highlight for the current person
      $('#navdots').children().each(function(i, item) {
        if ($(this).attr('id') == personIndex) {
          $(this).addClass("currentdot");
        } else {
          $(this).removeClass('currentdot');
        } // end else
    }); // end function
  } // end moveNavDot

}); // end document.ready
