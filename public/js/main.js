$(document).ready(function(){
    $('.nav li a').click(function(event){

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);

        event.preventDefault();
    });

    $(".industry").click(function(){
        var target_id = $(this).attr('data-id');

        if($(this).hasClass('is-active')){
            closeDetails();
        }
        else{
            closeDetails();
            $(target_id).slideDown();
            $(this).addClass('is-active');
            $(this).find('span').removeClass('glyphicon-triangle-bottom').addClass( 'glyphicon-triangle-top');
        }
        function closeDetails(){
            $('.industry').removeClass('is-active');
            $('.details').slideUp();
            $('.industry').find('span').removeClass('glyphicon-triangle-top').addClass( 'glyphicon-triangle-bottom');
        }
    });
    
});
