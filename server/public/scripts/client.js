/// removed data button, all student data shows

// global person array
var people;
var personIndex = 0;

$(document).ready(function(){
  console.log('jQuery is running!'); // verify jQuery

    // make ajax request
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        // yay! we have data!
        console.log('data from server: ', data.phirephiters);
          people = data.phirephiters;
          addPersonToDom();
        } // end success
      }); // end ajax

      // next button
      $('#nextButton').on('click', function functionName() {
        console.log('Next button was clicked!');
        personIndex++;
        if (personIndex >= people.length) { // log when you reach the end of the person array
          console.log('You\'ve reached the end!');
          personIndex = 0; // start back at the beginning of the person array list
        }
        addPersonToDom();
      });

      // prev button
      $('#prevButton').on('click', function functionName() {
        console.log('Prev button was clicked!');
        personIndex--;
        if (personIndex < 0) { // log when you reach the front of the person array
          console.log('You\'ve reached the end!');
          personIndex = people.length - 1; // start back at the end of the person array list
        }
        addPersonToDom();
      });

    // function to add a single person
    function addPersonToDom() {
      $('#carouselcontainer').empty();
      var currentPerson = people[personIndex];
      console.log('appending person ', currentPerson);
      $('#carouselcontainer').append('<div class="person"></div>');
      var $el = $('#carouselcontainer').children().last();
      $el.append('<img src="' + currentPerson.image + '" />');
      $el.append('<b>Name:</b> ' + currentPerson.name + '<br>');
      $el.append('<b>Github: </b><a href="https://github.com/' + currentPerson.git_username + '">' + currentPerson.git_username + '</a><br>');
      if (currentPerson.shoutout == "") {
          // if this person has no shoutout, don't create the shoutout container
        } else {
          $el.append('<b>Shoutout:</b> ' + currentPerson.shoutout + '<br>')
        }; // end if person.shoutout else
    }; // end addPersonToDom
}); // end document.ready
