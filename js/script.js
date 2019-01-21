const main = () => {
    
    // RESET ON PAGE LOAD

    $('#name').focus();
    $('#other-title').addClass('is-hidden');
    $('#design').prop('selectedIndex', 0);
    $("#color option").each(function(i){
        $(this).removeClass('is-hidden');
    });
    $('#color').prop('selectedIndex', 0);
    $('.activities input[type="checkbox"]').prop('checked', false);
    $('.activities').append('<p class="total-due"></p>');

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

}

$(main);