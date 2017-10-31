$(document).ready(function(){
    $('.anchor').click(function(event){
        console.log($( $(this).attr('href') ));
        $('.parallax').animate({
            scrollTop: $( $(this).attr('href') ).offset().top +  $('.parallax').scrollTop()
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
           console.log('success') // todo: tell user that all right
          },
          error: function () {
           console.log('error') // todo: tell user that shit happens
          }
        });
        console.log(data);
    });


        /* activate the carousel */
        $("#modal-carousel").carousel({interval:false});

        /* change modal title when slide changes */
        $("#modal-carousel").on("slid.bs.carousel",       function () {
            $(".modal-title")
                .html($(this)
                    .find(".active img")
                    .attr("title"));
        });

        /* when clicking a thumbnail */
        // $(".exp-images img").click(function(){
        //     // var content = $(".carousel-inner");
        //     // var title = $(".modal-title");
        //     //
        //     // content.empty();
        //     // title.empty();
        //     //
        //     // var id = this.id;
        //     // var repo = $("#img-repo .item");
        //     // var repoCopy = repo.filter("#" + id).clone();
        //     // var active = repoCopy.first();
        //     //
        //     // active.addClass("active");
        //     // title.html(active.find("img").attr("title"));
        //     // content.append(repoCopy);
        //
        //     // show the modal
        //     $("#modal-gallery").modal("show");
        // });

});
