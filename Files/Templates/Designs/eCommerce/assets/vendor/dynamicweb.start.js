/*
 * Start -
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
if (typeof designBaseUrl === 'undefined') {
	alert('designBaseUrl is not defined');
}

require.config({
  baseUrl: designBaseUrl+'/assets/vendor/',
  paths: {
    "InstantSearch" : "/Admin/Content/JsLib/dw/InstantSearch.min",
    // jQuery and its plugins
    "jquery": "empty:",
    "jquery-ui" : "../vendor/jquery-ui-1.8.23.custom.min",
    "touch-punch" : "../vendor/jquery.ui.touch-punch.min",
    "jquery-autocomplete" : "jquery.ui.autocompleteAddress",
    "jquery-query" : "../vendor/jquery.query.min",
    "jquery-lazyload" : "../vendor/jquery.lazyload",
    "jquery-wrapmenu" : "jquery.wrapMenu",
    "jquery-productsload" : "jquery.productsAutoLoad",
    "jquery-instantarrows": "jquery.instantArrows",
    "jquery-printElement" : "../vendor/jquery.printElement",
    "jquery-zoom" : "../vendor/jquery.zoom",
    "jquery-cookie" : "../vendor/jquery.cookie",
    // Bootstrap JS and its componetns
    "bootstrap" : "../vendor/bootstrap/bootstrap",
    "dw-carousel" : "bootstrap-thumbnailsCarousel",
		"filters" : "dynamicweb.filters",
		"layout" : "dynamicweb.layout"
  },
  shim: {
    "layout" : [
      "jquery",
      "jquery-query",
      "jquery-ui",
      "touch-punch",
      "filters",
      "InstantSearch" // Need to change code to avoid this dependence
    ],
    "filters" : [
      "jquery",
      "jquery-ui",
      "jquery-query"
    ],
    "jquery-printElement" :["jquery"],
    "jquery-ui" : ["jquery"],
    "touch-punch" : ["jquery-ui"],
    "jquery-autocomplete" : ["jquery", "jquery-ui"],
    "jquery-query" : ["jquery"],
    "jquery-lazyload" : ["jquery"],
    "query-productsload" : ["jquery"],
    "jquery-wrapmenu" : ["jquery"],
    "bootstrap": ["jquery"],
    "dw-carousel" : ["bootstrap"]
  }
});

require(
  [
    "jquery",
    "layout",
    "bootstrap",
    "jquery-wrapmenu",
    "jquery-instantarrows"
  ],
  function ($) {

    $(document).ready(function () {
      $(".carousel").carousel();
      $("body").on("hidden", ".modal", function () {
        $(this).removeData("modal");
      });
      $('body').on('click.collapse-next.data-api', '[data-toggle=collapse-next]', function (e) {
        var $this = $(this)
          , $target = $(this).parents(".collapse-container").find(".collapse");
        $target.collapse('toggle');
        $this[!$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
      });
    });

    $(document).keydown(function (e) {
      $("#product-instant-search, #product-instant-search-bottom, #product-quickadd-instant-search").InstantArrows(e);
    });

  }
);
