console.log('\'Allo \'Allo!');
$(document).ready(function(){
	$("#formulario").validate({
		rules: {
			nombre: {
				required: true, 
				lettersonly: true
			},
		},
		messages: {
			nombre: {
				lettersonly: "Introduce caracteres"
			}
		}
	});
});
