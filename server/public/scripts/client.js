$(document).ready(function(){
  console.log('jQuery is running!'); // verify jQuery

  $('#loadData').on('click', function() {
    console.log('getting data'); // on click, get data

    // make ajax request
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        // yay! we have data!
        console.log('data from server: ', data);
        $('#dataContainer').empty;
        for (var i = 0; i < data.phirephiters.length; i++) {
          appendDOM(data.phirephiters[i]);
        } // end appendDOM loop
      } // end success
    }); // end ajax

    function appendDOM(person) { // add person to the DOM
      console.log('appending person');
      $('#carouselcontainer').append('<div class="person"></div>');
      var $el = $('#carouselcontainer').children().last();
      $el.append('<h2>' + person.name + '</h2>');
      $el.append('<img src="' + person.image + '" />');
      $el.append('<b>Git Name:</b> ' + person.git_username + '<br>')
      if (person.shoutout == "") {
        // if this person has no shoutout, don't create the shoutout container
      } else {
        $el.append('<b>Shoutout:</b> ' + person.shoutout + '<br>')
      }; // end if person.shoutout else
    } // end appendDOM

  }); // end loadData button click

}); // end document.ready
