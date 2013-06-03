/*
 * Mini cart - 
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
var miniCartPopupIsActive = false;

function expandMiniCart() {
	var pos = $(".minicart-content").position();
	var popup = $(".minicart-popup");

    popup.css("top", (pos.top + 65) + "px");
    popup.css("left", (pos.left - 1) + "px");
	popup.css("display", "block");
	
	miniCartPopupIsActive = true;

	$(".minicart-wrapper").addClass("expanded");
}

function collapseMiniCart() {
	if (!miniCartPopupIsActive) return;
	
	var popup = $(".minicart-popup");
	popup.css("display", "none");
	miniCartPopupIsActive = false;

	$(".minicart-wrapper").removeClass("expanded");
}