let myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log(`width ${myWidth} \n height ${myHeight}`);

window.onload = function () {

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
