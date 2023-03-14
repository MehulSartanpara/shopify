<!-- cart drawer -->
<div id="CartDrawer" class="drawer drawer--right">
 <form id="CartDrawerForm" action="/cart" method="post" novalidate class="drawer__contents">
   <div class="drawer__fixed-header">
     <div class="drawer__header">
       <div class="h2 drawer__title">
         
         Einkaufswagen({{cart.item_count}})</div>
       <div class="drawer__close-button">
         <span>&#x2715;</span>
       </div>
     </div>
   </div>
   {% if cart.item_count > 0 %}
   <div class="drawer__inner">
     <div class="drawer__scrollable">
       <div class="cart__items">
        
          {% for item in cart.items %}
         {%- assign hasDiscount = false -%}
         {%- if item.original_price != item.final_price -%}
         {%- assign hasDiscount = true -%}
         {%- endif -%}
          <div class="cart__item" data-variant-id="{{item.variant_id}}">
         <div class="cart__image">
           <a href="{{ item.url | within: collections.all }}">
             <img src="{{ item | img_url: '100x' }}" alt="{{ item.title | escape }}">
           </a>
         </div>
         <div class="cart__item-details">
           <div class="cart__item-title">
             <a href="{{ item.url | within: collections.all }}" class="cart__item-name">{{ item.product.title | escape }}</a>
           </div>
           {% if item.product.variants.size > 1 %}
            <span class="variant_title">{{ item.variant.title }}</span>
            {% endif %}
           <div class="item-propertise">
             {% unless item.properties == empty %}
             {% for property in item.properties %}
               {% unless property.last == blank %}
             <p>{{ property.first }}:

             {% if property.last contains '/uploads/' %}
             <a href="{{ property.last }}">{{ property.last | split: '/' | last }}</a>
             {% else %}
             {{ property.last }}
             {% endif %}
             </p>
             {% endunless %}
             {% endfor %}
             {% endunless %}
           </div>
           <div class="cart__item-sub">
             <div class="qtybox" >
               <span class="btnqty qtyminus icon icon-minus" data-line="{{forloop.index}}">&#8212;</span>
               <input type="text"name="updates[]" id="updates_{{ item.key }}" value="{{ item.quantity }}" min="0" class="quantity-selector quantity-input" readonly="">
               <span class="btnqty qtyplus icon icon-plus" data-line="{{forloop.index}}">&#x2B;</span>
             </div>
             {% if hasDiscount == false %}
             <div class="cart__item-price-col">{{ item.original_line_price | money }}</div>
             {% endif %}
             {% if hasDiscount %}
             <div class="cart__item-price-col">{{ item.original_price | money }}</div>
             <div class="order-discount">{{ item.final_price | money }}</div>
             {% endif %}
           </div>
           <div class="remeve_item" data-line={{forloop.index}}>
             <a href="/cart/change?line={{ forloop.index }}&amp;quantity=0" class="trash-link">
        <span>&#x2715;</span>
             </a>
           </div>
         </div>
                     </div>
         {% endfor %}

       </div>
       {% if section.settings.message__text != blank %}
       <div class="cart_notice_message_wrapper">
         <div class="cart_notice_message">
           {{section.settings.message__text}}
         </div>
       </div>
       {% endif %}
     </div>
     <div class="drawer__footer">
       <div class="cart-subtotal">
         <span class="subtotal-text">Zwischensumme</span>
         <span class="subtotal-price">
          {{ cart.total_price | money }}
         </span>
       </div>
       <div class="drawer_fotter-wrapper">
         {% if section.settings.tax_included_notice != blank %}
         <p>{{section.settings.tax_included_notice}}</p>
         {% endif %}
         <button type="submit" class="hover-grow" name="checkout">Jetzt sicher zur Kasse</button>
       </div>
     </div>
   </div>
   {% else %}
   <div class="drawer__cart-empty">
     Ihr Einkaufswagen ist im Moment leer.
   </div>
   {% endif %}
  </form>
</div>
<div class="drawer_overlay">
</div>
<!-- cart drawer end -->

{% schema %}
  {
    "name": "Cart Drawer",
    "settings": [
      {
        "type":"text",
        "id":"message__text",
        "label":"Message Notice"
      },
      {
        "type":"text",
        "id":"tax_included_notice",
        "label":"Text included Notice"
      }
    ]
  }
{% endschema %}


<style>
/* cart drawer css */
  
.drawer_overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0,0,0,0.6);
  opacity: 0;
  height: 0;
  transition: all ease 0.45s;
  z-index: 99;
}
body.overflow-hidden {
  overflow: hidden;
}
.drawer {
  position: fixed;
  overflow: hidden;
  top: 0;
  bottom: 0;
  max-width: 95%;
  z-index: 999;
  color: #000;
  background:#fff;
  box-shadow: 0 0 150px rgb(0,0,0,0.10);
  transition: all ease 0.45s;
}
.drawer--right {
  width: 400px;
  right: -400px;
}
.drawer__contents {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.drawer__header {
  display: flex;
  height: 70px;
  width: 100%;
  padding: 11.53846px 0;
  margin-bottom: 0;
  border-bottom: 1px solid;
  border-bottom-color: #e8e8e1;
  padding-left: 30px;
  padding-right: 30px;
  align-items:center;
  position:relative;
}
.drawer--right.drawer--is-open {
  transform: translateX(-400px);
  transition: all ease 0.3s;
}
#CartDrawer .remeve_item a.trash-link span {
  font-size: 16px;
  font-weight: 700;
}
.drawer_overlay.drawer--is-open {
  height:auto;
  opacity: 1;
  transition: all ease 0.3s;
}
.drawer__fixed-header{
  height: 80px;
}
.drawer__title {
  width: 100%;
}
.h2.drawer__title {
  font-size: 22px;
  margin-bottom: 0;
}
.cart_drawer_icon {
  padding-right: 10px;
}
.cart_drawer_icon svg {
  fill: #000;
}
.drawer__close {
  width: 1%;
  text-align: center;
}
.drawer__close-button span {
  cursor:pointer;
  font-size: 20px;
  font-weight: 700;
}
.drawer__close-button {
  position: absolute;
  top: 50%;
  right: 28px;
  transform: translate(0, -50%);
  padding: 10px;
}
.drawer__inner, .drawer__scrollable {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}
.drawer__scrollable {
  padding-top: 20px;
  padding-top: 30px;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
#CartDrawer .cart__item:first-child {
  padding-top: 10px;
  border-top: none;
}
#CartDrawer .cart__item {
  display: flex;
  margin-bottom: 20px;
  padding-top: 20px;
  border-top: 1px solid #e8e8e1;
  padding-left: 20px;
  padding-right: 20px;
}
#CartDrawer .cart-subtotal {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
#CartDrawer .cart-subtotal span {
  font-size: 16px;
  font-weight: 500;
}
#CartDrawer .cart__item:first-child {
  padding-top: 10px;
}
.drawer .cart__image {
  flex: 0 0 100px;
}
#CartDrawer .cart__image {
  margin-right: 22px;
}
#CartDrawer .cart__item-details {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  position:relative;
}
#CartDrawer .remeve_item {
  position: absolute;
  right: 0;
  top: 0;
  width: 25px;
}
#CartDrawer .cart__item-details span.variant_title {
  display: block;
  width: 100%;
  font-size: 13px;
  font-weight: 500;
}
#CartDrawer .cart__item-name {
  display: block;
  font-size: 15px;
  margin-bottom: 8px;
  text-decoration: none;
  color: #000;
  font-weight: 500;
}
#CartDrawer .cart__item-title {
  flex: 1 1 100%;
  padding-right: 24px;
}
#CartDrawer .cart__item-sub {
  flex: 1 1 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
}
#CartDrawer .cart__item-sub .cart__item-price-col {
  font-size: 15px;
  font-weight: 500;
}
#CartDrawer .cart_drawer_icon svg {
  fill: #fff;
  width: 20px;
  height: 20px;
}
.drawer__scrollable {
  padding-top: 20px;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

#CartDrawer .qtybox {
  display: flex;
  align-items: center;
  border: 1px solid #f2f2f2;
}
#CartDrawer .qtybox .btnqty {
  width: 35px;
  height: 35px;
  display: inline-block;
  text-align: center;
  justify-content: center;
  line-height: 35px;
  cursor:pointer;
}
#CartDrawer .qtybox input {
  width: 35px;
  text-align: center;
  background: none;
  border: none;
  color: #000;
  padding: 0;
  font-weight: bold;
  border-left: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
}
#CartDrawer .cart_notice_message_wrapper {
  padding: 16px;
  border-bottom: 1px solid #4c10e1;
}
#CartDrawer .cart_notice_message {
  background-color: #2b01a9;
  font-size: 16px;
  text-align: center;
  border-radius: 35px;
  padding: 20px 20px;
}
#CartDrawer .drawer_fotter-wrapper button {
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  border: none;
  color: #ffffff;
  font-size: 19px;
  font-weight: 400;
  background-color: #a7755f;
  padding: 10px 10px;
}
#CartDrawer .icon-checkout-bag {
  margin-right: 5px;
}
#CartDrawer .icon-checkout-bag svg {
  width: 22px;
  height: 22px;
  fill: #000;
}
.drawer__footer {
  padding: 15px 20px;
  background-color: #fff;
  border-top: 1px solid #e8e8e1;
}
.drawer_fotter-wrapper p {
    text-align: left;
    font-weight: 500;
    margin-top: 0;
    font-size: 13px;
}
#CartDrawer .item-propertise p {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
}
#CartDrawer .drawer__cart-empty {
  padding: 20px;
}
#CartDrawer .cart__item-name:hover {
  color: #000;
}
@media only screen and (max-width: 749px) {
  .drawer--right {
    width: 320px;
    right: -320px;
  }
  .drawer--right.drawer--is-open {
    transform: translateX(-320px);
    transition: all ease 0.3s;
  }
  .h2.drawer__title {
    font-size: 22px;
  }
  .drawer .cart__image {
    flex: 0 0 85px;
  }
  #CartDrawer .cart__item-name {
    font-size: 14px;
  }
  #CartDrawer .cart__item-sub .cart__item-price-col {
    font-size: 14px;
    width: 100%;
    margin-top: 10px;
  }
  #CartDrawer .cart-subtotal span {
    font-size: 15px;
  }
  #CartDrawer .cart_notice_message {
    font-size: 14px;
  }
  #CartDrawer .cart__Note label {
    font-size: 12px;
  }
  .drawer_fotter-wrapper p {
    font-size: 14px;
  }
  .drawer_fotter-wrapper button {
    font-size: 16px;
  }
  #CartDrawer .cart__item-sub {
    flex-wrap: wrap;
  }
}
@media only screen and (max-width: 380px) {
  #CartDrawer .qtybox .btnqty {
    width: 26px;
    height: 26px;
    line-height: 26px;
  }
}
</style>

<script type="text/javascript">
  // Cart drawer JS
if($('#CartDrawer').length > 0 ){
  $(document).on('click','.Cart_drawer_btn',function(e){
    e.preventDefault();
    let ProductID = $('#product-variants').find('#product-selectors :selected').attr('value');
    let ProductQTY = $('.quantity-selector').val();
    var prod_data = {
      id: ProductID,
      quantity: ProductQTY
    }
     $.ajax({
        type: 'POST', 
        url: '/cart/add.js',
        dataType: 'json', 
        data: prod_data,
        success: function (product){     
          min_cart();
          drawer_open();
        },
        error: function(){  
          console.log("error");
        }
    });
  });
  
  $(document).on('click','.qtybox .btnqty',function(){
    var line = $(this).attr('data-line');
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
    channge_quantity(line,qty);  
  });
  
  $(document).on('click','.drawer__close-button,.drawer_overlay',function(){
    drawer_close();
  });
    
  $(document).on('click','.cart-icon-drawer',function(e){
    e.preventDefault();
      $('.drawer--right').addClass('drawer--is-open');
      $('.drawer_overlay').addClass('drawer--is-open');
      $('html').addClass('scroll-lock-2');
  });
  
  $(document).on('click','.remeve_item a',function(e){
   e.preventDefault();
   var line = $(this).parent().attr('data-line');
    channge_quantity(line,0);
  });
  
  function drawer_open(){
    setTimeout(function(){
      $('.drawer--right').addClass('drawer--is-open');
      $('.drawer_overlay').addClass('drawer--is-open');
      $('html').addClass('scroll-lock-2');
    }, 1000);
    return ;
  }
  function drawer_close(){
      $('.drawer--right').removeClass('drawer--is-open');
      $('.drawer_overlay').removeClass('drawer--is-open');
      $('html').removeClass('scroll-lock-2');
    return ;
  }
  function min_cart(){
    $.ajax({
      url:'/',
      type:'GET',
      dataType: 'html',
      success: function(data){
        $.getJSON("/cart.js", function(cart) {
          $(".cart-icon-drawer div").html(cart.item_count);
        });
        $('#CartDrawer').html($(data).find('#CartDrawer').html());
      }
    });
  }
  function channge_quantity(line,quantity){
    quantity = parseInt(quantity);
    var p_data = {
      line: line,
      quantity: quantity
    }
    var dataJson = JSON.stringify(p_data);
    $.ajax({
      type: "POST",
      url: '/cart/change.js',
      data: dataJson,
      dataType: 'json',
      contentType: "application/json",
      success: function(responce){
        min_cart(); 
      },
      error: function(error){
        console.log(error);
      }
    });
  }
}  
$('.subtotal-text svg').click(function(){
    $('.cart-drawer-menu').addClass('product-sidebar-content-open');
    $('#overlay').show();
    $('html').addClass('sroll-lock');
  });


</script>