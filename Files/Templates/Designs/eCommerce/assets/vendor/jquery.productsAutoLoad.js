/**
 * A jQuery plugin for auto load product from products list
 * (c) Dynamicweb
 */
(function ($) {

    $.fn.productsAutoLoad = function (options) {
        if (options) {
            options = $.extend({}, $.fn.productsAutoLoad.defaultOptions, options);
        } else {
            options = $.fn.productsAutoLoad.defaultOptions;
        }

        return this.each(function () {
            var context = {
                options: options,
                target: $(this)
            };

            if (init(context)) {
                $(window).scroll(function () {
                    scrollHandler(context);
                });
            } else { }

        });
    };

    $.fn.productsAutoLoad.defaultOptions = {
        debug: false,
        requestPath: null,
        amountSelector: "#allProductCount",
        pageSizeSelector: "#productsPageSize",
        pagingSelector: null,
        productsContainer: null,
        bottomDistance: 100,
        isActive: false,
        onProductsLoaded: function () { }
    }

    function scrollHandler(context) {
        var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
        if (scrollBottom < context.options.bottomDistance && !context.options.isActive) {
            loadProducts(context);
        }
    }

    function loadProducts(context) {
        var jqXHR,
        url = context.options.requestPath,
        windowQuery = window.location.search.substring(1),
        container = $(context.options.productsContainer);

        if (context.options.currentPage >= context.options.pageCount) return;

        context.options.currentPage++;
        url += ((context.options.requestPath.indexOf('?') === -1) ? '?' : '&') + (windowQuery.length ? windowQuery + "&" : "") + 'PageNum=' + context.options.currentPage;

        jqXHR = $.ajax({
            url: url,
            dataType: "html",
            beforeSend: function () {
                context.options.isActive = true;
                eCommerce.Overlay.show(document.body);
            },
            success: function (data) {
                eCommerce.Overlay.hide();
                // console.log(data);
                //.find("table tbody")
                var productItems = $(data).filter("div#content-main");
                //container.append(productItems[0].outerHTML);
                container.append(productItems.html());
                context.options.onProductsLoaded();
            },
            complete: function () {
                eCommerce.Overlay.hide();
                context.options.isActive = false;
            }
        });

        return;
    };

    function init(context) {
        try {
            var options = context.options;

            if (options.requestPath === null) {
                throw "productsAutoLoad ==> Plugin option 'requestPath' must be specified";
            };
            if (options.productsContainer === null) {
                throw "productsAutoLoad ==> Plugin option 'productsContainer' must be specified";
            };

            var productAmount = parseInt($(options.amountSelector).html());
            var productPageSize = parseInt($(options.pageSizeSelector).html());
            var productPageCount = Math.ceil(productAmount / productPageSize);

            if (productAmount <= productPageSize) {
                throw "productsAutoLoad ==> Not enough products in the list";
            };

            $.extend(context.options, {
                amount: productAmount,
                pageSize: productPageSize,
                pageCount: productPageCount,
                currentPage: 1
            });

            if (context.options.pagingSelector !== null) {
                $(context.options.pagingSelector).hide();
            }

            return true;
        } catch (e) {
            if (context.options.debug) console.log(e);
            return false;
        }
    }

})(jQuery);