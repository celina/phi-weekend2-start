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

    // function to add a single person
    function addPersonToDom() {
      var currentPerson = people[personIndex];
      console.log('appending person ', currentPerson);
      $('#carouselcontainer').append('<div class="person"></div>');
      var $el = $('#carouselcontainer').children().last();
      $el.append('<h2>' + currentPerson.name + '</h2>');
      $el.append('<img src="' + currentPerson.image + '" />');
      $el.append('<b>Github:</b> <a href="https://github.com/' + currentPerson.git_username + '">' + currentPerson.git_username + '</a>');
      if (currentPerson.shoutout == "") {
          // if this person has no shoutout, don't create the shoutout container
        } else {
          $el.append('<b>Shoutout:</b> ' + person.shoutout + '<br>')
        }; // end if person.shoutout else
    }; // end addPersonToDom
}); // end document.ready
