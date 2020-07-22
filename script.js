// GOAL: Attraverso una chiamata ajax all'Api di boolean avremo a disposizione una decina di dischi musicali. Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica. Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.

function init() {
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

            var response = data.response;
            var success = data.success;
            if (success) {
                for (var i = 0; i < response.length; i++) {
                    var musicObj = compiled(response[i]);
                    target.append(musicObj);
                }
                select.change(function () {
                    var data = $(this).val();
                    $('.cds-container>.cd').hide();
                    if (data != "") {  
                        $('.cds-container .cd[data-genere="'+ data +'"]').show();
                        console.log($('.cds-container .cd [data-genere="'+ data +'"]'));
                    } else {
                        $('.cds-container>.cd').show();
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