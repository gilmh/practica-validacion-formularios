
$(document).ready(function(){
	$("#formulario").validate({
        // REGLAS
        rules: {
            nombre: {
            	required: true,
            	minlength: 3,
            	soloLetras: true
            }, 
            apellidos: {
            	required: true,
            	minlength: 3,
            	soloLetras: true
            }, 
            telefono: {
				required: true,
				telefonos: true
            }, 
            email: {
            	required: true,
            	email: true
            }, 
            repEmail: {
        		required: true,
        		equalTo: email
        	},
            demandante: {
            	required: true
            },
            cifnif: {
            	required: true
            }, 
            nomEmp: {
            	required: true
            }, 
            direccion: {
            	required: true
            }, 
            cp: {
            	required: true
            }, 
            localidad: {
            	required: true
            }, /*
            provincia: {
            	required: true
            },*/
			pais: {
				required: true
			}, 
			iban: {
				required: true, 
				calcularIban: true
			}, 
			pago: {
				required: true
			}, 
			usuario: {
				required: true, 
				minlength: 4
			}, 
			pass: {
				required: true
			},
			reppass: {
				required: true,
				equalTo: pass
			}
        },
        messages: {
        	nombre: {
        		required: "El nombre es necesario",
        		minlength: "Minimo 3 caracteres"
        	},
        	apellidos: {
        		required: "Los apellidos son necesario",
        		minlength: "Minimo 3 caracteres"
        	}, 
        	telefono: {
        		required: "El telefono es necesario"
        	}, 
        	email: {
        		required: "El e-mail es necesario", 
        		email: "Debes introducir un correo valido"
        	}, 
        	repEmail: {
        		required: "Es necesario repetir el e-mail", 
        		email: "Debes introducir un correo valido", 
        		equalTo: "Debes introducir el mismo e-mail"
        	},
        	demandante: {
        		required: "El demandante es necesario"
        	},
        	cifnif: {
        		required: "El CIF/NIF es necesario"
        	}, 
        	nomEmp: {
        		required: "El Nombre/Empresa es necesario"
        	}, 
        	direccion: {
        		required: "La direccion es necesaria"
        	}, 
        	cp: {
        		required: "El Codigo Postal es necesario"
        	}, 
        	localidad: {
        		required: "La localidad es necesaria"
        	}, /*
        	provincia: {
        		required: "La provincia es necesaria"
        	}, */
        	pais: {
        		required: "El pais es necesario"
        	}, 
        	iban: {
        		required: "El iban es necesario", 
        	}, 
        	pago: {
        		required: "La forma de pago es necesaria"
        	},
        	usuario: {
        		required: "El usuario es necesario"
        	}, 
        	pass: {
        		required: "La contraseña es necesaria"
        	},
        	reppass: {
        		required: "Es necesario repetir la contraseña", 
        		equalTo: "Debes introducir la mismo contraseña"
        	},
        }
    });

	$(function () {
		$("#pass").complexify({}, function (valid, complexity) {
		    document.getElementById("passBarra").value = complexity;
		});
	});

});

$("#cp").focusout(function() {
    var caracteres = $("#cp").val();
    var ceros = "";
    if (caracteres.length < 5){
    	for (var i = caracteres.length; i < 5; i++) {
    		ceros += "0";
    	};
    }
    $("#cp").val(ceros + caracteres);
});

$("#cp").change(function() {
    if ($(this).val() != "") {
        var dato = $(this).val();
        if (dato.length > 2) {
            dato = dato.substring(0, 2);
        }
        $("#provincia").val(dato);
    }
});

$.validator.addMethod("soloLetras", function(value, element) {
	return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Solo escribir letras");

$.validator.addMethod("soloDigitos", function(value, element){
	return this.optional(element) || /^\d+$/.test(value);
}, "Solo escribir numeros");

$.validator.addMethod("telefonos", function(value, element){
	return this.optional(element) || /^[0-9]{9}$/.test(value);
}, "Introduce un telefono valido");

$.validator.addMethod("calcularIban", function(value, element){
	return this.optional(element) || /^[A-Z]{2}[0-9]{2}[ ][0-9]{4}[ ][0-9]{4}[ ][0-9]{2}[ ][0-9]{10}/.test(value);
}, "Introduce un codigo IBAN correcto");
