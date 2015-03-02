
$(document).ready(function(){
	$("#formulario").validate({
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
            	email: true, 
            	remote: "php/validar_email_db.php"
            }, 
            repEmail: {
        		required: true,
        		equalTo: email
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
			pais: {
				required: true
			}, 
			iban: {
				required: true, 
				iban: true
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
        	pais: {
        		required: "El pais es necesario"
        	}, 
        	iban: {
        		required: "El iban es necesario", 
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

	$("#deman1").change(function(evento) {
        if ($("#deman1").is(':checked')) {
            $("#cifnif").val("NIF: ");
            $("#apellidos").attr('disabled', false);
        }
    });

    $("#deman2").change(function(evento) {
    	if ($("#deman2").is(':checked')) {
    		$("#cifnif").val("CIF: ");
    		$("#apellidos").attr('disabled', true);
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

	/**
	 * IBAN is the international bank account number.
	 * It has a country - specific format, that is checked here too
	 */
	$.validator.addMethod("iban", function(value, element) {
		// some quick simple tests to prevent needless work
		if (this.optional(element)) {
			return true;
		}

		// remove spaces and to upper case
		var iban = value.replace(/ /g, "").toUpperCase(),
			ibancheckdigits = "",
			leadingZeroes = true,
			cRest = "",
			cOperator = "",
			countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

		if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
			return false;
		}

		// check the country code and find the country specific format
		countrycode = iban.substring(0, 2);
		bbancountrypatterns = {
			"AL": "\\d{8}[\\dA-Z]{16}",
			"AD": "\\d{8}[\\dA-Z]{12}",
			"AT": "\\d{16}",
			"AZ": "[\\dA-Z]{4}\\d{20}",
			"BE": "\\d{12}",
			"BH": "[A-Z]{4}[\\dA-Z]{14}",
			"BA": "\\d{16}",
			"BR": "\\d{23}[A-Z][\\dA-Z]",
			"BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
			"CR": "\\d{17}",
			"HR": "\\d{17}",
			"CY": "\\d{8}[\\dA-Z]{16}",
			"CZ": "\\d{20}",
			"DK": "\\d{14}",
			"DO": "[A-Z]{4}\\d{20}",
			"EE": "\\d{16}",
			"FO": "\\d{14}",
			"FI": "\\d{14}",
			"FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
			"GE": "[\\dA-Z]{2}\\d{16}",
			"DE": "\\d{18}",
			"GI": "[A-Z]{4}[\\dA-Z]{15}",
			"GR": "\\d{7}[\\dA-Z]{16}",
			"GL": "\\d{14}",
			"GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
			"HU": "\\d{24}",
			"IS": "\\d{22}",
			"IE": "[\\dA-Z]{4}\\d{14}",
			"IL": "\\d{19}",
			"IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
			"KZ": "\\d{3}[\\dA-Z]{13}",
			"KW": "[A-Z]{4}[\\dA-Z]{22}",
			"LV": "[A-Z]{4}[\\dA-Z]{13}",
			"LB": "\\d{4}[\\dA-Z]{20}",
			"LI": "\\d{5}[\\dA-Z]{12}",
			"LT": "\\d{16}",
			"LU": "\\d{3}[\\dA-Z]{13}",
			"MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
			"MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
			"MR": "\\d{23}",
			"MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
			"MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
			"MD": "[\\dA-Z]{2}\\d{18}",
			"ME": "\\d{18}",
			"NL": "[A-Z]{4}\\d{10}",
			"NO": "\\d{11}",
			"PK": "[\\dA-Z]{4}\\d{16}",
			"PS": "[\\dA-Z]{4}\\d{21}",
			"PL": "\\d{24}",
			"PT": "\\d{21}",
			"RO": "[A-Z]{4}[\\dA-Z]{16}",
			"SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
			"SA": "\\d{2}[\\dA-Z]{18}",
			"RS": "\\d{18}",
			"SK": "\\d{20}",
			"SI": "\\d{15}",
			"ES": "\\d{20}",
			"SE": "\\d{20}",
			"CH": "\\d{5}[\\dA-Z]{12}",
			"TN": "\\d{20}",
			"TR": "\\d{5}[\\dA-Z]{17}",
			"AE": "\\d{3}\\d{16}",
			"GB": "[A-Z]{4}\\d{14}",
			"VG": "[\\dA-Z]{4}\\d{16}"
		};

		bbanpattern = bbancountrypatterns[countrycode];
		// As new countries will start using IBAN in the
		// future, we only check if the countrycode is known.
		// This prevents false negatives, while almost all
		// false positives introduced by this, will be caught
		// by the checksum validation below anyway.
		// Strict checking should return FALSE for unknown
		// countries.
		if (typeof bbanpattern !== "undefined") {
			ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
			if (!(ibanregexp.test(iban))) {
				return false; // invalid country specific format
			}
		}

		// now check the checksum, first convert to digits
		ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
		for (i = 0; i < ibancheck.length; i++) {
			charAt = ibancheck.charAt(i);
			if (charAt !== "0") {
				leadingZeroes = false;
			}
			if (!leadingZeroes) {
				ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
			}
		}

		// calculate the result of: ibancheckdigits % 97
		for (p = 0; p < ibancheckdigits.length; p++) {
			cChar = ibancheckdigits.charAt(p);
			cOperator = "" + cRest + "" + cChar;
			cRest = cOperator % 97;
		}
		return cRest === 1;
	}, "Por favor por un IBAN correcto");

});

