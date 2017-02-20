// global person array
var people;
var personIndex = 0;
var timer;

$(document).ready(function(){

  $('#buttons').on('click', '#nextButton', nextButtonFunc);
  $('#buttons').on('click', '#prevButton', prevButtonFunc);

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
          timeCountdown();
          // fadeIn();
        } // end success
      }); // end ajax

      // next button
      function nextButtonFunc() {
        personIndex++;
        if (personIndex >= people.length) { // log when you reach the end of the person array
          personIndex = 0; // start back at the beginning of the person array list
        }
        addPersonToDom();
        moveNavDot();
        timeReset();
      }

      // prev button
      function prevButtonFunc() {
        personIndex--;
        if (personIndex < 0) { // log when you reach the front of the person array
          personIndex = people.length - 1; // start back at the end of the person array list
        }
        addPersonToDom();
        moveNavDot();
        timeReset();
      }

    // function to add a single person
    function addPersonToDom() {
      $('#carouselcontainer').empty();
      var currentPerson = people[personIndex];
      $('#carouselcontainer').append('<div class="person"></div>');
      var $el = $('#carouselcontainer').children().last();
      $el.append('<img src="' + currentPerson.image + '" />');
      $el.append('<b>' + currentPerson.name + '</b><br>');
      $el.append('<a href="https://github.com/' + currentPerson.git_username + '">' + 'https://github.com/' + currentPerson.git_username + '</a><br>');
      if (currentPerson.shoutout == "") {
          // if this person has no shoutout, don't create the shoutout container
        } else {
          $el.append('<b>Shoutout!</b> "' + currentPerson.shoutout + '"')
        }; // end if person.shoutout else
      // moveProgressBar();
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
        timeReset();
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

  function timeCountdown() {
    timer = setInterval(nextButtonFunc, 10000);
    moveProgressBar();
    fadeIn();
  };

  function timeReset() {
    clearInterval(timer);
    timeCountdown();
    resetProgressBar();
    moveProgressBar();
  }

  function fadeIn() {
    // $('#carouselcontainer').css({opacity: '0'}).css({background : "white"}).animate({opacity: '1'}, 900);
    $('#carouselcontainer').hide().fadeIn(1000) // omg it finally works!
    // resource: http://stackoverflow.com/questions/14814239/jquery-fadein-doesnt-work

  }

  // Progress bar
  // Resources:
  //    http://api.jquery.com/animate/
  //    https://codepen.io/thathurtabit/pen/ymECf

  function moveProgressBar() {
      var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
      var getProgressWrapWidth = $('.progress-wrap').width();
      var progressTotal = getPercent * getProgressWrapWidth;
      var animationLength = 10000;
      // on page load, animate percentage bar to data percentage length
      // .stop() used to prevent animation queueing
      $('.progress-bar').stop().animate({
          left: progressTotal
      }, animationLength);
    }

    function resetProgressBar() {
        var getPercent = 0;
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 0;
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar').stop().animate({
            left: progressTotal
        }, animationLength);
      }

}); // end document.ready
