

          let masterSelect ='<select id="product-select" name="id" class="master_select"></select>';
          $('.masterSelect').append(masterSelect);
         
           $(variants).each(function(i, option) {
             $('.masterSelect select').append('<option value="'+option.id+'" data-option-val="' + option.title + '">'+option.title+' </option>')
             $('.main-id').val(option.id);   
           });

          $(document).on('change','#product-select',function(){
              let val_new = $('#product-select').val();
              $('.main-id').val(val_new);
          });

          $(options).each(function(i, option) {
                var opt = option.name;
                var selectClass = '.option.' + opt.toLowerCase();
                $('.main--product---varients').append('<div class="options__text__val option-selection-' + opt.toLowerCase() + '"><span class="options__text option-' + i + ' option ' + opt.toLowerCase() + '">' + opt + '<br></span></div>');
                $(option.values).each(function(i,value) {
                    $('.option.' + opt.toLowerCase()).append('<input class="qv-radio-input" type="radio"  value="' + value + '" id="' + value + '" name=" '+ opt + ' "><label data-veriant-id="' + value + '" for="' + value + '" class="qv-radio-hide">' + value + '</label>');
                }); 
            });           

           $('.options__text__val').each(function(i,elem){
            $(this).find('input').first().trigger('click');
             $('#product-select').trigger('change')
           });
          
         $(document).on('click','.options__text__val label',function(){
            let variantTitle = [];
            let __this = $(this);
            setTimeout(function(){
              $('.options__text__val').each(function(){
                let opTitle = $(this).find(':checked').val();
                variantTitle.push(opTitle);
              }) 
                let finalString = variantTitle.join(' / ');
               $('#product-select option[data-option-val="'+finalString+'"]').prop('selected',true);
               $('#product-select').trigger('change')
             },100)
         

          });
         

// In quick view you can use this code to convert verint dropdown to button ok 