/*$(document).ready(function(){

	$("#miform").submit(function(event) {
        event.preventDefault();
        console.log("hola");

        $("#formulario").validate({
                // REGLAS
                rules: {
                    nombre: {
                    	required: true,
                    	minlength: 2
                    }
                }
            });
	});
});*/

$(document).ready(function(){
	$("#formulario").validate({
        // REGLAS
        rules: {
            nombre: {
            	required: true,
            	minlength: 6,
            	lettersonly: true
            }
        },
        messages: {
        	nombre: {
        		required: "El nombre es necesario",
        		minlength: "Minimo 6 caracteres"
        	}
        }
    });

});

$.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Solo escribir letras");

