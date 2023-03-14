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
