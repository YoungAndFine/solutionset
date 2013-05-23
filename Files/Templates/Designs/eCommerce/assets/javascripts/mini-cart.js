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