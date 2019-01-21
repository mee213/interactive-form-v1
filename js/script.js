const main = () => {
    
    $('#name').focus();
    $('#other-title').addClass('is-hidden');
    $('#design').prop('selectedIndex', 0);
    $("#color option").each(function(i){
        $(this).removeClass('is-hidden');
    });
    $('#color').prop('selectedIndex', 0);

    $('#title').change(function() {
        if ($(this).val() === 'other') {
            $('#other-title').removeClass('is-hidden');
        } else {
            $('#other-title').addClass('is-hidden');
        }
    });

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

}

$(main);