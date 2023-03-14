// Link for discount 
https://www.blackbeltcommerce.com/shopify-how-to-show-percentage-discount-saved/#:~:text=For%20example%2C%20if%20you%20want,to%20the%20nearest%20whole%20number

if (variant.compare_at_price > variant.price) {
          
          $('.compare-at-collection-page').show();
          $('.compare-at-off-collection-page').show();
          
          $('.compare-at-collection-page').html(theme.Currency.formatMoney(variant.compare_at_price, moneyFormat));
          
          let dis_price = ((variant.compare_at_price - variant.price) * 100 )/ variant.compare_at_price;
          console.log(dis_price)
          
         $('.compare-at-off-collection-page').html(dis_price + '% off'  );
                    
          
          $(this.selectors.comparePrice, this.$container).html(
            theme.Currency.formatMoney(variant.compare_at_price, moneyFormat)
          );
          $(this.selectors.comparePriceWrapper, this.$container).removeClass(
            'hide'
          );
          $(this.selectors.productPrice, this.$container).addClass('on-sale');
          $(this.selectors.comparePriceWrapper, this.$container).attr(
            'aria-hidden',
            'false'
          );
          $(this.selectors.comparePriceA11y, this.$container).attr(
            'aria-hidden',
            'false'
          );
        } else {
          $('.compare-at-collection-page').hide();
          $('.compare-at-off-collection-page').hide();
          $(this.selectors.comparePriceWrapper, this.$container)
            .addClass('hide')
            .attr('aria-hidden', 'true');
          $(this.selectors.productPrice, this.$container).removeClass(
            'on-sale'
          );
          $(this.selectors.comparePrice, this.$container).html('');
          $(this.selectors.comparePriceA11y, this.$container).attr(
            'aria-hidden',
            'true'
          );
        }





