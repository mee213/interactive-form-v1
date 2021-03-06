const main = () => {
    
    // default colors of border of input fields with no errors
    // used to reset border colors after errors (red-borders) are resolved
    const inputBorderNoFocus = '#c1deeb';
    const inputBorderWithFocus = '#5e97b0';

    // RESET ON PAGE LOAD

    $('#name').focus();
    $('#other-title').addClass('is-hidden');
    $('#design').prop('selectedIndex', 0);
    $("#color option").each(function(){
        $(this).removeClass('is-hidden');
    });
    $('#color').prop('selectedIndex', 0);
    $('.activities input[type="checkbox"]').prop('checked', false);
    $('.activities').append('<p class="total-due"></p>');
    $('#payment option[value="select_method"]').prop('disabled', true);
    $('#payment option[value="credit card"]').prop('selected', true);
    $('div.paypal').addClass('is-hidden');
    $('div.bitcoin').addClass('is-hidden');
    $('div#colors-js-puns').addClass('is-hidden');
    $('#cvv').parent().after('<p class="cc-error"></p>');

    // "JOB ROLE" SECTION

    $('#title').change(function() {
        if ($(this).val() === 'other') {
            $('#other-title').removeClass('is-hidden');
        } else {
            $('#other-title').addClass('is-hidden');
        }
    });

    // "T-SHIRT INFO" SECTION

    $('#design').change(function() {

        // selectedDesign = 'js puns' OR 'heart js'
        let selectedDesign = $(this).val();

        // extra credit: unhides color selections when a design is chosen
        if (selectedDesign === 'js puns' || selectedDesign === 'heart js') {
            $('div#colors-js-puns').removeClass('is-hidden');
        }

        // extra credit: re-hides color selections if no design chosen
        if (selectedDesign !== 'js puns' && selectedDesign !== 'heart js') {
            $('div#colors-js-puns').addClass('is-hidden');
        }

        $("#color option").each(function(i){
            if ($(this).val() === 'cornflowerblue' || $(this).val() === 'darkslategrey' || $(this).val() === 'gold') {
                if (selectedDesign === 'js puns') {
                    $(this).removeClass('is-hidden');
                    if ($(this).val() === 'cornflowerblue') {
                        $("#color").val($(this).val());
                    }
                } else if (selectedDesign === 'heart js') {
                    $(this).addClass('is-hidden');
                } else {
                    $(this).removeClass('is-hidden');
                    $('#color').prop('selectedIndex', 0);
                }
            }
            if ($(this).val() === 'tomato' || $(this).val() === 'steelblue' || $(this).val() === 'dimgrey') {
                if (selectedDesign === 'js puns') {
                    $(this).addClass('is-hidden');
                } else if (selectedDesign === 'heart js') {
                    $(this).removeClass('is-hidden');
                    if ($(this).val() === 'tomato') {
                        $("#color").val($(this).val());
                    }
                } else {
                    $(this).removeClass('is-hidden');
                    $('#color').prop('selectedIndex', 0);
                }
            }
        }); 
    });

    // "REGISTER FOR ACTIVITIES" SECTION

    const $all = $('input[name="all"]');
    const $jsFrameworks = $('input[name="js-frameworks"]');
    const $jsLibs = $('input[name="js-libs"]');
    const $express = $('input[name="express"]');
    const $node = $('input[name="node"]');
    const $buildTools = $('input[name="build-tools"]');
    const $npm = $('input[name="npm"]');
    const $totalDue = $('.total-due');
    let totalDue = 0;

    $all.change(function() {
        if (this.checked) {
            totalDue += 200;
        } else {
            totalDue -= 200;
        }
        $totalDue.text(`Total: $${totalDue}`);
    })

    $jsFrameworks.change(function() {
        if (this.checked) {
            $express.prop('disabled', true);
            $express.parent().css('color', 'gray');
            totalDue += 100;
        } else {
            $express.prop('disabled', false);
            $express.parent().css('color', 'black');
            totalDue -= 100;
        } 
        $totalDue.text(`Total: $${totalDue}`);
    });

    $express.change(function() {
        if (this.checked) {
            $jsFrameworks.prop('disabled', true);
            $jsFrameworks.parent().css('color', 'gray');
            totalDue += 100;
        } else {
            $jsFrameworks.prop('disabled', false);
            $jsFrameworks.parent().css('color', 'black');
            totalDue -= 100;
        } 
        $totalDue.text(`Total: $${totalDue}`);
    });

    $jsLibs.change(function() {
        if (this.checked) {
            $node.prop('disabled', true);
            $node.parent().css('color', 'gray');
            totalDue += 100;
        } else {
            $node.prop('disabled', false);
            $node.parent().css('color', 'black');
            totalDue -= 100;
        } 
        $totalDue.text(`Total: $${totalDue}`);
    });

    $node.change(function() {
        if (this.checked) {
            $jsLibs.prop('disabled', true);
            $jsLibs.parent().css('color', 'gray');
            totalDue += 100;
        } else {
            $jsLibs.prop('disabled', false);
            $jsLibs.parent().css('color', 'black');
            totalDue -= 100;
        } 
        $totalDue.text(`Total: $${totalDue}`);
    });

    $buildTools.change(function() {
        this.checked ? totalDue += 100 : totalDue -= 100;
        $totalDue.text(`Total: $${totalDue}`);
    });

    $npm.change(function() {
        this.checked ? totalDue += 100 : totalDue -= 100;
        $totalDue.text(`Total: $${totalDue}`);
    });

    // "PAYMENT INFO" SECTION

    $('#payment').change(function() {
        
        let selectedPayment = $(this).val();
        const $creditCardDiv = $('div.credit-card');
        const $paypalDiv = $('div.paypal');
        const $bitcoinDiv = $('div.bitcoin');

        if (selectedPayment === "credit card") {
            $creditCardDiv.removeClass('is-hidden');
            $paypalDiv.addClass('is-hidden');
            $bitcoinDiv.addClass('is-hidden');
        }

        if (selectedPayment === "paypal") {
            $paypalDiv.removeClass('is-hidden');
            $creditCardDiv.addClass('is-hidden');
            $bitcoinDiv.addClass('is-hidden');
        }

        if (selectedPayment === "bitcoin") {
            $bitcoinDiv.removeClass('is-hidden');
            $paypalDiv.addClass('is-hidden');
            $creditCardDiv.addClass('is-hidden');
        }
    });

    $('form').submit(function(event) {
        if ($('#name').val() === '') {
            event.preventDefault();
            // do not duplicate the error message if the form is submitted a second time with same invalid input
            if (!$('.name-error').length) {
                $('#name').before('<p class="name-error">Please add a name.</p>');
            }
            $('#name').css('border-color', 'red');
        }

        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9]{2,61})$/i).test($('#mail').val())) {
            event.preventDefault();
            // do not duplicate the error message if the form is submitted a second time with same invalid input
            if (!$('.mail-error').length) {
                $('#mail').before('<p class="mail-error">Please add a valid email address.</p>');
            }
            $('#mail').css('border-color', 'red');
        }

        if ( $('.activities input[type="checkbox"]:checked').length === 0 ) {
            event.preventDefault();
            // do not duplicate the error message if the form is submitted a second time with same invalid input
            if (!$('.act-error').length) {
                $('.activities legend').after('<p class="act-error">Please select at least one activity.</p>');
            }
            
        }

        // if the credit card payment option is the one chosen on form submit
        if ($('#payment').val() === "credit card") {

            // don't submit and display error if cc number not valid
            if (!(/^[0-9]{13,16}$/).test($('#cc-num').val())) {
                event.preventDefault();
                // extra credit: conditional error message depending on type of CC number
                if ($('#cc-num').val()) { // has a value but doesn't validate
                    // custom error message if cc input field is has content but doesn't validate
                    $('.cc-error').text('Please enter a valid credit card number between 13-16 digits, numbers only.');
                } else { // field is empty, no value at all
                    // custom error message if cc input field is completely empty
                    $('.cc-error').text('Please enter a credit card number.');
                }
                $('#cc-num').css('border-color', 'red');
            }
    
            // don't submit and display error if zip code not valid
            if (!(/^[0-9]{5}$/).test($('#zip').val())) {
                event.preventDefault();
                // do not duplicate the error message if the form is submitted a second time with same invalid input
                if (!$('.zip-error').length) {
                    $('label[for="exp-month"]').before('<p class="zip-error">Please enter a 5-digit zip code.</p>');
                }
                $('#zip').css('border-color', 'red');
            }
    
            // don't submit and display error if CVV code not valid
            if (!(/^[0-9]{3}$/).test($('#cvv').val())) {
                event.preventDefault();
                // do not duplicate the error message if the form is submitted a second time with same invalid input
                if (!$('.cvv-error').length) {
                    $('label[for="exp-month"]').before('<p class="cvv-error">Please enter a 3-digit CVV code.</p>');
                }
                $('#cvv').css('border-color', 'red');
            }
        }
    });

    $('#name').change(function() {
        //  if there was a previous error message and the new input passes validation
        if ($('#name').val() && $('.name-error')) {
            $('.name-error').remove();
            // make the border colors behave as they did before the validation error occured
            $('#name').css('border-color', inputBorderNoFocus);
            $('#name').focus(function() {
                $('#name').css('border-color', inputBorderWithFocus);
            });
            $('#name').blur(function() {
                $('#name').css('border-color', inputBorderNoFocus);
            });
        }
    });

    $('#mail').on('change keyup blur', function() {

        //  if the new input passes validation
        if ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9]{2,61})$/i).test($('#mail').val())) {
            //  if there was a previous error message
            if ($('.mail-error')) {
                $('.mail-error').remove();
                // make the border colors behave as they did before the validation error occured
                $('#mail').css('border-color', inputBorderNoFocus);
                $('#mail').focus(function() {
                    $('#mail').css('border-color', inputBorderWithFocus);
                });
                $('#mail').blur(function() {
                    $('#mail').css('border-color', inputBorderNoFocus);
                });
            }    
        } else { // the new input doesn't pass validation
            // do not duplicate the error message if it already exists
            if (!$('.mail-error').length) {
                $('#mail').before('<p class="mail-error">Please add a valid email address.</p>');
            }
            $('#mail').css('border-color', 'red');
        }
    });

    $('.activities input[type="checkbox"]').change(function() {
        if ( $('.activities input[type="checkbox"]:checked').length > 0 ) {
            $('.act-error').remove();
        }
    });

    $('#cc-num').change(function() {
        
        //  if there was a previous error message 
        if ($('.cc-error').text().length) {
            
            // if the new input passes validation
            if ((/^[0-9]{13,16}$/).test($('#cc-num').val())) {
                $('.cc-error').empty();
                // make the border colors behave as they did before the validation error occured
                $('#cc-num').css('border-color', inputBorderNoFocus);
                $('#cc-num').focus(function() {
                    $('#cc-num').css('border-color', inputBorderWithFocus);
                });
                $('#cc-num').blur(function() {
                    $('#cc-num').css('border-color', inputBorderNoFocus);
                });
            } else if ($('#cc-num').val()) { // has a value but doesn't validate
                    $('.cc-error').text('Please enter a valid credit card number between 13-16 digits, numbers only.');
            } else { // field is empty, no value at all
                    $('.cc-error').text('Please enter a credit card number.');
            }
        }
            
    });

    $('#zip').change(function() {
        //  if there was a previous error message and the new input passes validation
        if ((/^[0-9]{5}$/).test($('#zip').val()) && $('.zip-error')) {
            $('.zip-error').remove();
            // make the border colors behave as they did before the validation error occured
            $('#zip').css('border-color', inputBorderNoFocus);
            $('#zip').focus(function() {
                $('#zip').css('border-color', inputBorderWithFocus);
            });
            $('#zip').blur(function() {
                $('#zip').css('border-color', inputBorderNoFocus);
            });
        }
    });

    $('#cvv').change(function() {
        //  if there was a previous error message and the new input passes validation
        if ((/^[0-9]{3}$/).test($('#cvv').val()) && $('.cvv-error')) {
            $('.cvv-error').remove();
            // make the border colors behave as they did before the validation error occured
            $('#cvv').css('border-color', inputBorderNoFocus);
            $('#cvv').focus(function() {
                $('#cvv').css('border-color', inputBorderWithFocus);
            });
            $('#cvv').blur(function() {
                $('#cvv').css('border-color', inputBorderNoFocus);
            });
        }
    });

}

$(main);