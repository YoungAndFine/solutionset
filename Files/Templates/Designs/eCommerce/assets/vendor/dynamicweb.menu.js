/*
 * Menu - controls the menu should be shown normally or collapsed
 *
 * Copyright (c) 2013 Dynamicweb
 *
 * Licensed under the MIT license:
 *	 http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *	 https://github.com/dynamicweb/solutionset
 *
 * Version: 0.9.0
 *
 */
(function($, undefined) {
	// Resize event when browser if finished resizing
		// http://stackoverflow.com/a/4298672
		var debouncer = function( func , timeout ) {
				var timeoutID , timeout = timeout || 200;
				return function () {
						var scope = this , args = arguments;
						clearTimeout( timeoutID );
						timeoutID = setTimeout( function () {
								func.apply( scope , Array.prototype.slice.call( args ) );
						} , timeout );
				}
		}

		$.fn.wrapMenu = function(options) {
				var settings = $.extend({
						itemClass: 'wrapped',
						isWrappedClass: 'expandable',
						expandedClass: 'expanded',
						toggleButtonSelector: '.btn-navbar',
						layoutOnResize: true,
						resizeTimeout: 200
				}, options),

				/**
				 * Add settings.itemClass to all menu items that are not on the
				 * first line of items, i.e the ones that would overflow the
				 * browser window horizontally
				 */
				layout = function() {
						var $this = $(this),
						overflowed = false,
						data = $this.data(),
						top;
						this.reset({equable: data.equable});

						$('.nav > li', $this).each(function(index, el) {
								if (index == 0) {
										top = $(el).offset().top;
								} else if (overflowed || (top < $(el).offset().top)) {
										$(el).addClass(settings.itemClass);
										$this.addClass(settings.isWrappedClass);
										overflowed = true;
								}
						});

						if (data.equable && overflowed) {
								var wrappedItemsCount = $('.nav > li.wrapped', $this).length,
								allItemsCount = $('.nav > li', $this).length,
								notWrapped;

								notWrapped = allItemsCount - wrappedItemsCount;
								$('.nav > li', $this).each(function(index, el) {
										$(el).css("min-width", $(el).width());
										$(el).css("width", 100/notWrapped + "%");
								});
						};
				},

				/**
				 * Reset all menu items
				 */
				reset = function(params) {
						var $this = $(this),
						params = params || {};
						$('.nav > li', $this).removeClass(settings.itemClass);
						if (params.equable) {
								$('.nav > li', $this).css("width", "auto")
						}
						$this.removeClass(settings.isWrappedClass);
				},

				/**
				 * Toggle display of hidden menu items.
				 */
				toggle = function() {
						var $this = $(this);
						$this.toggleClass(settings.expandedClass);
						return $this.hasClass(settings.expandedClass);
				};

				return this.each(function() {
						var $this = $(this), scope = this;

						this.reset = reset;
						this.layout = layout;
						this.toggle = toggle;
						this.layout();

						if (settings.layoutOnResize) {
								$(window).resize(debouncer(function(event) {
										scope.layout();
								}, settings.resizeTimeout));
						}

						$(settings.toggleButtonSelector, $this).on('click', function() {
								scope.toggle();
						});
				});
		}

		// Automatically process select navbars
		$(document).ready(function() {
				$('.navbar.wrappable').wrapMenu();
		});
}(jQuery));
