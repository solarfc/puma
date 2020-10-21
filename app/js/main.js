"use strict";

var myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log("width ".concat(myWidth, " \n height ").concat(myHeight));

window.onload = function () {
  var i = 1;
  var obj = {
    'Пункт 1': [1, 2, 3],
    'Пункт 2': [4, 5, 6]
  };
  console.log(obj[1]);
  $.each(obj, function (key) {
    $('#main-select').append("<option value=\"".concat(key, "\">").concat(key, "</option>"));
  });
  $('#main-select').on('change', function () {
    var a = $('#main-select option:selected').val();
    $('body').append("<select name=\"".concat(a, "\" id=\"").concat(i++, "\"><option>").concat($('#main-select option:selected').val(), "</option></select>"));
    console.log(a);
    console.log(obj[a]);
    $('#main-select option:selected').addClass('hide');

    for (var _i = 0; _i < obj[a].length; _i++) {
      $("select[name=\"".concat(a, "\"]")).append("<option>".concat(obj[a][_i], "</option>"));
    } // for(let key in obj) {
    // }

  }); // console.log(obj);
  // /*
  //     change href on mobile
  //  */
  //
  // if(/iPhone|iPod|Android/i.test(navigator.userAgent)){
  //     document.querySelector('a.grande').href = '#formgrande';
  //     document.querySelector('a.lake').href = '#formlake';
  //     document.querySelector('a.lou').href = '#formlou';
  // }
};