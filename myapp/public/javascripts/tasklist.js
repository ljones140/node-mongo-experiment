$(document).ready(function() {

  $('.btnEdit').click(function(){
    var value = $(this).val();
    $('#ourValue').val(value);
    // alert(value)
    $('#edittask').show();
  });

});