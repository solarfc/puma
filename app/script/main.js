let myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log(`width ${myWidth} \n height ${myHeight}`);

window.onload = function () {

    let i = 1;

    const obj = {
        'Пункт 1': [1, 2, 3],
        'Пункт 2': [4, 5, 6]
    };

    console.log(obj[1]);

    $.each(obj, function (key) {
        $('#main-select').append(`<option value="${key}">${key}</option>`)
    });

    $('#main-select').on('change', function () {
        let a = $('#main-select option:selected').val();
        $('body').append(`<select name="${a}" id="${i++}"><option>${$('#main-select option:selected').val()}</option></select>`);
        console.log(a);
        console.log(obj[a]);
        $('#main-select option:selected').addClass('hide');

        for(let i = 0; i<obj[a].length; i++) {
            $(`select[name="${a}"]`).append(`<option>${obj[a][i]}</option>`)
        }

        // for(let key in obj) {
        // }
    });



    // console.log(obj);


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
