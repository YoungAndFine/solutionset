/*
 * Layout - 
 *
 * Copyright (c) 2013 Dynamicweb
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://github.com/dynamicweb/solutionset
 *
 * Version: 0.9.0
 *
 */
var console = console || {"log": function () {}};

if (typeof (Layout) == 'undefined') {
    var Layout = new Object();
}

Layout.params = {
  productListItem: ".product-list-item-wrapper",
  productDetails: '.product-details-content',
  productRatingUnderlayClass : "product-rating-underlay",
  productRatingStarClass: "product-rating-stars",
  BOMSelect: "BomConfigurator"
};

Layout.Translate = {};

Layout.ProfileForm = {

    /* Initializes the profile form */
    initialize: function () {
        $('#profile-form form').submit(function (e) {
            var isValid = Layout.ProfileForm.validate();

            if (!isValid) {
                e.preventDefault();
            }
        });

        $('#profile-form form input').keydown(function () {
            $(this).removeClass('form-field-required');
        });

        $('#profile-form-errors ul li').each(function () {
            $('#' + $(this).attr('data-form-field')).addClass('form-field-required');
        });
    },

    /* Validates the form */
    validate: function () {
        var f = null;
        var ret = true;
        var fieldsCache = {};
        var nonEmpty = ['name', 'username', 'password', 'password2', 'email'];

        var getField = function (name) {
            var result = null;

            if (fieldsCache[name]) {
                result = fieldsCache[name];
            } else {
                result = $('#profile-form-' + nonEmpty[i] + ' input');
                fieldsCache[name] = result;
            }

            return result;
        }

        for (var i = 0; i < nonEmpty.length; i++) {
            f = getField(nonEmpty[i]);

            if (!f.val() || !f.val().length) {
                f.addClass('form-field-required');
                ret = false;
            }
        }

        return ret;
    }
};

Layout.LoginBox = {

    containerSelector: ".login-form",

    /* Initializes the login box */
    initialize: function () {
        var activators = [
            'quicklinks-login',
            'quicklinks-myaccount',
            'checkout-already-member',
            'quicklinks-login2'
        ], form;

        Layout.LoginBox.containerSelector = ".modal-type-loginbox";
        form = $(Layout.LoginBox.containerSelector).find("form");
        $(Layout.LoginBox.containerSelector).on("show", function () {
            Layout.LoginBox.reset(null, form);
            Layout.LoginBox.focus(true, form);
        });

        for (var i = 0; i < activators.length; i++) {
            $('#' + activators[i]).click(function (e) {
                e.preventDefault();
                Layout.LoginBox.show();
            });
        }

        $('input.login-credentials').keydown(function () {
            $(this).removeClass('form-field-required');
        });
    },

    /* Shows the login box */
    show: function () {
        // var form = $('#login-box form');

        // $('#login-box').dialog({
        //     resizable: false,
        //     modal: true,
        //     draggable: false,
        //     width: 380
        // });

        // Layout.LoginBox.reset(null, form);
        // Layout.LoginBox.focus(true, form);

        // /* Will be applying styles directly to the outer dialog box */
        // $('#login-box').parents('.ui-dialog').addClass('login-box-dialog');
    },

    /* Hides the login box */
    hide: function () {
        // $('#login-box').dialog('hide');
    },

    /* Validates the login form */
    validate: function (form) {
        var f = null;
        var ret = true;
        var firstInvalidField = null;
        var fields = ['login-username-field', 'login-password-field'];

        form = $(form);

        Layout.LoginBox.resetValidationResults(null, form);

        if (Layout.LoginBox.mode(null, form) == 'lostpassword') {
            fields = ['login-email-field'];
        }

        for (var i = 0; i < fields.length; i++) {
            f = form.find('.' + fields[i]);

            if (!f.val() || !f.val().length) {
                ret = false;
                f.addClass('form-field-required');

                if (!firstInvalidField) {
                    firstInvalidField = f[0];
                }
            }
        }

        if (!ret && firstInvalidField) {
            try {
                firstInvalidField.focus();
            } catch (ex) { }
        }

        return ret;
    },

    /* Focuses the form field */
    focus: function (select, form) {
        var f = $(form).find('.' + (Layout.LoginBox.mode(null, form) == 'login' ? 'login-username-field' : 'login-email-field'));

        if (f && f.length) {
            try {
                f.focus();
            } catch (ex) { }

            if (!!select) {
                try {
                    f.select();
                } catch (ex) { }
            }
        }
    },

    /* Resets the form values */
    reset: function (mode, form) {
        var f = null;
        var fields = ['login-username-field', 'login-password-field', 'login-email-field'];

        form = $(form);

        if (typeof (mode) != 'undefined' && mode && mode.length) {
            mode = mode.toString().toLowerCase();

            if (mode == 'login') {
                fields = ['login-username-field', 'login-password-field'];
            } else if (mode == 'lostpassword') {
                fields = ['login-email-field'];
            }
        } else {
            Layout.LoginBox.mode('login', form);
        }

        Layout.LoginBox.resetValidationResults(mode, form);

        for (var i = 0; i < fields.length; i++) {
            f = form.find('.' + fields[i]);
            f.val('');
        }
    },

    /* Resets the validateion result of a form */
    resetValidationResults: function (mode, form) {
        var f = null;
        var fields = ['login-username-field', 'login-password-field', 'login-email-field'];

        form = $(form);

        if (typeof (mode) != 'undefined' && mode && mode.length) {
            mode = mode.toString().toLowerCase();

            if (mode == 'login') {
                fields = ['login-username-field', 'login-password-field'];
            } else if (mode == 'lostpassword') {
                fields = ['login-email-field'];
            }
        }

        for (var i = 0; i < fields.length; i++) {
            f = form.find('.' + fields[i]);
            f.removeClass('form-field-required');
        }
    },

    /* Gets or sets the form mode. Possible values are 'login' and 'lostpassword' */
    mode: function (value, form) {
        var ret = '';
        var newForm = form;
        var container = $(form).parents(Layout.LoginBox.containerSelector);

        if (typeof (value) == 'undefined' || !value || !value.length) {
            ret = (container.find('div.login-box-mode:visible').attr('data-login-box-mode') || '').toLowerCase();
        } else {
            value = value.toString().toLowerCase();

            container.find('div.login-box-mode').each(function () {
                var box = $(this);

                if (box.attr('data-login-box-mode') == value) {
                    box.show();
                    newForm = box.find('form');
                } else {
                    box.hide();
                }
            });

            Layout.LoginBox.reset(value == 'login' ? 'lostpassword' : 'login', form);

            setTimeout(function () {
                Layout.LoginBox.focus(true, newForm);
            }, 25);

            ret = value;
        }

        return ret;
    }
};

/*validate login-modal box*/
function validateForm()
{
var x=document.forms["LoginForm"]["username"].value;
if (x==null || x=="")
  {
  alert("First name must be filled out");
  return false;
  }
if (x=true)
{alert('brugernavn');} 
}

//$.ajax({
	//type: 'post',
	//url: "dynamicweb.net\solutions\solutionset.local.dynamicweb.dk\Files\Login.aspx",
	//context: $(this),
	//success: function (msg) {
	//$(".modal-body").html(msg);
	//}
//});



Layout = (function (m) {

  m.isMobile = (function () {

    return {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
      }
    };

  }());

  return m;

}(Layout || {}));



Layout.Cart = (function (m) {

  m.UpdateProductQuantity = (function () {

    return function (orderlineID) {
      if (!orderlineID) return;

      // Find input box containing quantity
      var orderlineCode = "QuantityOrderLine" + orderlineID;
      var box = $("input#" + orderlineCode);

      // Verify box
      if (!box) return;

      // Do the update
      var val = parseInt(box.val()), url;

      if (val <= 0) {
        url = "CartCmd=delorderline&key=" + orderlineID;
      } else {
        url = "CartCmd=updateorderlines&" + orderlineCode + "=" + val;
      }

      location.href = "/Default.aspx?" + url;
    }

  })();

  m.AddToCart = (function () {

    return function (obj, extendQuery, wrapperSelector) {
      var $obj = $(obj)
        , $productItem = $obj.parents(wrapperSelector || '.product-list-item-wrapper')
        , productLink = $productItem.find('.product-link').attr('href') || location.href
        , productQuantity = parseInt($productItem.find("input[name=quantity]").val())
        , $variantSelector = $productItem.find(".variants-selector")
        , productVariant = $variantSelector.val()
        , redirectLink
        , query = [{ name: 'cartcmd', value: 'add'}];


      if ($variantSelector && productVariant == "") {
        alert(Layout.Translate.ProductVariantIsEmpty);
        return;
      }

      if (productQuantity < 1) {
        alert('Quantity can\'t be less then 1');
        return;
      }

      if (typeof extendQuery == Array) {
        $.extend(query, extendQuery);
      }

      var redirectLink = productLink
        + (productLink.indexOf('?') > 0 ? "&" : "?")
        + $.param(query)
        + '&' + $productItem.find('select, textarea, input').serialize()
        + (typeof extendQuery == String ? "&" + extendQuery : "");

      // Set coockie for showing box after add2cart function
      if(!$.cookie('donotdisturb')){
         $.cookie("addedtocart", 1, { expires: 10 });
      }

      eCommerce.Overlay.show(document.body);
      location.href = redirectLink;
    }

  })();

  return m;

}(Layout.Cart || {}));



Layout.Products = (function (m) {

  /**
  * Converting regular microformat review layout for stars rating
  * Self invoked module
  */
  m.MicroformatReviewConvert = (function () {

    var selfinvoke = true
      , get = function (el, key) {
          return $('*[itemprop="'+key+'"]', el).html();
        };

    function convertReviewLayout() {
      $('*[itemprop="rating"]').each(function(index, el) {
        var $el = $(el),
        value = get(el, 'average'),
        best = get(el, 'best');
        if (value && best) {
          $el.contents().wrapAll('<span class="hidden"/>');
          $el.addClass(Layout.params.productRatingUnderlayClass)
            .css('width', best+'em')
            .append(
              $('<span class="' + Layout.params.productRatingStarClass + '"/>')
              // .css('width', value+'em')
              .css('width', (100*value/best).toFixed(4)+'%')
              .html(value)
            );
        }
      });
    };

    if (selfinvoke) {
      convertReviewLayout();
    }

    return function () {
      convertReviewLayout();
    }

  })();

  return m;

}(Layout.Products || {}));


$.extend({

    getUrlParams: function () {
        var params = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        if (window.location.href.indexOf('?') == -1) return [];
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            params.push(hash[0]);
            params[hash[0]] = hash[1];
        }
        return params;
    },

    getUrlParam: function (name) {
        return $.getUrlParams()[name];
    },

    viewall: function () {
        var num = $("#allProductCount").html();
        if ($.getUrlParams()["PageSize"]) {

        } else {
            // TODO: Need rework this condition
            if ($.getUrlParams().length) {
                location.href += "&PageSize=" + num;
            } else {
                location.href += "?PageSize=" + num;
            }
        }
    },

    addToCart: function (obj, extendQuery, wrapperSelector) {
      Layout.Cart.AddToCart(obj, extendQuery, wrapperSelector);
    },

    addAllToCart: function (productListSelector, wrapperSelector) {
        var productList = $(productListSelector).find(wrapperSelector || '.product-list-item-wrapper');
        var form = $('<form class="addAllHiddenForm" method="post" />');
        form.attr("action", "/Default.aspx?ID=48");
        form.append($('<input name="cartcmd" value="addmulti" />'));
        productList.each(function (i, el) {
            var productQuantity = parseInt($(el).find("input[name=quantity]").val());
            var productID = $(el).find("input[name=ProductID]").val();

            if (isNaN(productQuantity) || productQuantity <= 0) return;

            var productInput = $('<input name="ProductID' + (i + 1) + '"/>').attr("value", productID);
            var quantityInput = $('<input name="quantity' + (i + 1) + '"/>').attr("value", productQuantity);
            var productLoopCounterInput = $('<input name="ProductLoopCounter' + (i + 1) + '"/>').attr("value", i + 1);
            form.append(productInput);
            form.append(quantityInput);
            form.append(productLoopCounterInput);

        });
        form.appendTo("body");
        eCommerce.Overlay.show(document.body);
        $("form.addAllHiddenForm").submit();

        return false;
    },

    /**
    * Recalculating and updating string in product catalog header
    * In ex. string like this "1 of 5 products"
    *
    * @method updateProductsListCounter
    * @param {Object} params A config object
    * @param {String} params.productList The selector of product list section wrapper
    * @param {String} params.productListItem The selectior of item in list mode
    * @param {String} params.productTilesList The selector of product list section. Tiles mode
    * @param {String} params.productTilesListItem The selectior of item in list mode. Tiles mode
    * @param {String} params.itemsDisplayed The selector for current products counter statement
    * @param {Integer} params.productsPerPage The number of product per page
    * @return {Void}
    */
    updateProductsListCounter: function (params) {
      var productDisplayedCount,
          currentPage,
          pageSize,
          countFrom;

      params = params || {};

      if ($(params.productList).length > 0) {
        productDisplayedCount = $(params.productList).find(params.productListItem).length;
      } else if ($(params.productTilesList).length > 0) {
        productDisplayedCount = $(params.productTilesList).find(params.productTilesListItem).length;
      }

      if (productDisplayedCount && $(params.itemsDisplayed).length > 0) {
        currentPage = $(".product-list-paging-current").length ? $(".product-list-paging-current > a").html() - 1 : 0;
        pageSize = params.productsPerPage;
        countFrom = currentPage * pageSize;
        $(params.itemsDisplayed).html((countFrom + 1) + "-" + (countFrom + productDisplayedCount));
      }

      return;
    },

    browserFeatures: {
        placeholder: false,
        checkSupport: function () {
            test = document.createElement('input');
            if ('placeholder' in test) $.support.placeholder = true;
        }
    },

    /**
    * Making the set of elements equal height. Getting the max height
    * from the set of elements by the selector and set it to the each
    * element in set
    *
    * @method equalHeight
    * @param {string} selector Selector of the elements set
    * @return {string} Max height
    */
    equalHeight: function (selector) {
        var heights = $(selector).map(function () {
            return $(this).height();
        }).get(),
        maxHeight = Math.max.apply(null, heights);

        $(selector).height(maxHeight);

        return maxHeight;
    }
});



$(document).ready(function () {

    $('.mainmenu-bottom-totop a').live("click", function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $("#amount").live("keyup", function () {
        $("#addtocart").attr("href", "/default.aspx?id=<!--@Ecom:Product:Page.ID-->&productid=<!--@Ecom:Product.ID-->&quantity=" + $(this).val() + "&cartcmd=add");
    });

    $(".buymore").live("click", function () {
        var wrapper = $(this).parents(".product-pricebox-wrapper");
        if (wrapper.hasClass("product-pricebox-wrapper-incart")) {
            wrapper.removeClass("product-pricebox-wrapper-incart");
            wrapper.find(".product-pricebox-title, .product-variants").removeClass("hidden");
        }
    });

    $("a.addtocart").live("click", function () {
        var variants = $(this).parents(".product-pricebox-wrapper").find(".variants-selector");
        if (variants.length && variants.val() == "") {
            alert("<!--@Translate(needtochoosevariant, 'Select product variant please')-->");
            return false;
        } else {
            //eCommerce.Overlay.show(document.body);
        }
    });

});


function comment_validate() {
    if (document.getElementById("Comment.Rating").selectedIndex < 1) {
        alert("Please rate the product.");
        document.getElementById("Comment.Rating").focus();
        return false;
    }
    if (document.getElementById("Comment.Name").value.length < 1) {
        alert("Specify your name.");
        document.getElementById("Comment.Name").focus();
        return false;
    }
    if (document.getElementById("Comment.Text").value.length < 1) {
        alert("Please write a comment.");
        document.getElementById("Comment.Text").focus();
        return false;
    }
    document.getElementById("commentform").action = "/Default.aspx?ID=<!--@Global:Page.ID-->"
    document.getElementById("Comment.Command").value = "create";
    return true;
}

function nextComments() {
    if (!$(".tabContentShown").next().hasClass("fiveCommentDivContainer")) {
        return;
    }

    $(".tabContentShown").next().addClass("nextCommentContainerTemp");
    $(".tabContentShown").addClass("tabContentHidden");
    $(".tabContentShown").removeClass("tabContentShown");
    $(".nextCommentContainerTemp").addClass("tabContentShown");
    $(".nextCommentContainerTemp").removeClass("tabContentHidden");
    $(".nextCommentContainerTemp").removeClass("nextCommentContainerTemp");
    if (!$(".tabContentShown").next().hasClass("fiveCommentDivContainer")) {
        $("#nextCommentsButton").addClass("disabledLink");
    }
    $("#previousCommentsButton").removeClass("disabledLink");
}

function previous() {
    if (!$(".tabContentShown").prev().hasClass("fiveCommentDivContainer")) {
        return;
    }

    $(".tabContentShown").prev().addClass("previousCommentContainerTemp");
    $(".tabContentShown").addClass("tabContentHidden");
    $(".tabContentShown").removeClass("tabContentShown");
    $(".previousCommentContainerTemp").addClass("tabContentShown");
    $(".previousCommentContainerTemp").removeClass("tabContentHidden");
    $(".previousCommentContainerTemp").removeClass("previousCommentContainerTemp");
    if (!$(".tabContentShown").prev().hasClass("fiveCommentDivContainer")) {
        $("#previousCommentsButton").addClass("disabledLink");
    }
    $("#nextCommentsButton").removeClass("disabledLink");
}

function changeDropdownPosition(dropdownMenu) {
  var dropdownRight
    , windowWidth;

  windowWidth = (Layout.isMobile.any()) ? screen.width : window.outerWidth;
  dropdownRight = dropdownMenu.offset().left + dropdownMenu.width();
  if (dropdownRight > windowWidth) {
    // dropdownMenu.width(160); // Either make one column dropdown view
    dropdownMenu.css({
      left: 'auto',
      right: '-1px'
    });
  }

  return;
}

$(document).ready(function () {

    // Fix for Bootstrap dropdown tooltip.
    // Avoid the close of dropdown box after the click on it
    $('body').on(
      'click.dropdown touchstart.dropdown.data-api',
      '.dropdown .minicart-popup, .dropdown .dropdown-menu',
      function (e) {
        e.stopPropagation();
      }
    );

    // Fix Bootstrap for NavBar root list elements to be clickable
    // and check if dropdown menu will goes out of the screen
    $(".mainmenu a[data-toggle=dropdown]").on("touchstart click", function (e) {
      var parent = $(this).parent();
      if (parent.hasClass("open")) {
        location.href = $(this).attr("href");
      } else {
        changeDropdownPosition(parent.find(".dropdown-menu"));
      }
    });
    $(".mainmenu a[data-toggle=dropdown]").on("hover", function (e) {
      var parent = $(this).parent();
      if (e.type == "mouseenter") {
        if (!parent.hasClass("open")) {
          parent.addClass("open");
          changeDropdownPosition(parent.find(".dropdown-menu"));
        }
      }
      if (e.type == "mouseleave") {
        if (parent.hasClass("open")) {
          parent.removeClass("open");
        }
      }
    });

    // Custom handler for bootstrap component event.
    // Function which fires on callback check if modal
    // need to be loaded from remte resource and if so,
    // it will add new data attribute named 'isRemote' to modal
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this)
        , href = $this.attr('href')
        , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')))
        , isRemote = typeof(href) != "undefined" && !/#/.test(href) && href != 'javascript:void(0);';

        $target.data('isRemote', isRemote);
    });

    // Includes preloader to modal-body on modal event 'show'
    $('body').on('show', '.modal', function (e) {
      var modalData = $(this).data()
        , modalBody = $(this).find('.modal-body');

      if (modalData.isRemote) {
        modalBody.html('<div class="loader" />');
      }
    });

    // Custom modal loaded event handler used for cutting
    // unnecessary wrapper tags
    $('body').on('loaded', '.modal.modal-type-variants', function (e) {
      var productItem = $(this).find('#content-main .product-list-item-wrapper')
        , modalData = $(this).data()
        , modalBody = $(this).find('.modal-body');

      if (modalData.isRemote) {
        modalBody.html(productItem.html());
      }
    });

    // Custom click handler for modal with BOM configurator
    // element preview
    $('[data-dw-toggle="modal-bom-details"]').on('click', function (e) {
      var $this = $(this)
        , $target = $($this.attr('data-target'))
        , data = $this.data()
        , select = '#' + Layout.params.BOMSelect + data.dwBomConfigurator
        , selectValue = $(select).val()
        , link = $this.attr('href') + '?ProductID=' + selectValue;

      if (selectValue != "") {
        $target.data('isRemote', true);
        $target.modal({
          remote: link
        });
      }

      return false;
    });

    // Attach custom 'change' event handler on each DOM select element
    // and fire the event named 'priceChanged', which means
    // that total price need to be recalculated
    $('select[id^=' + Layout.params.BOMSelect + ']').on('change', function (e, params){
      var $this = $(this)
        , $option = $this.find('option:selected')
        , priceBox = $this.parents('.product-pricebox')
        , selectData = $this.data()
        , optionData = $option.data()
        , price = optionData.actualPrice.match(/[0-9.,]+/g)[0];

      if (price.indexOf(',') === 1) {
        price = price.replace(/,/g, '');
      }

      if (/data-/.test(selectData.dwBomPriceholder)) {
        var priceholder = selectData.dwBomPriceholder.replace(/data-/, '');
        $this.data(priceholder, price);
      }

      if (!params || (params && !params.init)) {
        priceBox.trigger('priceChanged');
      }
    });

    // Listen the event 'priceChanged' and if it was fired,
    // run recalculation of the total product price
    $('.product-pricebox').on('priceChanged', function (e) {
      var $this = $(this)
        , $priceHolders = $this.find('[data-dw-bom-priceholder]')
        , totalPrice = 0;

      $priceHolders.each(function (index) {
        var $that = $this
          , $this = $(this)
          , holderData = $this.data()
          , price = 0;

        switch (holderData.dwBomPriceholder) {
          case 'text':
            price = $this.text().match(/[0-9.,]+/g)[0];
            if (price.indexOf(',') === 1) {
              price = price.replace(/,/g, '');
            }
            break;
          case 'value':
            // console.log($this.val());
            break;
          default:
            // For some reasone 'case /data-/.test(holderData.dwBomPriceholder):'
            // not working, so I use addition if statement on default case
            if (/data-/.test(holderData.dwBomPriceholder)) {
              var dataAttribute = holderData.dwBomPriceholder.replace(/data-/, '');
              price = holderData[dataAttribute];
            }
        }

        totalPrice += parseFloat(price);
      });

      $(Layout.params.productDetails).find('.product-price-total').html(
        Layout.params.currency.symbol
        + totalPrice.formatMoney(2, '.', ',')
      );
    });

    // Event 'change' need to be fired after page loading
    // to fill all data to each select DOM node.
    // Data will be used on price recalculation function
    $('.product-pricebox select').trigger('change', {
      'init' : true
    });

    // Focus on username input when login form is shown
    $('#LoginBox').on('shown', function(e){
      $(this).find('input[name=username]').focus();
    });
    $('#LoginBox').on('hidden', function(e){
      $(this).find('.loginbox-login-failed').hide();
    });

    // loginbox-login-failed
    if ($('#LoginBox').data().loginFailed) {
      var $message = $('#LoginBox').find('.loginbox-login-failed');
      $('#LoginBox').modal('show');
      $message.show();
    }




    Layout.LoginBox.initialize();
    Layout.ProfileForm.initialize();


    // Check browser support
    $.browserFeatures.checkSupport();

    $.equalHeight(".filter-wrapper h3");

    // IE input placeholder fix
    if (!$.support.placeholder) {
        var active = document.activeElement;
        $(':text').focus(function () {
            if ($(this).attr('placeholder') && $(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
                $(this).val('').removeClass('hasPlaceholder');
            }
        }).blur(function () {
            if ($(this).attr('placeholder') && $(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
                $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
            }
        });
        $(':text').blur();
        $(active).focus();
        $('form').submit(function () {
            $(this).find('.hasPlaceholder').each(function () { $(this).val(''); });
        });
    }

    // obsolete
    $(".addedtocart-links .buymore").live("click", function () {
        $(this).parents(".addedtocart").fadeOut("fast");
    });
    $(".product-incart-overlay .buymore").live("click", function () {
        $(this).parents(".product-incart-overlay").fadeOut("fast");
    });

    // Upadate product list counter (string on sidebar, ie. "1-10 of 20 products")
    $.updateProductsListCounter({
        productList: ".productlist-wrapper[data-productlist-mode='list']",
        productListItem: ".product-list-item-wrapper",
        productTilesList: "",
        productTilesListItem: "",
        itemsDisplayed: "#ProductsDisplayCount",
        productsPerPage: parseInt($("#productsPageSize").html())
    });

    // Remember a user setting of view type
    if ($.getUrlParam("View") && $(".nav-with-ecom-groups").length) {
        var navigation = $(".nav-with-ecom-groups"), view = $.getUrlParam("View");
        navigation.find("a").each(function () {
            var href = $(this).attr("href");
            var sign = href.indexOf("?") == -1 ? "?" : "&";
            $(this).attr("href", href + sign + "View=" + view);
        });
    }

    // Search initialization
    var eComPageId = $('body').data('product-page');
    var eComParagraphId = $('body').data('product-paragraph');
    var eComProductsSearchResult = [];

    // Setting overlay text (overlay is displayed when search filters are submitted)
    eCommerce.Overlay.text('One moment please...');
    eCommerce.Filters.pageId(eComPageId);
    eCommerce.Filters.selectProductsText('Please choose between two and three products for comparison.');

     // InstantSearch plugin setup
    Dynamicweb.Frontend.InstantSearch.setup({
        pageID: eComPageId,
        paragraphID: eComParagraphId,
        url: '/Admin/Public/eCom/InstantSearch.ashx',
        delay: 350
    });

    // Top Instant Search box - Search
    if ($("#q").length) {
        $("#q").focus(); // Placing top search field in focus when page load
        Dynamicweb.Frontend.InstantSearch.setEnableInstantSearch('q', true, {
            contentID: 'product-instant-search', // An ID of the content template
            progressID: 'search-box-preloader-top',
            onItemDataBound: function (sender, args) {
                // Hide product item if product with the same ID already printed
                var bVisible = $("#" + this.contentID).find(".dw-search-result-prodid:contains('" + args.data.ID.toString() + "')").length <= 0;
                args.template.set_isVisible(bVisible);
                // Rander search result template
                var productLink = "/Default.aspx?ID=" + eComPageId + "&ProductID=" + args.data.ID;
                args.template.field("prodid", args.data.ID);
                args.template.field("url", productLink);
                args.template.field("productlink", productLink);
                args.template.field("detailslink", productLink);
                args.template.field('img', '/Admin/Public/GetImage.ashx?Image=/Files/Images/Ecom/Products/' + args.data.Number + '.jpg&Width=64&Height=64');
                args.template.field("name", args.data.Name);
                // args.template.field("number", "Product number: " + args.data.Number);
                args.template.field("number", args.data.Number);
                args.template.field("price", args.data.PriceWithVAT.toFixed(2));
            },
            onBeforeQuery: function (sender, args) {
                args.set_cancel(args.get_value().length < 2);
            },
            onComplete: function () {
                var box = $("#" + this.contentID);
                if (!box.is(":visible")) {
                    //console.log($("#q").val().length);
                    if ($("#q").val().length >= 2) {
                        /* Show results container */
                        box.fadeIn();
                    }
                }
            }
        });
    }

 if (false)
   // Top Instant Search box - Search
	if ($("#q").length) {
        $("#q").focus(); // Placing top search field in focus when page load
        Dynamicweb.Frontend.InstantSearch.setEnableInstantSearch('q', true, {
            contentID: 'product-instant-search', // An ID of the content template
            progressID: 'search-box-preloader-top',
            onItemDataBound: function (sender, args) {
                // Hide product item if product with the same ID already printed
                var bVisible = $("#" + this.contentID).find(".dw-search-result-prodid:contains('" + args.data.ID.toString() + "')").length <= 0;
                args.template.set_isVisible(bVisible);
                // Rander search result template
                var productLink = "/Default.aspx?ID=" + eComPageId + "&ProductID=" + args.data.ID;
                args.template.field("prodid", args.data.ID);
                args.template.field("url", productLink);
                args.template.field("productlink", productLink);
                args.template.field("detailslink", productLink);
                args.template.field('img', '/Admin/Public/GetImage.ashx?Image=/Files/Images/Ecom/Products/' + args.data.Number + '.jpg&Width=64&Height=64');
                args.template.field("name", args.data.Name);
                // args.template.field("number", "Product number: " + args.data.Number);
                args.template.field("number", args.data.Number);
                args.template.field("price", args.data.PriceWithVAT.toFixed(2));
            },
            onBeforeQuery: function (sender, args) {
                args.set_cancel(args.get_value().length < 2);
            }
        });
    }


    // Top Instant Search box - Quick Add
    if ($("#quickaddinput").length) {
        // disabling "cartcmd" input
        $("#quickaddinput").parents("form").find("input[name='cartcmd']").prop('disabled', true);

        Dynamicweb.Frontend.InstantSearch.setEnableInstantSearch('quickaddinput', true, {
            contentID: 'product-quickadd-instant-search', // An ID of the content template
            progressID: 'search-box-preloader-quickadd',
            onItemDataBound: function (sender, args) {
                // Hide product item if product with the same ID already printed
                var bVisible = $("#" + this.contentID).find(".dw-search-result-prodid:contains('" + args.data.ID.toString() + "')").length <= 0;
                args.template.set_isVisible(bVisible);
                // Rander search result template
                var productLink = "/Default.aspx?ID=" + eComPageId + "&ProductID=" + args.data.ID;
                args.template.field("prodid", args.data.ID);
                args.template.field("url", productLink);
                args.template.field("productlink", productLink);
                args.template.field("name", args.data.Name);
                args.template.field("number", args.data.Number);
            },
            onComplete: function () {
                var box = $('#product-quickadd-instant-search');
                var input = $("#quickaddinput");
                if (!box.is(":visible")) {
                    box.css({ left: input.position().left + 8 }).fadeIn();
                }
            }
        });
        $("#product-quickadd-instant-search .dw-search-result-item a").live("click", function (e) {
            e.preventDefault();
            var prodNumber = $(this).parents(".dw-search-result").find(".dw-search-result-number").html();
            $("#quickaddinput").val(prodNumber);
        });
    }

    // Close instant search box when click outside
    instantSearchMouseOver = false;
    $('.product-suggestions-box').live("hover", function () {
        instantSearchMouseOver = true;
    }, function () {
        instantSearchMouseOver = false;
    });
    $(document).mouseup(function () {
        if (!instantSearchMouseOver) $(".product-suggestions-box").fadeOut();
    });

    $(".quick-add form").live("submit", function () {
        //$(this).attr("method", "post");
        $(this).find("input[name='cartcmd']").prop('disabled', false);
        $("input[name='eComQuery']").attr("name", "ProductNumber");
        return true;
    });

    // Select all anchor tag with rel set to tooltip
    var tooltipPositions = {
        top: {
            x: { key: "left", value: -60 },
            y: { key: "bottom", value: 15 }
        },
        bottom: {
            x: { key: "left", value: -55 },
            y: { key: "top", value: 15 }
        },
        left: {
            x: { key: "left", value: -200 },
            y: { key: "top", value: -20 }
        },
        right: {
            x: { key: "right", value: -200 },
            y: { key: "top", value: -20 }
        }
    };
    $('a[data-rel=tooltip]').live("mouseover", function (e) {
        var posX = e.pageX - this.offsetLeft,
            posY = e.pageY - this.offsetTop,
            container = $(this).data("container"),
            position = $(this).data("position"),
            tip;

        if (container) {
            tip = $(container).html();
        } else {
            tip = $(this).attr('title');
            $(this).attr('title', '');
        }

        $(this).append('<div id="tooltip">' + tip + '</div>');

        if (position in tooltipPositions) {
            $('#tooltip').css(tooltipPositions[position].y.key, tooltipPositions[position].y.value);
            $('#tooltip').css(tooltipPositions[position].x.key, tooltipPositions[position].x.value);
        } else {
            $('#tooltip').css('top', e.pageY - $(this).offset().top + 10);
            $('#tooltip').css('left', e.pageX - $(this).offset().left + 10);
        }

        $('#tooltip').fadeIn('500');
        $('#tooltip').fadeTo('10', 1);
    }).live("mousemove", function (e) {
        var prop = $(this).data();
        if (!tooltipPositions.hasOwnProperty(prop.position)) {
            $('#tooltip').css('top', e.pageY - $(this).offset().top + 10);
            $('#tooltip').css('left', e.pageX - $(this).offset().left + 10);
        }
    }).live("mouseout", function () {
        var prop = $(this).data();
        if (!prop.container) {
            $(this).attr('title', $('.tipBody').html());
        }
        $(this).children('div#tooltip').remove();
    });

    //Check Voucher
    $('.check_voucher').click(function () {
        var voucher = $('#EcomOrderVoucherCode').val();
        var item = $(this);
        $.ajax({
            url: '/Admin/Module/eCom_Catalog/dw7/Vouchers/VouchersActions.ashx?cmd=CheckVoucher&code=' + voucher,
            success: function (data) {
                if (data == 'true') {
                    alert(item.data('ok'));
                    $('.check_voucher').hide().next().show();
                }
                else {
                    alert(item.data('error'));
                }
            }
        });
        return false;
    })

    $(".product-list-item-wrapper.version-b2b input[name='quantity']").live("keypress", function (e) {
      var code = (e.keyCode ? e.keyCode : e.which), listItem;
      if (code == 9) {
        listItem = $(this).parents(".product-list-item");
        listItem.next().find("input[name='quantity']").focus();
      }
    });

    // $(document).keydown(function (e) {
    //     $('#product-instant-search, #product-instant-search-bottom, #product-quickadd-instant-search').InstantArrows(e);
    // });

    // Show prices with VAT checkbox
    /*
    .wr_vat - class told you that you are in showVAT mode
    */
    $('.vat_check').click(function () {

        if ($(this).find('input').attr('checked') == 'checked') {
            $('body').addClass('wr_vat');
            //set coockie
            document.cookie = 'pricevat' + "=" + '1' + "; path=/";

        }
        else {
            $('body').removeClass('wr_vat');
            //remove coockie
            document.cookie = 'pricevat' + "=0" + "; expires=-1" + "; path=/";

        }
    })


    if (is_cook_exists() == 1) {
      $('.vat_check input').attr('checked', 'checked');
      $('body').addClass('wr_vat');
    }
    else if (is_cook_exists() == 2) {
      // $('.vat_check input').attr('checked', 'checked');
    }
    else if (is_cook_exists() == 0) {
      $('body').removeClass('wr_vat');
    }

    /* Product related hide/unhide */
   $('.product-details .products-related .product-list-related:lt(3)').each(function () {
        $(this).show();
   })

    // Print order in modal
    $('.print_win').click(function(){
      $(this).parents('.modal').find('.modal-body').printElement({
        overrideElementCSS:[
          designBaseUrl+'/assets/stylesheets/bootstrap.css',
          designBaseUrl+'/assets/stylesheets/bootstrap-responsive.css',
          designBaseUrl+'/assets/stylesheets/layout.css'
        ],
        leaveOpen: true,
        "printBodyOptions": {
          "styleToAdd": 'width:auto; height:auto', //style attributes to add to the body of print document
        }
      });
    })

    // Clicks on B2C first page blocks
    $('.feature-wrapper').on('click', function(){
        location.href = $(this).find('a:first-child').attr('href');
        return false;
    })

    // colors variations thumbs cllicks
    $('.product-tile ul img').hover(function(){
        var path = $(this).data('path');
        $(this).parents('.thumbnail').find('img:eq(0)').attr('src', path);
    }, function(){
        $(this).parents('.thumbnail').find('img:eq(0)').attr('src', $(this).parents('.thumbnail').find('img:eq(0)').data('src'));
    })


    // Don't show this message next time
    $('.added-to-cart a').live('click', function(){
        if($('.dont').is(':checked')){
            $.cookie("donotdisturb", 1, { expires: 10 });
        }
    })
    $('#addedModal').on('hidden', function () {
        if($('.dont').is(':checked')){
            $.cookie("donotdisturb", 1, { expires: 10 });
        }
    })


});

/* RMA DETAILS */

function onValidateForm(paragraphID, orderLinesContainerId, isCreateRMA) {
    var isFormValid = true;

    if (isCreateRMA) {
        if (document.getElementById(paragraphID + "RMATypeID") != null) {
            var typeEl = document.getElementById(paragraphID + "RMATypeID");

            if (typeEl.selectedIndex == -1 || (typeEl.selectedIndex >= 0 && typeEl.options[typeEl.selectedIndex].value == "")) {
                alert("Please specify 'Request type'");
                isFormValid = false;
                typeEl.focus();
            }
        }

        if (isFormValid && orderLinesContainerId != null && orderLinesContainerId != "" && !validateSerialNumbers(paragraphID, orderLinesContainerId)) {
            alert("Select RMA's products");
            isFormValid = false;
        }
    }

    if (isFormValid && document.getElementById(paragraphID + "RMAComment") != null && document.getElementById(paragraphID + "RMAComment").value.length < 1) {
        alert("Please specify '" + (isCreateRMA ? "Additional info" : "Customer comment") + "'");
        document.getElementById(paragraphID + "RMAComment").focus();
        isFormValid = false;
    }

    if (isFormValid && document.getElementById(paragraphID + "HasSubmit") != null) {
        document.getElementById(paragraphID + "HasSubmit").value = "1";
    }

    return isFormValid;
}

function setRmaItem(active, pnCtrlId, commentCtrlId) {
    if (pnCtrlId && pnCtrlId != "" && commentCtrlId && commentCtrlId != "") {
        var ctrl = document.getElementById(pnCtrlId);

        if (ctrl && ctrl != null) {
            ctrl.value = "";
            ctrl.disabled = !active;
        }

        var ctrl = document.getElementById(commentCtrlId);

        if (ctrl && ctrl != null) {
            ctrl.value = "";
            ctrl.style.display = !active ? "none" : "";
        }
    }
}

function validateSerialNumbers(paragraphID, orderLinesContainerId) {
    var result = true;
    var container = document.getElementById(orderLinesContainerId);

    if (container) {
        result = false;

        var checkBoxes = new Array();

        for (var i = 0; i < container.childNodes.length; i++) {
            var childArrays = getCheckBoxes(container.childNodes[i]);

            if (childArrays && childArrays.length > 0) {
                for (var j = 0; j < childArrays.length; j++) {
                    checkBoxes.push(childArrays[j]);
                }
            }
        }

        if (checkBoxes && checkBoxes.length > 0) {
            var preffixId = paragraphID + "OrderLineID";
            for (var i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].id.indexOf(preffixId) >= 0 && checkBoxes[i].checked) {
                    result = true;
                    break;
                }
            }
        }
    }

    return result;
}

function getCheckBoxes(el) {
    var result = new Array();

    if (el) {
        var child = null, serNumberEl = null;

        for (var i = 0; i < el.childNodes.length; i++) {
            child = el.childNodes[i];
            if (child && typeof child.type != "undefined" && child.type == "checkbox")
                result.push(child);

            var childArrays = getCheckBoxes(child);

            if (childArrays && childArrays.length > 0) {
                for (var j = 0; j < childArrays.length; j++) {
                    result.push(childArrays[j]);
                }
            }
        }
    }

    return result;
}

/* CHECKOUT */

// Custom copy main address to shipping address if needed
function copy_address() {
  // need copy all fields
  if($('#deliveryToggle_yes').is(":checked")){
    $('#EcomOrderDeliveryCompany').val($('#EcomOrderCustomerCompany').val());
    $('#EcomOrderDeliveryName').val($('#EcomOrderCustomerName').val());
    $('#EcomOrderDeliveryAddress').val($('#EcomOrderCustomerAddress').val());
    $('#EcomOrderDeliveryZip').val($('#EcomOrderCustomerZip').val());
    $('#EcomOrderDeliveryCity').val($('#EcomOrderCustomerCity').val());
    var index = $('#EcomOrderCustomerCountry option:selected').index();
    $('#EcomOrderDeliveryCountry option:eq('+index+')').attr('selected', 'selected');
  }
}



//Check if coockie exists
function is_cook_exists() {
    var nameEQ = "pricevat=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            if (c.substring(nameEQ.length, c.length) == 1) {
                // console.log('1');
                return 1;
            }
            else if (c.substring(nameEQ.length, c.length) == 0) {
                // console.log('0');
                return 0;
            }

        }
    }
    return 2;
}



Number.prototype.formatMoney = function(c, d, t) {
  var n = this
    , c = isNaN(c = Math.abs(c)) ? 2 : c
    , d = d == undefined ? "," : d
    , t = t == undefined ? "." : t
    , s = n < 0 ? "-" : ""
    , i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + ""
    , j = (j = i.length) > 3 ? j % 3 : 0;

  return s
    + (j ? i.substr(0, j) + t : "")
    + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
    + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};