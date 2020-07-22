// GOAL: Attraverso una chiamata ajax all'Api di boolean avremo a disposizione una decina di dischi musicali. Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica. Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd. Chiamata: https://flynn.boolean.careers/exercises/api/array/music Layout base: https://bitbucket.org/booleancareers/ex-dischi-musicali-layout

function init() {
    // var select = $('#select');
    // select.trigger('change');
    // select.change(function () {
    //     var data = $(this).val();
    //     console.log(data);
    // });
    callApi();
}

function callApi() {
    $.ajax({
        url : 'https://flynn.boolean.careers/exercises/api/array/music',
        method : 'GET',
        success : function (data) {
            
            var template = $('#music-template').html();
            var compiled = Handlebars.compile(template);
            var target = $('#target');
            var select = $('#select');
            select.trigger('change');

            var response = data.response;
            var success = data.success;
            if (success) {
                for (var i = 0; i < response.length; i++) {
                    var element = response[i];
                    var musicObj = compiled({
                        'poster': element.poster,
                        'author': element.author,
                        'title' : element.title,
                        'year' : element.year
                    });
                    target.append(musicObj);
                }
                select.change(function () {
                    var data = $(this).val();
                    for (var i = 0; i < response.length; i++) {
                        var x = response[i].genre;
                        y = x.toLowerCase();
                        console.log(x);
                        if (y === data) {
                            element.show();
                        } else {
                            element.hide();
                        }
                    }
                });
            } else {
                console.log('error');
            }     
        },
        error : function (error) {
                
            console.log(error);
        }
    });
}
$(document).ready(init);