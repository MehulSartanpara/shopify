// quantity Box Cart Page

$(document).on('click','.cart-product-title-qty-box .qtybox .btnqty',function(){
 // $(this).closest('form').submit();
  
  var qty = parseInt($(this).parent('.qtybox').find('.quantity-input').val());
  if($(this).hasClass('qtyplus')) {
    qty++;
  }else {
    if(qty > 0) {
      qty--;	     
    }
  }
  qty = (isNaN(qty))?1:qty;
  $(this).parent('.qtybox').find('.quantity-input').val(qty);
 //  $(this).closest('.qtybox').find('.quantity-input').val(qty);
 // $(this).closest('.cart__row--table').find('.cart__product-qty').trigger('change');

});

$(document).on('click','.cart-product-title-qty-box .btnqty',function(e){
  e.preventDefault();
  var Item_line = $(this).closest('.cart--main--product--list').attr('data-item-id-2');
  var Item_id = $(this).closest('.cart--main--product--list').attr('data-item-id');
  var Item_qty = $(this).closest('.cart--main--product--list').find('.quantity-selector').val();
  console.log(Item_qty);
  var item_data = {
      line: Item_line,
    	id: Item_id,
    	quantity: Item_qty
  	}
 $.ajax({
      type: 'POST', 
      url: '/cart/change.js',
      dataType: 'json', 
      data: item_data,
      success: function (item){
        console.log('success');
        mincart();
    },
    error: function(){  
      // when error
      console.log("error");
    }
    });
  
});

function mincart() {  
  $.ajax({
        type: 'GET', 
        url: '/cart',
        dataType: 'html', 
        success: function (updated_cart){
          console.log('Call Done');            
          let new_html_cart = updated_cart;
          // console.log(new_html_cart);         
          let new_item = $(new_html_cart).find('.cart-product-content').html(); 
          $('.cart-product-content').html(new_item);         
          // console.log(new_item);          
      },
      error: function(){  
        // when error
        console.log("error");
      }
    }); 
}










// Remove Product
$(document).on('click','.cart-product-remove-link a',function(e){
  e.preventDefault();

  // $(this).closest('.cart--main--product--list').addClass('loader-effect');
  $(this).closest('.cart--main--product--list').find('.loader---container .load').addClass('loader');
  var Item_line = $(this).closest('.cart--main--product--list').attr('data-item-id-2');
  var Item_id = $(this).closest('.cart--main--product--list').attr('data-item-id');
  
  var item_data = {
      line: Item_line,
      id: Item_id,
      quantity: 0
    }
 $.ajax({
      type: 'POST', 
      url: '/cart/change.js',
      dataType: 'json', 
      data: item_data,
      success: function (item){
        // console.log('success');
        mincart();
    },
    error: function(){  
      // when error
      console.log("error");
    }
    });
  
});