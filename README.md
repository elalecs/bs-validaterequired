Bootstrap 3 Form Validation Plugin
===================

Its a plugin inspired into http://posabsolute.github.io/jQuery-Validation-Engine/ but using Bootstrap 3 tooltips and friendly with Select2.


## Usage

First include jQuery and Bootstrap:

	<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" type="text/css" rel="stylesheet" media="all">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
	
Then include this plugin:

	<link href="plugins/bs_validaterequired/bs_validaterequired.css" type="text/css" rel="stylesheet" media="all">
	<script src="plugins/bs_validaterequired/bs_validaterequired.js"></script>
	
Mark your items to validate:

	<form>
		<input type="text" name="name" data-validate="required">
		<input type="email" name="name" data-validate="required">
		<input type="tel" name="phone" data-validate="required" data-validate-params="minsize:6,maxsize:12">
	</form>

Then call the validator using onSubmit:

	$(function() {
		$("form").on('submit', function(e) {
			if (!$("form").validateRequired()) {
				return false;
			}

			return true;
		});
	});
	
## Demo

You can play with the demo in here http://jsfiddle.net/elalecs/Z5Bkj/1/
