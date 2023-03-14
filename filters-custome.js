console.log('running global.js file');
// set logo and nav height the same on desktop
var windowWidth = $(window).outerWidth();
if (windowWidth > 768 && $('.inline-nav').length === 0) {
  var logoHeight = $('.header__heading-logo').outerHeight();
  $('.main-nav-container').outerHeight(logoHeight);
  $('#main-nav').outerHeight(logoHeight);
}
if ($('.main-nav-center').length > 0) {
  var pageWidth = $('.page-width').width();
  console.log(pageWidth);
  var logoWidth = $('.logo-container').width();
  var padding = $('#main-nav').css('padding-left');
  var totalNavItem = 0;
  $('.main-link').each(function(i) {
    var linkWidth = $(this).outerWidth();
    totalNavItem += linkWidth;
  });
var widthDiff = (pageWidth/2) - totalNavItem;
$('#main-nav').css('padding-left',widthDiff);
}
if ($('.inline-nav').length > 0) {
  var pageWidth = $('.page-width').width();
  var logoWidth = $('.logo-container').width();
  var pageWidthDivided = pageWidth / 2;
  var logoWidthDivded = logoWidth / 2;
  var navWidth = pageWidthDivided - logoWidthDivded;
  $('#main-nav').css('width',navWidth+'px');
}
$('.main-link.extra-links').hover(function() {
  $('.main-link.extra-links.active').removeClass('active');
  $('.sub-container.visible').removeClass('visible')
  $(this).addClass('active');
    var subContainer = $(this).find('.sub-container');
    subContainer.css('width',$('#shopify-section-header').width() - 20);
    subContainer.css('top',$('#shopify-section-header').outerHeight());
    var position = subContainer.offset();
    var left = position.left - 30;
    var offset = '-' + left + 'px';
    subContainer.css('left',offset);
    var sublinkLength = subContainer.find('.sub-links').length;
    if (sublinkLength > 4) {
      sublinkLength = 4;
    }
    var sublinkWidth = (100 / sublinkLength) - 2;
    sublinkWidth = sublinkWidth + '%';
    subContainer.find('.sub-links').css('width',sublinkWidth);
    subContainer.addClass('visible');
},function(){
    var intervalId = setInterval(function() {
    if($('.sub-container.visible:hover').length != 0 || $('.main-link.extra-links.active:hover').length != 0) {
    // let it be visible
    }
    else {
    $('.sub-container.visible').removeClass('visible');
    clearInterval(intervalId);
  }
  }, 250);
});
$('.image-text-flex').each(function() {
  var windowW = $(window).width();
  console.log('my width is' + windowW);
  if (windowW > 768) {
  var height = $(this).outerHeight();
  $(this).find('.container-flex.img').css('min-height',height);
}
else {
  // do nothing, it's mobile
}
});
$('.product-card-container').flickity({
  // options
  cellAlign: 'left',
  contain: true,
  draggable: true,
  freeScroll: true,
  pageDots: false,
  wrapAround: true,
  prevNextButtons: false
});
var windowW = $(window).width();
console.log('my width is' + windowW);
if (windowW > 768) {
$('.testimonial-flex').flickity({
  // options
  cellAlign: 'left',
  contain: true,
  draggable: true,
  freeScroll: true,
  pageDots: true,
  wrapAround: true,
  groupCells:3
});
}
else {
  $('.testimonial-flex').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    draggable: true,
    freeScroll: true,
    pageDots: true,
    wrapAround: true,
    groupCells:1,
    prevNextButtons: false
  });
}
$('.gallery-slider').each(function() {
  var cells = $(this).attr('group-cells');
  console.log(cells);
  var length = $(this).find('.gallery-link-item').length;
  if (length > cells) {
  $(this).flickity({
  // options
  cellAlign: 'left',
  contain: false,
  draggable: true,
  freeScroll: true,
  pageDots: true,
  wrapAround: true,
  groupCells:cells,
  prevNextButtons: false
});
}
else {
  $(this).addClass('flexy');
}
});
$('.gallery-slider').each(function () {
  var left_margin = $(this).find('.flickity-viewport').find('.flickity-slider').find('.gallery-link-item').eq(1).css('margin-left');
  $(this).find('.flickity-viewport').css('margin-left',left_margin);
//  $(this).find('.flickity-viewport').find('.flickity-slider').find('.gallery-link-item').eq(0).css('margin-left',left_margin)
});
$('div').each(function () {
  var id = $(this).attr('id');
  if (typeof id != "undefined") {
  if (id.indexOf('shopify-section-template') > -1) {
    if($(this).find('div').eq(0).css('display') == 'none') {
      $(this).css('margin-top',0);
      $(this).css('margin-bottom',0)
    }
  }
}
});
$('.footer-flex-item').click(function (e) {
  var target = $(e.target.className);
  var origTarget = $(e.target);
  var classTarget = origTarget[0]['className'];
  if(classTarget === 'footer-item' || classTarget === 'footer-link') {

  }
  else {
  if (!$(this).hasClass('active')) {
  $(this).find('.footer-item').slideDown();
  $(this).addClass('active');
  $(this).find('.bold-item').addClass('active');
}
else {
  $(this).find('.footer-item').slideUp();
  $(this).removeClass('active');
  $(this).find('.bold-item').removeClass('active');
}
}
});
var menuHeight = $('#main-header').outerHeight() + 20;
$('.mobile-nav-container').css('top',menuHeight);
$('.mobile-nav-container .sub-links').each(function() {

});
//mobile navigation logic
$('#mobile-nav').click(function(e) {
  e.preventDefault();
  if ($('.hamburger-svg').css('display') === 'inline') {
    $('.hamburger-svg').hide();
    $('.menu-svg').show();
    $('.mobile-nav-container').slideDown();
  }
  else {
    $('.hamburger-svg').show();
    $('.menu-svg').hide();
    $('.mobile-nav-container').slideUp();
  }
});
$('.mobile-nav-container .main-link').click(function(e) {
    e.preventDefault();
    var index = $(this).index('.main-link');
    console.log('my index is '+index);
    var active = $(this).attr('data-active');
    if (typeof active === 'undefined') {
      $(this).attr('data-active','active');
      $(this).find('.icon-chevron-right').hide();
      $(this).find('.icon-chevron-left').show();
      $('.mobile-nav-container .main-link').each(function(i){
        if (index != i) {
          console.log('hiding '+i)
          $(this).hide();
        }
      });
    }
    else {
    $(this).removeAttr('data-active');
    $(this).find('.icon-chevron-right').show();
    $(this).find('.icon-chevron-left').hide();
    $('.mobile-nav-container .main-link').show();
  }
    var subLinkExist = 0;
     var thisCLass = $(this).attr('class').replace('main-link','');
     console.log(thisCLass);
   $('.mobile-nav-container .sub-links').each(function(i) {
     var subClass = $(this).attr('class');
     if (subClass.indexOf(thisCLass) > -1) {
       if (active === 'active') {
         $(this).hide();
       }
       else {
       $(this).slideDown();
     }
       subLinkExist = 1;
     }
   });
   if (subLinkExist === 0) {
     var href = $(this).attr('href');
     window.location.href = href;
   }
   else {
     // keep preventing default, we have links
   }
 });
$('.mobile-nav-container .sub-link-title').click(function(e) {
  e.preventDefault();
  var titleType = $(this).attr('data-title');
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $('.sub-link-link').each(function() {
      var subtitleType = $(this).attr('data-title');
      console.log(subtitleType);
      if (titleType === subtitleType) {
        $(this).slideUp();
      }
    });

  }
  else {
  $(this).addClass('active');
  console.log(titleType);
  $('.sub-link-link').each(function() {
    var subtitleType = $(this).attr('data-title');
    console.log(subtitleType);
    if (titleType === subtitleType) {
      $(this).slideDown();
    }
  });
}
});


  $(document).ready(function(){
    $(document).on('click','.filterLabel',function(){
      $(this).toggleClass('open-filter')
      $(this).next().slideToggle();
      
    })
  });

$(".change-color1").click(function(){
  $(".preve-pagination").addClass("change-color");
});

$(".pagination__item ").click(function(){
  $(".preve-pagination").remove("change-color");
});

$(".change-color5").click(function(){
  $(".next-pagination").addClass("change-colors");
});

$(".change-color5").click(function(){
  $(".next-pagination").remove("change-colors");
});




// MY AJAX START

// FILTER AJAX

$(document).on('click','.filter-item input',function(e){
e.preventDefault();
    $('.filter-form').submit();
});

function createSearchParams(form) {
    const formData = new FormData(form);
    return new URLSearchParams(formData).toString();
}

  $(document).on('submit','.filter-form',function(e){
  e.preventDefault();
     $('.collections-grid-custom').addClass('loading');
    const sortFilterForms = document.querySelectorAll('.filter-details-container form');
    var data_collection_url = $("#ProductGridContainer").attr('data-collection-url');
    var selectedCountry = $('.facet-filters__sort').children("option:selected").val();
    
//     console.log(selectedCountry);
  const forms = [];
   sortFilterForms.forEach((form) => {
          forms.push(createSearchParams(form));
      });
      var url = forms.join('&');
  
    let final_url = data_collection_url +'?'+ url +'&sort_by='+ selectedCountry;
       $.ajax({
          type: 'GET', 
          url: final_url,
          dataType: 'html', 
          success: function (filter_html){ 
           $('#ProductGridContainer').html($(filter_html).find('#ProductGridContainer').html());   
            $('#sidebarFilter').html($(filter_html).find('#sidebarFilter').html());   
            window.history.pushState(location.href, "", final_url);
            $('.facet-filters__sort').val(selectedCountry);
            $('.collections-grid-custom').removeClass('loading');
          },
          error: function(){   
            $('.collections-grid-custom').removeClass('loading');
            console.log("error");
          }
        });      
});




//Remove Filter
$(document).ready(function() {
  $(document).on('click','.active-filters__remove-filter',function(e){
    e.preventDefault();    
    let new_url = $(this).attr('href');
//     console.log(new_url);
     $.ajax({
          type: 'GET', 
          url: new_url,
          dataType: 'html', 
          success: function (filter_html){ 
           $('#ProductGridContainer').html($(filter_html).find('#ProductGridContainer').html());   
            $('#sidebarFilter').html($(filter_html).find('#sidebarFilter').html());   
            window.history.pushState(location.href, "", new_url);
          },
          error: function(){   
            console.log("error");
          }
        });    
  });    
});

//Check Box 
$(document).ready(function() {
   $(document).on('click','.switch',function(e){
      let inputVal = $(this).find(':checked');
     setTimeout(function(){
       if(inputVal.length == 1){
        $(".filter-form").removeClass("checkBox_is_active");	 
       }else{
          $(".filter-form").addClass("checkBox_is_active");
       }       
     },200) 
  });  
});



// Clear All link 

$(document).ready(function() {
  $(document).on('click','.active-filters__clear',function(e){
    e.preventDefault();
    let new_url = $(this).attr('href');
    console.log(new_url);
     $.ajax({
          type: 'GET', 
          url: new_url,
          dataType: 'html', 
          success: function (filter_html){ 
           $('#ProductGridContainer').html($(filter_html).find('#ProductGridContainer').html());   
            $('#sidebarFilter').html($(filter_html).find('#sidebarFilter').html());   
            window.history.pushState(location.href, "", new_url);
          },
          error: function(){   
            console.log("error");
          }
        });    
  });    
});


//Sort By Filter

 $(document).on('change','.facet-filters__sort',function(e){
   e.preventDefault();   
   $('#sidebarFilter .filter-form').submit();
});
 $(document).on('click','.collection-list',function(e){
   e.preventDefault(); 
   console.log('collections list clicked')
     $(location).attr('href',$(this).find('a').attr('href'));
    //$(this).find('a').trigger('click');   
});




// Product Grid item products
  $(document).ready(function(){
     $(document).on('click','.first-grid',function(e){
      $('.product-cart-item').addClass('grid-custom');
      $(".grid-change svg").css("display", "none");
      $(".grid-active-button svg").css("display", "block");
    });
         $(document).on('click','.grid-change .first-grid',function(e){
    
      $('.grid-active-button').addClass('grid-svg');
    });
      $(document).on('click','.second-grid',function(e){
    
      $('.product-cart-item').removeClass('grid-custom');
      $(".grid-active-button svg").css("display", "none");
      $(".grid-change svg").css("display", "block");
      $(".grid-active-button svg").css("display", "none");
    });
  });




<form class="filter-form">
  {%- for filter in collection.filters -%}
    <details class="filter-group">
      <summary class="filter-group-summary">
        <div>
          <span>{{ filter.label }}</span>

          {%- if filter.active_values.size > 0 -%}
            <span>({{ filter.active_values.size }})</span>
          {%- endif -%}
        </div>
      </summary>

      <div class="filter-group-display">
        <div class="filter-group-display__header">
          <span class="filter-group-display__header-selected">{{ filter.active_values.size }} selected</span>

          {%- if filter.active_values.size > 0 -%}
            <a href="{{ filter.url_to_remove }}" class="filter-group-display__header-reset">Reset</a>
          {%- endif -%}
        </div>

        {%- case filter.type -%}
          {%- when 'boolean' or 'list' -%}
            <ul class="filter-group-display__list">
              {%- for filter_value in filter.values -%}
                <li class="filter-group-display__list-item">
                  <label for="Filter-{{ filter.param_name }}-{{ forloop.index }}">
                  <input type="checkbox"
                    name="{{ filter_value.param_name }}"
                    value="{{ filter_value.value }}"
                    id="Filter-{{ filter.param_name }}-{{ forloop.index }}"
                    {% if filter_value.active -%}checked{%- endif %}
                    {% if filter_value.count == 0 and filter_value.active == false -%}disabled{%- endif %}
                  >{{ filter_value.label }}</label>
                </li>
              {%- endfor -%}
            </ul>

            <div class="filter-group-display__submit">
              <input type="submit" value="Apply">
            </div>
          {%- when 'price_range' -%}
            <div class="filter-group-display__price-range">
              <div class="filter-group-display__price-range-from">
                <span>{{ cart.currency.symbol }}</span>

                <input name="{{ filter.min_value.param_name }}"
                  id="Filter-{{ filter.min_value.param_name }}"
                  {% if filter.min_value.value -%}
                    value="{{ filter.min_value.value | money_without_currency | replace: ',', '' }}"
                  {%- endif %}
                  type="number"
                  placeholder="0"
                  min="0"
                  max="{{ filter.range_max | money_without_currency | replace: ',', '' }}"
                >

                <label for="Filter-{{ filter.min_value.param_name }}">From</label>
              </div>
              <div class="filter-group-display__price-range-to">
                <span>{{ cart.currency.symbol }}</span>

                <input name="{{ filter.max_value.param_name }}"
                  id="Filter-{{ filter.max_value.param_name }}"
                  {% if filter.max_value.value -%}
                    value="{{ filter.max_value.value | money_without_currency | replace: ',', '' }}"
                  {%- endif %}
                  type="number"
                  placeholder="{{ filter.range_max | money_without_currency | replace: ',', '' }}"
                  min="0"
                  max="{{ filter.range_max | money_without_currency | replace: ',', '' }}"
                >

                <label for="Filter-{{ filter.max_value.param_name }}">To</label>
              </div>
            </div>

            <div class="filter-group-display__submit">
              <input type="submit" value="Apply">
            </div>
        {%- endcase -%}
      </div>
    </details>
  {%- endfor -%}

  <div class="active-filters">
    <a href="{{ collection.url }}?sort_by={{ collection.sort_by }}" class="active-filters__clear">Clear all</a>

    {%- for filter in collection.filters -%}
      {%- if filter.type == "price_range" -%}
        {%- if filter.min_value.value != nil or filter.max_value.value != nil -%}
          <a class="active-filters__remove-filter" href="{{ filter.url_to_remove }}">
            {%- assign min_value = filter.min_value.value | default: 0 -%}
            {%- assign max_value = filter.max_value.value | default: filter.range_max -%}
            {{ min_value | money }} - {{ max_value | money }} X
          </a>
        {%- endif -%}
      {%- else -%}
        {%- for filter_value in filter.active_values -%}
          <a class="active-filters__remove-filter" href="{{ filter_value.url_to_remove }}">
            {{ filter.label }}: {{ filter_value.label }} X
          </a>
        {%- endfor -%}
      {%- endif- %}
    {%- endfor -%}
  </div>
</form>