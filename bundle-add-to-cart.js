
$(document).on("change",".check-box",function(e){
      if ($(this).prop('checked')==true){ 
        var total_price = [];
         $('.selected-product-grid-flex').each(function(){
           if($(this).find('.check-box').prop("checked") == true){
           var pr_price = $(this).find('.selected-product-prr').attr('data-pr');
             pr_price = parseInt(pr_price);
             total_price.push(pr_price);
           }
        });
        sum = 0;
        $.each(total_price,function(){
          sum+=parseFloat(this) || 0;
        });
        $('.total-amount').html(Shopify.formatMoney(sum, '{{amount}}'));
      }else{
        $('.total-amount').html('0');
      }
});


  
$(document).on("click",".product-item--add-to-cart",function(e){
    e.preventDefault();

    var main_id = $('.main_product__id').val();
      
    $.ajax({
          type: 'GET', 
          url: '/cart',
          dataType: 'html', 
          success: function (cart_data){         
            let new_cart = cart_data;
            let my_item = $(new_cart).find('.find-my-product').attr('data-my-prod'); 

            console.log(my_item)
            console.log(main_id)
              if(my_item == main_id)
              {
                      let checkd_product = [];
                      $('.selected-product-grid-flex').each(function(){
                        if($(this).find('.check-box').prop("checked") == true){
                           var variant_id = $(this).find('.variants__id').val();
                           var variant_quantity = $(this).find('.variants__quantity').val();
                           // var main_id = $(this).find('.main_product__id').val();
                            var prod_data = {
                              id: parseInt(variant_id),
                              quantity: parseInt(variant_quantity)
                           }
                              checkd_product.push(prod_data);
                          
                          }
                      }); 
                    console.log(checkd_product)
                     if(jQuery.isEmptyObject( checkd_product )){
                       $('.please-select').text('Your main product alredy in cart, Please Select one Product....');
                     }else{
                     
                      let formData = {items:checkd_product};
                        fetch(window.Shopify.routes.root + 'cart/add.js', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(formData)
                        })
                        .then(response => {
                          window.location.href = "/cart";
                          return response.json(); 
                        })
                        .catch((error) => {
                          console.error('Error:', error);
                        });
                       }
              }else{
                    var main_prod = {
                      id: parseInt(main_id),
                      quantity: parseInt(1)
                    }
                  
                    let checkd_product = [main_prod];
                    $('.selected-product-grid-flex').each(function(){
                      if($(this).find('.check-box').prop("checked") == true){
                         var variant_id = $(this).find('.variants__id').val();
                         var variant_quantity = $(this).find('.variants__quantity').val();
                         // var main_id = $(this).find('.main_product__id').val();
                          var prod_data = {
                            id: parseInt(variant_id),
                            quantity: parseInt(variant_quantity)
                         }
                            checkd_product.push(prod_data);
                        }
                    }); 
                  console.log(checkd_product)
                   if(jQuery.isEmptyObject( checkd_product )){
                     $('.please-select').text('Your main product alredy in cart, Please Select one Product....');
                   }else{
                   
                    let formData = {items:checkd_product};
                      fetch(window.Shopify.routes.root + 'cart/add.js', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                      })
                      .then(response => {
                        window.location.href = "/cart";
                        return response.json(); 
                      })
                      .catch((error) => {
                        console.error('Error:', error);
                      });
                     }
              }
        },
        error: function(){  
          console.log("error");
        }
      }); 

  
   
  //     var main_prod = {
  //             id: parseInt(main_id),
  //             quantity: parseInt(1)
  //   }
  
  //   let checkd_product = [main_prod];
  //   $('.selected-product-grid-flex').each(function(){
  //     if($(this).find('.check-box').prop("checked") == true){
  //        var variant_id = $(this).find('.variants__id').val();
  //        var variant_quantity = $(this).find('.variants__quantity').val();
  //        // var main_id = $(this).find('.main_product__id').val();
  //         var prod_data = {
  //           id: parseInt(variant_id),
  //           quantity: parseInt(variant_quantity)
  //        }
  //           checkd_product.push(prod_data);
        
  //       }
  //   }); 
  // console.log(checkd_product)
  //  if(jQuery.isEmptyObject( checkd_product )){
  //    $('.please-select').text('Please Select one Product....');
  //  }else{
   
  //   let formData = {items:checkd_product};
  //     fetch(window.Shopify.routes.root + 'cart/add.js', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     })
  //     .then(response => {
  //       window.location.href = "/cart";
  //       return response.json(); 
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  //    }
});
