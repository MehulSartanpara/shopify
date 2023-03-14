// Wishlist JS
$(document).ready(function(){
  let whishList = localStorage.getItem('whishList');
  let jsonWhishlist = JSON.stringify(whishList);
  $('.product-item-hover').each(function(index,item){
      let productHandle = $(this).find('.whishlist-Icon').attr('data-product-id')
      if (jsonWhishlist.includes(productHandle)) $(this).find('.whishlist-Icon').addClass(' product-added-to-wishlist');
  });

  
  // $(".whishlist-Icon").click(function(){
  //   $(this).closest('.product-item-hover ').find('.whishlist-Icon').addClass("product-added-to-wishlist");
  // });
  // $(".removeWhishlist").click(function(){
  //    $(this).closest('.product-item-hover ').find('.whishlist-Icon').removeClass("product-added-to-wishlist");    
  // });
});

$(document).ready(function(){
  let whishListIcon = document.querySelectorAll('.whishlist-Icon');
  let whishList_productIds = [];
  let whishlistFound = localStorage.getItem('whishList');
  if(whishlistFound != null){
    localStorage.setItem("whishList",whishlistFound);
    whishList_productIds = JSON.parse(whishlistFound);
  }
  else{
    whishList_productIds = [];
  }
  for(item of whishListIcon){
    item.addEventListener('click',(event)=>{   
      let inList = whishList_productIds.indexOf(event.target.closest('.product-item-hover').querySelector('.whishlist-Icon').getAttribute('data-product-id'))
      
      if(inList === -1){
         event.target.closest('.product-item-hover').querySelector('.whishlist-Icon').classList.add("product-added-to-wishlist");
        whishList_productIds.push(event.target.closest('.product-item-hover').querySelector('.whishlist-Icon').getAttribute('data-product-id'));
        localStorage.setItem("whishList",JSON.stringify(whishList_productIds));
      }
      else{
        let index = whishList_productIds.indexOf(event.target.closest('.product-item-hover').querySelector('.whishlist-Icon').getAttribute('data-product-id'));
        whishList_productIds.splice(index, 1);
        localStorage.setItem("whishList",JSON.stringify(whishList_productIds));    
        event.target.closest('.product-item-hover').querySelector('.whishlist-Icon').classList.remove("product-added-to-wishlist");
      }
    })
  }
});


// remove all Itme from wishlist
$(document).ready(function(){
  $(".remove-all-wishlist-product").click(function(){
    localStorage.removeItem('whishList');
    $('.wishlist-product-container').remove();
  });
});


// Add all product from wishlist to Cart
$(document).on("click",".add-all-wishlist--product",function(e){
    e.preventDefault();

    let wish_product = [];
    $('.wishlist-product-container').each(function(){
          var variant_id = $(this).find('.variants__id').val();
         var variant_quantity = $(this).find('.variants__quantity').val();
      
      var prod_data = {
    	id: parseInt(variant_id),
    	quantity: parseInt(variant_quantity)
  	}
      wish_product.push(prod_data);
    }); 
   
    let formData = {items:wish_product};
      fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        // localStorage.removeItem('whishList');
        // $('.wishlist-product-container').remove();
        window.location.href = "/cart";
        return response.json(); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});



// section Js

 let moneyformat = '{{shop.money_format}}';
  function whishListInit(){
  let removewhishList = document.getElementsByClassName('removeWhishlist');
  for (item of removewhishList) {
      item.addEventListener('click',(event)=>{
        event.preventDefault();
        let productHandle = event.target.closest('.trending--item--add--to--cart').querySelector('.removeWhishlist').getAttribute("data-prouduct-handle");
        let whishlistStrigify = localStorage.getItem('whishList');
        let jsonwishList = JSON.parse(whishlistStrigify);
        let index = jsonwishList.indexOf(productHandle);
        if (index !== -1) jsonwishList.splice(index, 1);
        if (index !== -1) event.target.closest('.wishlist-product-container').remove();
          localStorage.setItem("whishList",JSON.stringify(jsonwishList));
      });
  }  
  }

  let checklist = localStorage.getItem('whishList');
  let whishListContainer = document.getElementsByClassName('whishlist-container')[0];
 if(checklist != null){
  let ListItem = JSON.parse(checklist);
   let productListhtml ='';
   whishListContainer.innerHTML='';
   let count = 0;
  for(product of ListItem){
    
    jQuery.getJSON(window.Shopify.routes.root + 'products/'+product+'.js', function(product) {
      let listProductitem = `<div class="wishlist-product-container product--item--colunm-padding">           
                <div class="product--item--col wishlist-product-container--inner product-item-hover ">  
                    <a href="javascript:void(0)" class="product-item--add-bag" {% if product.selected_or_first_available_variant.available == false %}style="opacity: 0.5;"{% endif %}>
                      {% render 'cart-icon' %}
                    </a>
                    <a href="javascript:void(0)" class="product-item--add-wishlist product-added-to-wishlist" >
                      {% render 'wishlist-icon' %}
                    </a>
                    <div class="trending--item--image">
                        <a class="" href="${product.url}">
                          <img class="item-first-image image" src="${product.featured_image}" alt="">
                        </a>
                      </div>
                      <div class="trending--item--price">
                        <p class="product-item--price">${Shopify.formatMoney(product.price,moneyformat)}</p>
                      </div> 
                      <div class="trending--item--title">
                        <p class="product-item--title">${product.title}</p>
                      </div>
                  <div class="trending--item--add--to--cart">
                      <form method="post" action="/cart/add">
                             <input type="hidden" name="id" value="${product.variants[0].id}" class="variants__id">
                              <input type="hidden" name="quantity" value="1" class="variants__quantity">
                             <input type="submit" value="Add To Cart" class="product-item--add-to-cart add-all-product__to__cart"
                              >
                      </form>
                      <div class="wishlist-remove-product removeFromwhishlist">
                        <a href="#" class="product-item--add-to-cart removeWhishlist" data-prouduct-handle="${product.handle}">Remove</a>
                      </div>
                  </div>
                </div>             
           </div>`;
      whishListContainer.innerHTML = whishListContainer.innerHTML + listProductitem;
      count = count + 1;
       if(count == ListItem.length){
         whishListInit();        
    }
    });  
  }
 }