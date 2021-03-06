/**
 * Form validation engine using tooltip from Bootstrap 3
 * inspired in Inline Form Validation Engine
 * Licensed under the MIT License
 *
 * @author Alecs Galindo, twitter.com/elalecs
 * @copyright Tecnologías Web de México S.A. de C.V.
 *
 */
(function($) {
	var regexps = {
		email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
	};

	$.fn.validateRequired = function () {
		var form = $(this);
		if(!form[0]) return form;  // stop here if the form does not exist
		var errors = false;

		form.find('input[data-validate]:visible,textarea[data-validate]:visible,select[data-validate]:visible').each(function() {
			field = $(this);

			var validate = field.data('validate');
			var params_string = field.data('validate-params');
			var params = {};
			var type = field.prop('type');
			var val = field.val();

			if (typeof(params_string) !== 'undefined') {
				var params_tokens = params_string.split(',');
				for (var i in params_tokens) {
					var param = params_tokens[i].split(':');
					params[param[0]] = param[1];
				}
			}

			if (validate === "required") {
				if (type === "email") {
					if (!regexps.email.test(val)) {
						errors = field.validateNotify('Correo inválido');
					}
				}
				if (type === "checkbox" && !field.is(':checked')) {
					errors = field.validateNotify('Campo requerido');
				}
				if (typeof(params.minsize) !== 'undefined') {
					if (val.length < parseInt(params.minsize)) {
						errors = field.validateNotify('El mínimo de caracteres es de ' + params.minsize);
					}
				}
				if (typeof(params.maxsize) !== 'undefined') {
					if (val.length > parseInt(params.maxsize)) {
						errors = field.validateNotify('El máximo de caracteres es de ' + params.maxsize);
					}
				}
				if (typeof(params.equal) !== 'undefined') {
					if (val != form.find(params.equal).val()) {
						errors = field.validateNotify('Los campos no son iguales');
					}
				}
				if(val === null || val.length === 0) {
					errors = field.validateNotify('Campo requerido');
				}
			}
		});

		return !errors;
	};

	$.fn.validateNotify = function(message) {
		field = $(this);

		if (field.hasClass('select2-offscreen')) {
			field = field.parent().find(".select2-default");
		}
		field.tooltip({
			title: message,
			placement: 'bottom',
			trigger: 'manual'
		});
		field.on('shown.bs.tooltip', function() {
			$(this).parent().find('.tooltip').addClass('validateRequired');
		});
		field.tooltip('show');

		field.on('focus', function() {
			$(this).tooltip('destroy');
		})

		return true;
	};
})(jQuery)