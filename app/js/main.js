"use strict";

var myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log("width ".concat(myWidth, " \n height ").concat(myHeight));
document.querySelector('html').style.overflowY = 'hidden';

window.onload = function () {
  setTimeout(function () {
    document.querySelector('html').style.overflowY = 'scroll';
    document.querySelector('.loader').style.opacity = '0';
    document.querySelector('.loader').style.zIndex = '-5';
  }, 1500);
  /*
      animated block
   */

  var fade = [$('a.bucket'), $('.advantages__content h3'), $('.advantages__content p.big'), $('.advantages__content-block figure'), $('.gallery__content a'), $('.photo__content a')];

  for (var _i = 0; _i < fade.length; _i++) {
    fade[_i].waypoint(function (direction) {
      if (direction === 'down') {
        $(this.element).addClass('animated');
        this.destroy();
      }
    }, {
      offset: function offset() {
        return this.context.innerHeight() * 0.82;
      }
    });
  }
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

  for (var _i2 = 0; _i2 < period.length; _i2++) {
    period[_i2].innerHTML = "".concat(day, ".").concat(month, ".").concat(year.toString().slice(2));
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
    var _loop = function _loop(_i3) {
      var _loop2 = function _loop2(j) {
        color[j].addEventListener('click', function () {
          if (color[j].classList.contains('active')) {
            color[_i3].classList.remove('active');

            color[j].classList.add('active');
          } else {
            color[_i3].classList.remove('active');

            color[j].classList.add('active');
            var activeColor = color[j].classList.value;
            var activeModel = color[j].dataset.model;

            var hide = function hide() {
              img.style.opacity = '0';

              for (var _i4 = 0; _i4 < photo.length; _i4++) {
                photo[_i4].style.opacity = '0';
                link[_i4].style.opacity = '0';
              }
            };

            var change = function change() {
              img.src = "img/catalog/".concat(activeModel, "/big.png");
              img.className = "big ".concat(activeColor);

              for (var _i5 = 0; _i5 < photo.length; _i5++) {
                photo[_i5].src = "img/catalog/".concat(activeModel, "/").concat(_i5 + 1, "s.jpg");
                link[_i5].href = "img/catalog/".concat(activeModel, "/").concat(_i5 + 1, ".jpg");
              }
            };

            var show = function show() {
              img.style.opacity = '1';

              for (var _i6 = 0; _i6 < photo.length; _i6++) {
                photo[_i6].style.opacity = '1';
                link[_i6].style.opacity = '1';
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

    for (var _i3 = 0; _i3 < color.length; _i3++) {
      _loop(_i3);
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
  setupForWidth(mql);

  var toggleBucket = function toggleBucket() {
    var bucket = document.querySelector('a.bucket'),
        topOfWindow = window.pageYOffset + innerHeight,
        catalogBlockTopPosition = document.querySelector('.catalog').offsetTop,
        photoBlockTopPosition = document.querySelector('.photo').offsetTop,
        footerLinkTopPosition = $('.footer__content .to-order').offset().top;

    if (topOfWindow > catalogBlockTopPosition && topOfWindow < photoBlockTopPosition || topOfWindow > footerLinkTopPosition) {
      bucket.style.opacity = '0';
      bucket.style.zIndex = '-5';
    } else {
      bucket.style.opacity = '1';
      bucket.style.zIndex = '99999';
    }
  };

  if (/iPhone|iPod|iPad|Android/i.test(navigator.userAgent)) {
    var href = $('#mobile-order').offset().top - innerHeight;
    $('.to-order a, a.bucket').on('click', function () {
      $('html, body').animate({
        scrollTop: href
      }, 800);
    });
    window.addEventListener('scroll', function () {
      toggleBucket();
    });
    window.addEventListener('resize', function () {
      toggleBucket();
    });
  } else {
    var _href = $('#catalog').offset().top;
    $('.to-order a, a.bucket').on('click', function () {
      $('html, body').animate({
        scrollTop: _href
      }, 800);
    });
  }
};