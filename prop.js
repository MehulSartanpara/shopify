if(variant.featured_image != null){ 
    $('.items-slider-container img[data-id="'+variant.featured_image.id+'"]').trigger('click'); 
  }
$('.advanced-filter[data-handle="'+tag_name+'"]').find('a').trigger('click');

  