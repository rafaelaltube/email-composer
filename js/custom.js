$(document).ready(function() {

    $('#attach-false').click(function() {
        $('#attach').click();
    });

    $('#submit-false').click(function() {
        if ($('#submit-false').hasClass('disabled')) {
            console.log('Invalid submit form');
        } else {
            $('#new-email').addClass('hidden');
            $('#confirmation').removeClass('hidden');
        }
    });

    $('#thumbs').on("click", ".image", function() {
        $(this).remove();
        if ($('#thumbs .image').length == 0) {
            $('#thumbs-title').css('display', 'none');
        }
    });

    $("form :input").bind("keyup change", function() {
      validateForm();

      $('#subject').empty();
      $('#remittance-to').parent().removeClass('hidden');
      $('#remittance-cc').parent().removeClass('hidden');
      $('#remittance-bcc').parent().removeClass('hidden');
      $('#remittance-to').empty();
      $('#remittance-cc').empty();
      $('#remittance-bcc').empty();

      $('#subject').text($('input[name="subject"]').val());
      $('#remittance-to').text($('input[name="to"]').val());
      $('#remittance-cc').text($('input[name="cc"]').val());
      $('#remittance-bcc').text($('input[name="bcc"]').val());
      if($('#remittance-to').text() == ''){
        $('#remittance-to').parent().addClass('hidden');
      }
      if($('#remittance-cc').text() == ''){
        $('#remittance-cc').parent().addClass('hidden');
      }
      if($('#remittance-bcc').text() == ''){
        $('#remittance-bcc').parent().addClass('hidden');
      }
    });

    $("form textarea").bind("keyup change", function() {
      validateForm();
      $('#message').empty();
      $('#message').text($('textarea').val());
    });

    $('#thumbs').bind("DOMSubtreeModified",function(){
      $('#thumbs-send').empty();
      $( "#thumbs" ).clone().appendTo( "#thumbs-send" );
      $('#thumbs-send .thumb-title').remove();
      $('#thumbs-send .drop').remove();
    });


    function validateForm() {

        var reg_to = /^(,?[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})+$/;
        var reg_cc = /^(,?[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})+$/;
        var reg_bcc = /^(,?[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})+$/;

        var to = $('input[name="to"]').val();
        var cc = $('input[name="cc"]').val();
        var bcc = $('input[name="bcc"]').val();
        var subject = $('input[name="subject"]').val();
        var message = $('textarea').val();

        // if !regex is a invalid value of TO, but if not is a valid and if the other CC and BCC is empty is valid too
        if (!reg_to.test(to)) {
          if(to == ''){
            if($('input[name="cc"]').hasClass('valid') || $('input[name="bcc"]').hasClass('valid')){
              $('input[name="to"]').removeClass('invalid');
              $('input[name="to"]').addClass('valid');
            }
          }else{
            $('input[name="to"]').removeClass('valid');
            $('input[name="to"]').addClass('invalid');
          }
        }else{
          if($('input[name="to"]').hasClass('invalid')){
            $('input[name="to"]').addClass('valid');
            $('input[name="to"]').removeClass('invalid');
          }
          if(cc == '' && bcc == ''){
            $('input[name="cc"]').removeClass('invalid');
            $('input[name="bcc"]').removeClass('invalid');
            $('input[name="cc"]').addClass('valid');
            $('input[name="bcc"]').addClass('valid');
          }
        }

        // same like TO but with CC, you can add only CC remittances and not TO and BCC
        if (!reg_cc.test(cc)) {

          $('input[name="cc"]').removeClass('valid');
          $('input[name="cc"]').addClass('invalid');
          if(cc == ''){
            if($('input[name="to"]').hasClass('valid') || $('input[name="bcc"]').hasClass('valid')){
              $('input[name="cc"]').removeClass('invalid');
              $('input[name="cc"]').addClass('valid');
            }
          }else{
            $('input[name="cc"]').removeClass('valid');
            $('input[name="cc"]').addClass('invalid');
          }
        }else{
          if($('input[name="cc"]').hasClass('invalid')){
            $('input[name="cc"]').addClass('valid');
            $('input[name="cc"]').removeClass('invalid');
          }
          if(to == '' && bcc == ''){
            $('input[name="to"]').removeClass('invalid');
            $('input[name="bcc"]').removeClass('invalid');
            $('input[name="to"]').addClass('valid');
            $('input[name="bcc"]').addClass('valid');
          }
        }

        //same again :D
        if (!reg_bcc.test(bcc)) {
          if(bcc == ''){
            if($('input[name="to"]').hasClass('valid') || $('input[name="cc"]').hasClass('valid')){
              $('input[name="bcc"]').removeClass('invalid');
              $('input[name="bcc"]').addClass('valid');
            }
          }else{
            $('input[name="bcc"]').removeClass('valid');
            $('input[name="bcc"]').addClass('invalid');
          }
        }else{
          if($('input[name="bcc"]').hasClass('invalid')){
            $('input[name="bcc"]').addClass('valid');
            $('input[name="bcc"]').removeClass('invalid');
          }
          if(to == '' && cc == ''){
            $('input[name="to"]').removeClass('invalid');
            $('input[name="cc"]').removeClass('invalid');
            $('input[name="to"]').addClass('valid');
            $('input[name="cc"]').addClass('valid');
          }
        }

        if(to == '' && cc == '' && bcc == ''){
          $('input[name="to"]').removeClass('valid');
          $('input[name="to"]').addClass('invalid');
        }

        if (subject == "") {
            $('input[name="subject"]').removeClass('valid');
            $('input[name="subject"]').addClass('invalid');
        }else{
            $('input[name="subject"]').addClass('valid');
            $('input[name="subject"]').removeClass('invalid');
        }

        if (message == "") {
            $('textarea').removeClass('valid');
            $('textarea').addClass('invalid');
        }else{
            $('textarea').addClass('valid');
            $('textarea').removeClass('invalid');
        }


        if($('input[name="to"]').hasClass('valid') &&
            $('input[name="cc"]').hasClass('valid') &&
            $('input[name="bcc"]').hasClass('valid') &&
            $('input[name="subject"]').hasClass('valid') &&
            $('textarea').hasClass('valid') ){
          $('#submit-false').removeClass('disabled');
        }else{
          if($('#submit-false').hasClass('disabled')){
            // nothing to do
          }else{
            $('#submit-false').addClass('disabled');
          }
        }

        
    }

});

document.getElementById('attach').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var fileReader = new FileReader();
    if (file.type.match('image')) {
        fileReader.onload = function() {
            var img = document.createElement('img');
            img.src = fileReader.result;

            var html = "<div class='image'><div class='drop'><i class='fa fa-trash'></i></div><div class='content' style='background-image: url(" + img.src + ");'></div></div>";
            document.getElementById('thumbs').insertAdjacentHTML('beforeend', html);
        };
        fileReader.readAsDataURL(file);
    }


    document.getElementById('thumbs-title').style.display = "block";
});