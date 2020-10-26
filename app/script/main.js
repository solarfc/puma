let myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log(`width ${myWidth} \n height ${myHeight}`);

document.querySelector('html').style.overflowY = 'hidden';

window.onload = function () {

    setTimeout(() => {
        document.querySelector('html').style.overflowY = 'scroll';
        document.querySelector('.loader').style.opacity = '0';
        document.querySelector('.loader').style.zIndex = '-5';
    }, 1500);

    /*
        animated block
     */

    let fade = [
        $('a.bucket'),
        $('.advantages__content h3'),
        $('.advantages__content p.big'),
        $('.advantages__content-block figure'),
        $('.gallery__content a'),
        $('.photo__content a')
    ];

    for(let i = 0; i < fade.length; i++) {
        fade[i].waypoint(
            function (direction) {
                if(direction === 'down') {
                    $(this.element).addClass('animated');
                    this.destroy();
                }
            },
            {
                offset: function () {
                    return this.context.innerHeight() * 0.82;
                }
            }
        );
    }

    /*
        increase date
     */

    let today = new Date(),
        tomorrow = new Date(),
        day,
        month,
        year,
        i = 3,
        period = document.querySelectorAll('.to-order p output');

    tomorrow.setDate(today.getDate() + i);
    day = (tomorrow.getDate() > 9) ? tomorrow.getDate() : `0${tomorrow.getDate()}`;
    month = (tomorrow.getMonth() + 1 > 9) ? tomorrow.getMonth() + 1 : `0${tomorrow.getMonth() + 1}`;
    year = tomorrow.getFullYear();

    for(let i = 0; i < period.length; i++) {
        period[i].innerHTML = `${day}.${month}.${year.toString().slice(2)}`;
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

    const manColor = document.querySelectorAll('.catalog__block.man .color figure span'),
        womanColor = document.querySelectorAll('.catalog__block.woman .color figure span'),
        bigManBoot = document.querySelector('.catalog__block.man .catalog__block-img img.big'),
        bigWomanBoot = document.querySelector('.catalog__block.woman .catalog__block-img img.big'),
        smallManBoot = document.querySelectorAll('.catalog__block.man .catalog__block-img a img'),
        smallManLink = document.querySelectorAll('.catalog__block.man .catalog__block-img a'),
        smallWomanBoot = document.querySelectorAll('.catalog__block.woman .catalog__block-img a img'),
        smallWomanLink = document.querySelectorAll('.catalog__block.woman .catalog__block-img a'),
        changeColor = (color, img, photo, link) => {
            for(let i = 0; i < color.length; i++) {
                for(let j = 0; j < color.length; j++) {
                    color[j].addEventListener('click', () => {
                        if(color[j].classList.contains('active')) {
                            color[i].classList.remove('active');
                            color[j].classList.add('active');
                        } else {
                            color[i].classList.remove('active');
                            color[j].classList.add('active');
                            let activeColor = color[j].classList.value;
                            let activeModel = color[j].dataset.model;
                            const hide = () => {
                                img.style.opacity = '0';
                                for(let i = 0; i < photo.length; i++) {
                                    photo[i].style.opacity = '0';
                                    link[i].style.opacity = '0';
                                }
                            }
                            const change = () => {
                                img.src = `img/catalog/${activeModel}/big.png`;
                                img.className = `big ${activeColor}`;
                                for(let i = 0; i < photo.length; i++) {
                                    photo[i].src = `img/catalog/${activeModel}/${i + 1}s.jpg`;
                                    link[i].href = `img/catalog/${activeModel}/${i + 1}.jpg`;
                                }
                            }
                            const show = () => {
                                img.style.opacity = '1';
                                for(let i = 0; i < photo.length; i++) {
                                    photo[i].style.opacity = '1';
                                    link[i].style.opacity = '1';
                                }
                            }
                            hide();
                            setTimeout(change, 750);
                            setTimeout(show, 1000);
                        }
                    });
                }
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

    let advantagesVector = document.querySelector('.advantages__content-img .vector'),
        womanLeftVector = document.querySelector('.catalog__block.woman .vector.left'),
        womanRightVector = document.querySelector('.catalog__block.woman .vector.right'),
        manLeftVector = document.querySelector('.catalog__block.man .vector.left'),
        top,
        left,
        move = (top, left) => {
            advantagesVector.style.transform = `translate3d(${left}, ${top}, ${top})`;
            womanLeftVector.style.transform = `translate3d(${left}, ${top}, ${top})`;
            womanRightVector.style.transform = `translate3d(-${left}, -${top}, -${top})`;
            manLeftVector.style.transform = `translate3d(-${left}, ${top}, -${top})`;
        },
        setupForWidth = (mql) => {
            if(mql.matches) {
                document.addEventListener('mousemove', () => {
                    top = `${event.clientY * 10 / myHeight}px`;
                    left = `${event.clientX * 10 / myWidth}px`;
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

    const toggleBucket = () => {
        let bucket = document.querySelector('a.bucket'),
            topOfWindow = window.pageYOffset + innerHeight,
            catalogBlockTopPosition = document.querySelector('.catalog').offsetTop,
            photoBlockTopPosition = document.querySelector('.photo').offsetTop,
            footerLinkTopPosition = $('.footer__content .to-order').offset().top;

        if(topOfWindow > catalogBlockTopPosition && topOfWindow < photoBlockTopPosition || topOfWindow > footerLinkTopPosition) {
            bucket.style.opacity = '0';
            bucket.style.zIndex = '-5';
        } else {
            bucket.style.opacity = '1';
            bucket.style.zIndex = '99999';
        }
    };

    if(/iPhone|iPod|iPad|Android/i.test(navigator.userAgent)) {
        let href = $('#mobile-order').offset().top - innerHeight;
        $('.to-order a, a.bucket').on('click', function () {
            $('html, body').animate({scrollTop: href}, 800);
        });
        window.addEventListener('scroll', () => {
            toggleBucket();
        });
        window.addEventListener('resize', () => {
            toggleBucket();
        });
    } else {
        let href = $('#catalog').offset().top;
        $('.to-order a, a.bucket').on('click', function () {
            $('html, body').animate({scrollTop: href}, 800);
        });
    }
};
