"use strict";

var myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log("width ".concat(myWidth, " \n height ").concat(myHeight));

window.onload = function () {
  /*
      increase date
   */
  var today = new Date(),
      tomorrow = new Date(),
      day,
      month,
      year,
      i = 3,
      period = document.querySelectorAll('.to-order p output');
  tomorrow.setDate(today.getDate() + i);
  day = tomorrow.getDate() > 9 ? tomorrow.getDate() : "0".concat(tomorrow.getDate());
  month = tomorrow.getMonth() + 1 > 9 ? tomorrow.getMonth() + 1 : "0".concat(tomorrow.getMonth() + 1);
  year = tomorrow.getFullYear();

  for (var _i = 0; _i < period.length; _i++) {
    period[_i].innerHTML = "".concat(day, ".").concat(month, ".").concat(year.toString().slice(2));
  }

  document.querySelector('.footer p.small.address output').innerHTML = year;
  /*
      loop fancybox
   */

  $.fancybox.defaults.loop = true;
  /*
      form styler
   */

  $(function () {
    $('select').styler({
      selectSmartPositioning: false
    });
  });
  /*
      change color and photo
   */

  var manColor = document.querySelectorAll('.catalog__block.man .color figure span'),
      womanColor = document.querySelectorAll('.catalog__block.woman .color figure span'),
      bigManBoot = document.querySelector('.catalog__block.man .catalog__block-img img.big'),
      bigWomanBoot = document.querySelector('.catalog__block.woman .catalog__block-img img.big'),
      smallManBoot = document.querySelectorAll('.catalog__block.man .catalog__block-img a img'),
      smallManLink = document.querySelectorAll('.catalog__block.man .catalog__block-img a'),
      smallWomanBoot = document.querySelectorAll('.catalog__block.woman .catalog__block-img a img'),
      smallWomanLink = document.querySelectorAll('.catalog__block.woman .catalog__block-img a'),
      changeColor = function changeColor(color, img, photo, link) {
    var _loop = function _loop(_i2) {
      var _loop2 = function _loop2(j) {
        color[j].addEventListener('click', function () {
          if (color[j].classList.contains('active')) {
            color[_i2].classList.remove('active');

            color[j].classList.add('active');
          } else {
            color[_i2].classList.remove('active');

            color[j].classList.add('active');
            var activeColor = color[j].classList.value;
            var activeModel = color[j].dataset.model;

            var hide = function hide() {
              img.style.opacity = '0';

              for (var _i3 = 0; _i3 < photo.length; _i3++) {
                photo[_i3].style.opacity = '0';
                link[_i3].style.opacity = '0';
              }
            };

            var change = function change() {
              img.src = "img/catalog/".concat(activeModel, "/big.png");
              img.className = "big ".concat(activeColor);

              for (var _i4 = 0; _i4 < photo.length; _i4++) {
                photo[_i4].src = "img/catalog/".concat(activeModel, "/").concat(_i4 + 1, "s.jpg");
                link[_i4].href = "img/catalog/".concat(activeModel, "/").concat(_i4 + 1, ".jpg");
              }
            };

            var show = function show() {
              img.style.opacity = '1';

              for (var _i5 = 0; _i5 < photo.length; _i5++) {
                photo[_i5].style.opacity = '1';
                link[_i5].style.opacity = '1';
              }
            };

            hide();
            setTimeout(change, 750);
            setTimeout(show, 1000);
          }
        });
      };

      for (var j = 0; j < color.length; j++) {
        _loop2(j);
      }
    };

    for (var _i2 = 0; _i2 < color.length; _i2++) {
      _loop(_i2);
    }
  };

  changeColor(manColor, bigManBoot, smallManBoot, smallManLink);
  changeColor(womanColor, bigWomanBoot, smallWomanBoot, smallWomanLink);
  /*
      review slider
   */

  $('.review__content-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 0,
    speed: 300,
    arrows: true,
    prevArrow: $('.prev-arrow'),
    nextArrow: $('.next-arrow')
  });
  /*
      parallax
   */

  var advantagesVector = document.querySelector('.advantages__content-img .vector'),
      womanLeftVector = document.querySelector('.catalog__block.woman .vector.left'),
      womanRightVector = document.querySelector('.catalog__block.woman .vector.right'),
      manLeftVector = document.querySelector('.catalog__block.man .vector.left'),
      top,
      left,
      move = function move(top, left) {
    advantagesVector.style.transform = "translate3d(".concat(left, ", ").concat(top, ", ").concat(top, ")");
    womanLeftVector.style.transform = "translate3d(".concat(left, ", ").concat(top, ", ").concat(top, ")");
    womanRightVector.style.transform = "translate3d(-".concat(left, ", -").concat(top, ", -").concat(top, ")");
    manLeftVector.style.transform = "translate3d(-".concat(left, ", ").concat(top, ", -").concat(top, ")");
  },
      setupForWidth = function setupForWidth(mql) {
    if (mql.matches) {
      document.addEventListener('mousemove', function () {
        top = "".concat(event.clientY * 10 / myHeight, "px");
        left = "".concat(event.clientX * 10 / myWidth, "px");
        move(top, left);
      });
    } else {
      top = 0;
      left = 0;
    }
  },
      mql = window.matchMedia('screen and (min-width: 1200px)');

  mql.addListener(setupForWidth);
  setupForWidth(mql); // /*
  //     change href on mobile
  //  */
  //
  // if(/iPhone|iPod|Android/i.test(navigator.userAgent)){
  //     document.querySelector('a.grande').href = '#formgrande';
  //     document.querySelector('a.lake').href = '#formlake';
  //     document.querySelector('a.lou').href = '#formlou';
  // }
};