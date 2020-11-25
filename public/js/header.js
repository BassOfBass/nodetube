;(() => {
  "use strict";

  // whatever search expander is
  $('.searchExpander').click(function () {
    console.log('something')

    // hide the sign in div
    $('.signInDiv').hide();

    // show the back button
    $('.backButtonIcon').css({
      display: 'block'
    });

    // hide single letter (now just says newtube)
    var elem = $('.singleLetter');
    elem[0].style.removeProperty('display');
    elem[0].style.setProperty('display', 'none', 'important');

    // hide single letter
    var elem2 = $('.searchPlaceHolder');
    console.log(elem2[0]);
    elem2[0].style.removeProperty('display');
    elem2[0].style.setProperty('display', 'inline', 'important');

    // post icon probably now upload button
    var elem1 = $('.postIcon');
    if(elem1[0]){
      elem1[0].style.removeProperty('display');
      elem1[0].style.setProperty('display', 'none', 'important');
    }

    // shwo the search bar again
    $('.search-bar, .search-form').css({
      display: 'inline'
    });

    $('.search-query-input').css({
      'margin-left' : '-61px'
    });


    $('.hamburgerDropdown, .userImage, .searchExpanderButton').css({
      display: 'none'
    });

    $('.searchButton').css({
      top: '-8px'
    })

    // no need to autofocus
    $('.search-query-input').focus();

  })

    // REVERSE EFFECT
    // show the old header
    $('.backButtonIcon').click(function () {
      console.log('something else ')

      $('.signInDiv').show();

      $('.backButtonIcon, .singleLetter, .search-bar, .search-form').css({
        display: 'none'
      });

      $('.hamburgerDropdown, .searchExpanderButton, .userImage').css({
        display: 'block'
      });

      $('.postIcon').css({
        display: 'inline'
      });

      $('.searchPlaceHolder').css({
        display: 'inline-block'
      });


    })

  //- hide the header when you scroll down
  //- first I have to make it fixed to the top
  $(document).ready(function () {
    // grab an element
    var myElement = document.querySelector('.navbar');
    // construct an instance of Headroom, passing the element
    var headroom = new Headroom(myElement);
    // initialise
    headroom.init();

    console.log(headroom);

    console.log("ready!");
  });

  
})();