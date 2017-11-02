$(document).ready(function(){
    $('.anchor').click(function(event){
        $('.parallax').animate({
            scrollTop: $( $(this).attr('href') ).offset().top +  $('.parallax').scrollTop()
        }, 600);

        event.preventDefault();
    });
    $('.up').click(function(event){
        $('.parallax').animate({
            scrollTop:0
        }, 600);

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
    $('.submit-contacts-button').click(function() {
        var form = $('form[name="contact"]');
        var data = {};
        form.serializeArray().forEach(function(formItem) {
          data[formItem.name] = formItem.value;
        });
        $.ajax({ // todo: email validation
          method: "POST",
          url: "/api/sendMail",
          data: JSON.stringify(data),
          contentType: "application/json",
          success: function () {
           console.log('success');
              $('.good-result').removeClass('is-hidden');
              setTimeout(function(){$('.good-result').addClass('is-hidden')}, 5000);
          },
          error: function () {
           console.log('error');
              var bad_result = "Oops... Something went wrong. Please write to mail@daze.tech";
              $('.bad-result').removeClass('is-hidden');
              $('.bad-result').text(bad_result);
              setTimeout(function(){$('.bad-result').addClass('is-hidden')}, 5000);
          }
        });
        console.log(data);
    });
    
});
