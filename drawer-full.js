// Cart Drawer Full Js
$(document).ready(function(){
  $(document).on("click",".cart--drawer",function(e){
    e.preventDefault();
      $('.cart-drawer-content').toggleClass('cart-drawer-is-opne');
      $('#overlay').show();
      $('body').addClass('body-scroll-lock');
  });
  $(document).on("click",".icart-close-btn , #overlay",function(e){
    e.preventDefault();
      $('.cart-drawer-content').removeClass('cart-drawer-is-opne');
      $('#overlay').hide();
      $('body').removeClass('body-scroll-lock');
  });
});

// When Product Add To Cart
$(document).ready(function(){
  $(document).on("click",".open-cart--drawer",function(e){
    e.preventDefault(); 
      $('.loader-text').addClass("hide");
      $('.loader-loader').removeClass("hide");      
      var variant_id = $('.product-form__variants :selected').val();
      var variant_q = $('.product-form__item .product-form__input--quantity').val();
      var prod_data = {
      	id: variant_id,
      	quantity: variant_q
      }   
      $.ajax({
          type: 'POST', 
          url: '/cart/add.js',
          dataType: 'json', 
          data: prod_data,
          success: function (product){
            mincart();            
        },
        error: function(){  
          console.log("Add to cart cart drawer error");
        }
      });

      function mincart() {  
        $.ajax({
            type: 'GET', 
            url: '/',
            dataType: 'html', 
            success: function (cart_data){
                $('.cart-drawer-body').html($(cart_data).find('.cart-drawer-body').html());  
                $('.ajaxcart__price').html($(cart_data).find('.ajaxcart__price').html());
                var cart_count = $('.cart-drawer-grid').attr('cart-count');
                $('.site-header__cart-count span').html(cart_count);
                $('.cart-drawer-content').toggleClass('cart-drawer-is-opne');
                $('body').addClass('body-scroll-lock');
                $('#overlay').show();
                $('.loader-text').removeClass("hide");
                $('.loader-loader').addClass("hide");
            },
            error: function(){  
              console.log("Add to cart cart drawer error");
              $('.cart-drawer-content').toggleClass('cart-drawer-is-opne');
              $('#overlay').show();
            }
        }); 
      }
  });
});

// When Delete From Drawer
$(document).on('click','.cart-drawer-product-remove svg',function(e){
    e.preventDefault();
    $(this).closest('.cart-drawer-grid').addClass('animated-background');
    var remove_product_id = $(this).closest(".cart-drawer-grid").find('.cart-drawer-product-image').attr('product-id');
    var Item_line = $(this).closest(".cart-drawer-grid").find('.cart-drawer-product-image').attr('drawer-index'); 
    var item_data = {
        line: Item_line,
    	id: remove_product_id,
    	quantity: 0
  	}
    $.ajax({
        type: 'POST', 
        url: '/cart/change.js',
        dataType: 'json', 
        data: item_data,
        success: function (item){
          mincart();
      },
      error: function(){  
        console.log("error");
      }
    }); 
});

// When Update a Quantity From Drawer
$(document).on('click','.cart-drawer-pr-qty .qtybox .btnqty',function(){
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
});

$(document).on('click','.cart-drawer-pr-qty .qtybox .btnqty',function(e){
  e.preventDefault();
  $(this).closest('.cart-drawer-grid').addClass('animated-background');
  var update_product_id = $(this).closest(".cart-drawer-grid").find('.cart-drawer-product-image').attr('product-id');
  var Item_line = $(this).closest(".cart-drawer-grid").find('.cart-drawer-product-image').attr('drawer-index');
  var Item_qty = $(this).closest('.cart-drawer-grid').find('.quantity-input').val();
  var item_data = {
      line: Item_line,
      id: update_product_id,
      quantity: Item_qty
  }
 $.ajax({
      type: 'POST', 
      url: '/cart/change.js',
      dataType: 'json', 
      data: item_data,
      success: function (item){
        mincart();
    },
    error: function(){  
      console.log("error");
    }
    });
});

function mincart() {  
  $.ajax({
      type: 'GET', 
      url: '/',
      dataType: 'html', 
      success: function (cart_data){
          $(this).closest('.cart-drawer-grid').find('.determinate').css('width:','100%');
          $('.cart-drawer-body').html($(cart_data).find('.cart-drawer-body').html());  
          $('.ajaxcart__price').html($(cart_data).find('.ajaxcart__price').html()); 
          var cart_count = $('.cart-drawer-grid').attr('cart-count');
          $('.site-header__cart-count span').html(cart_count);
          $('.cart-drawer-grid').removeClass('animated-background');
          // $('.cart-drawer-up-sell').slick('refresh');
          // $('.cart-drawer-up-sell')[0].slick.refresh();
          $('.cart-drawer-up-sell').slick({
            dots: false,
            infinite: true,
            arrows: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow:'<span class="priv-arrow"><i class="fa fa-chevron-left"></i></span>',
            nextArrow:'<span class="next-arrow"><i class="fa fa-chevron-right"></i></span>',
            responsive: [
            
            ]
          });
      },
      error: function(){  
        console.log("Add to cart cart drawer error");
      }
  }); 
}
