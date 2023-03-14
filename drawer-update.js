


// Add to cart open drawer

$(document).on('click','.cart-info',function(a){
  a.preventDefault();
  var b = $(this);
  var c=$(this).closest('form').find('.first-input').val();
  var prod_data = {
    id: c,
    quantity: 1
  }
  
  $.ajax({
    type: 'POST', 
    url: '/cart/add.js',
    dataType: 'json', 
    data: prod_data,
    success: function (product){
      document.dispatchEvent(new CustomEvent('ajaxProduct:added', {
        detail: {
          product: product,
          addToCartBtn: this
        }
      }));

      // update cart drawer
      $('body').trigger('added.ajaxProduct', this.$addToCart);
      console.log(product);
      
      //update quentity in header
      jQuery.getJSON('/cart.js', function(cart) {
        $('.cart__item__count').html(cart.item_count);
        console.log(cart)
      });
    },
    error: function(){   
      console.log("error");
    }
  });
});



// Cart Drawer Update 

$(document).on('click','.cart-info',function(a){
  a.preventDefault();

  //For loader
  $(this).addClass('btn--loading');
  let loaded =  $(this).addClass('btn--loading');
      
  
  var variant_id=$(this).closest('form').find('.first-input').val();
  var product_data = {
    id: variant_id,
    quantity: 1
  }
  $.ajax({
    type: 'POST', 
    url: '/cart/add.js',
    dataType: 'json', 
    data: product_data,
    success: function (product){
      
      //For Loader End
      $(loaded).removeClass('btn--loading');
      
      document.dispatchEvent(new CustomEvent('ajaxProduct:added', {
        detail: {
          product: product,
          addToCartBtn: this
        }
      }));
      $('body').trigger('added.ajaxProduct', this.$addToCart);
//       console.log(product);
     
        
      jQuery.getJSON('/cart.js', function(cart) {
        $('.cart__item__count').html(cart.item_count);
//         console.log(cart);
      });
      
      
        
    },
    error: function(){   
      console.log("error");
    }
  });
});





