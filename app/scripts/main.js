
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
            }, 
            provincia: {
            	required: true
            },
			pais: {
				required: true
			}, 
			iban: {
				required: true
			}, 
			pago: {
				required: true
			}, 
			usuario: {
				required: true
			}, 
			pass: {
				required: true
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
        	}, 
        	provincia: {
        		required: "La provincia es necesaria"
        	}, 
        	pais: {
        		required: "El pais es necesario"
        	}, 
        	iban: {
        		required: "El iban es necesario"
        	}, 
        	pago: {
        		required: "La forma de pago es necesaria"
        	},
        	usuario: {
        		required: "El usuario es necesario"
        	}, 
        	pass: {
        		required: "La contraseña es necesaria"
        	}
        }
    });
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
