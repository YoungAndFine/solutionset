/*
 * Filters
 *
 * Contains:
 * - eCommerce.Overlay: overlay with the wait/loading message
 * - eCommerce.Filters: controls filters on product list page
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
if (typeof (eCommerce) == 'undefined') {
	var eCommerce = new Object();
}

/* Represents an overlay */
eCommerce.Overlay = {
	backgroundElement: null,
	textElement: null,

	/* Gets or sets overlay text */
	text: function (value) {
		var ret = '';

		this.ensureLayout();

		if (!value || !value.length) {
			ret = this.textElement.find('span').text();
		} else {
			ret = value;
			this.textElement.find('span').text(value);
		}

		return ret;
	},

	/* Shows the overlay above the given container */
	show: function (container) {
		if (container) {
			container = $(container);

			this.ensureLayout();
			this.backgroundElement.appendTo(container);
			this.textElement.appendTo(container);

			this.backgroundElement.show();
			this.textElement.show();

			this.backgroundElement.animate({ opacity: 0.3 }, { duration: 200, queue: false });
			this.textElement.animate({ opacity: 1.0 }, { duration: 150, queue: false });
		}
	},

	/* Hides the overlay */
	hide: function () {
		if (this.backgroundElement) {
			this.backgroundElement.hide();
			this.backgroundElement.css({ opacity: 0 });
		}
		if (this.textElement) {
			this.textElement.css({ opacity: 0.5 });
			this.textElement.hide();
		}
	},

	/* Ensures that overlay is created */
	ensureLayout: function () {
		if (!this.backgroundElement || !this.backgroundElement.length) {
			this.backgroundElement = $('<div id="page-progress-overlay" class="overlay-animated"></div>').css({ opacity: 0 }).hide().appendTo(document.body);
		}

		if (!this.textElement || !this.textElement.length) {
			this.textElement = $('<div id="page-progress-overlay-text" class="overlay-animated"><div>' +
													 '<img src="/Admin/Images/Ribbon/UI/Overlay/wait.gif" alt="" title="" /><span>&nbsp;</span></div></div>').css({ opacity: 0.5 }).hide().appendTo(document.body);
		}
	},

	/* Initializes the overlay */
	initialize: function () {
		/* Preloading the progress image */
		var img = new Image(36, 36);
		img.src = '/Admin/Images/Ribbon/UI/Overlay/wait.gif';
	}
}

/* Provides methods for manipulating search filters */
eCommerce.Filters = {
	_pageId: 0,
	_submitTimer: null,
	_selectProductsText: '',

	/* Gets or sets the Id of the eCom catalog page */
	pageId: function (value) {
		if (typeof (value) != 'undefined' && value != null) {
			this._pageId = parseInt(value, 10) || 0;
		}

		return this._pageId;
	},

	/* Gets or sets the "Select products to compare" text */
	selectProductsText: function (value) {
		if (typeof (value) != 'undefined' && value != null) {
			this._selectProductsText = value.toString();
		}

		return this._selectProductsText;
	},

	/* Initializes the filters */
	initialize: function () {
		var self = this;

		var initializeDropDown = function (id, keys) {
			var val = 0;
			var values = [];

			if (keys && keys.length) {
				for (var i = 0; i < keys.length; i++) {
					val = $.query.get(keys[i]);
					if (val != null && val.toString().length) {
						values[values.length] = val.toString();
					}
				}
			}

			if (values.length) {
				$('#' + id).val(values.join(','));
			}
		}

		var initializeSlider = function (slider) {
			var isRange = false;
			var from = 0, to = 0;
			var valueField = null;
			var requestValue = null;
			var fromValue = 0, toValue = 0;

			var onSlide = function (event, ui) {
				var e = $(this);
				var wrapper = e.parents('.filter-slider-container-wrapper');
				var sliderValueTo = wrapper.siblings('.filter-slider-to').find('.filter-slider-to-value');
				var sliderValueFrom = wrapper.siblings('.filter-slider-from').find('.filter-slider-from-value');

				sliderValueTo.html(ui.values[1]);
				sliderValueFrom.html(ui.values[0]);
			}

			slider = $(slider);

			isRange = slider.attr('data-slider-range') == 'true';
			from = parseInt(slider.attr('data-slider-from')) || 0;
			to = parseInt(slider.attr('data-slider-to')) || 100;
			fromValue = parseInt(slider.attr('data-slider-value-from')) || 0;
			toValue = parseInt(slider.attr('data-slider-value-to')) || 100;

			valueField = slider.next('.filter-slider-value-container');
			requestValue = $.query.get(valueField.attr('name'));

			/*Clearing the postback value of a slider if it wasn't submitted before (making bounds context sensitive)*/
			if (requestValue == null || (typeof (requestValue) == 'string' && !requestValue.length) || requestValue == true) {
				valueField.val('');
			} else {
				onSlide.call(slider, null, { values: [fromValue, toValue] });
			}

			slider.slider({
				range: isRange,
				min: from,
				max: to,
				values: [fromValue, toValue],

				stop: function () {
					var e = $(this);
					var field = e.next('.filter-slider-value-container');
					var values = [e.slider('values', 0), e.slider('values', 1)];

					if (field && field.length) {
						field.val(values[0] + '-' + values[1]);
						self.beginSubmit();
					}
				},
				slide: onSlide
			});
		}

		/* Iterating over each filter */
		$('.filter-container').each(function () {
			var hasSelectedOptions = false;
			var options = $(this).find('input.filter-option-value');

			/* Determining if there are any options that are selected */
			for (var i = 0; i < options.length; i++) {
				if (options[i].checked) {
					hasSelectedOptions = true;
				}
			}

			/* No options selected - selecting "All" option */
			if (!hasSelectedOptions) {
				$(this).find('input.filter-option-all-value').each(function () {
					this.checked = true;
				});
			}
		});

		/* Initializing "Sort by" and "Page size" drop-down lists */
		initializeDropDown('lstOrderBy', ['SortBy', 'SortOrder']);
		initializeDropDown('lstPageSize', ['PageSize']);

		/* Creating sliders */
		$('.filter-slider-container').each(function () {
			initializeSlider(this);
		});

		/* Initializing view mode for list */
		$('.list-mode [data-list-mode]').click(function (e) {
			location.search = $.query.set('View', $(e.target).attr('data-list-mode')).toString();
		});
	},

	/* Starts a timer by which the form containing filters is submitted */
	beginSubmit: function () {
		var self = this;

		if (this._submitTimer) {
			clearTimeout(this._submitTimer);
			this._submitTimer = null;
		}

		eCommerce.Overlay.show(document.body);

		this._submitTimer = setTimeout(function () {
			self.submit();
		}, 200);
	},

	/* Submits the form containing filters */
	submit: function () {
		var form = $('form.form-filters');
		form.find(':input[value=""]').attr("disabled", "disabled");

		if (form && form.length) {
			var checkboxValues = {},
			queryString = '';

			queryString = $(':input', 'form.form-filters').filter(function(){
				var $this = $(this),
				key = $this.attr('name'),
				val = $this.val();

				if (key == 'ID' || key == 'GroupID') {
					return false;
				}

				if ($this.is(':checkbox') && $this.val()) {
					if (!$this.prop('checked')) {
						return false;
					}

					if (checkboxValues[key]) {
						if (typeof checkboxValues[key] === 'string') {
							var t = checkboxValues[key];
							checkboxValues[key] = [];
							checkboxValues[key].push(t);
						}
						checkboxValues[key].push(val);
					} else {
						checkboxValues[key] = val;
					}
				}

				return !$this.is(':checkbox') && $this.val();
			}).serialize();

			$.map(checkboxValues, function (val, i) {
				var separator = queryString.length ? '&' : '',
				parameter = '';

				if (typeof val === 'array') {
					parameter = i + '=' + val.join(',');
				} else {
					parameter = i + '=' + val;
				}

				queryString += separator + parameter;
			});

			location.href = location.pathname + (queryString.length ? '?' + queryString : '');
		}
	},

	/* Handles "All" filter option "checked" event */
	onAllChecked: function (checkbox) {
		var options = null;

		/* Deselecting all filter options except of "All" */
		if (checkbox.checked) {
			options = $(checkbox).parents('ul').find('input.filter-option-value');

			options.each(function () {
				this.checked = false;
			});

			this.beginSubmit();
		}
	},

	/* Handles filter option "checked" event */
	onCheched: function (checkbox) {
		var option = null;

		/* Deselecting "All" option */
		if (checkbox.checked) {
			option = $(checkbox).parents('ul').find('input.filter-option-all-value');

			if (option && option.length) {
				option[0].checked = false;
			}
		}

		this.beginSubmit();
	},

	/* Reorders products according to parameters */
	reoderProducts: function (params) {
		var url = '';
		var query = null;
		var pageSize = 10;
		var field = '', direction = '';
		var orderByValue = '', pageSizeValue = '';

		if (!params) params = {};

		pageSizeValue = $('#lstPageSize :selected').val();
		orderByValue = ($('#lstOrderBy :selected').val() || '').split(',');

		/* Order by field */
		if (!params.orderByField || !params.orderByField.length) {
			field = orderByValue && orderByValue.length ? orderByValue[0] : '';
		} else {
			field = params.orderByField;
		}

		/* Order by direction */
		if (!params.orderByDirection || !params.orderByDirection.length) {
			direction = orderByValue && orderByValue.length > 1 ? orderByValue[1] : '';
		} else {
			direction = params.orderByDirection;
		}

		/* Page size */
		if (typeof (params.pageSize) == 'undefined' || params.pageSize == null) {
			pageSize = parseInt(pageSizeValue, 10);
		} else {
			pageSize = parseInt(params.pageSize, 10);
		}

		/* Building the resulting URL */
		if (field && field.length) query = $.query.set('SortBy', field);
		if (direction && direction.length) query = (query || $.query).set('SortOrder', direction.toUpperCase());
		if (pageSize > 0) query = (query || $.query).set('PageNum', '1').set('PageSize', pageSize.toString());

		location.search = query.toString().replace(new RegExp("\%2B", "g"), "+");
	},

	/* Compares the given products */
	compareProducts: function (products) {
		if (!products || !products.length) {
			products = [];

			$('input.product-compare-selection:checked').each(function () {
				products[products.length] = $(this).val();
			});
		}
		var pageid = $('body').data('pageid')
		, layoutPath = "&LayoutTemplate=Designs/"+designName+"/Main.html";
		location.href = '/Default.aspx' + $.query.empty().set('ID', pageid.toString()).set('Compare', products.join(',')) + layoutPath;
	}
};


$(document).ready(function () {
	eCommerce.Overlay.initialize();
	eCommerce.Filters.initialize();

	$('input.filter-option-all-value').change(function (e) {
		eCommerce.Filters.onAllChecked(e.target);
	});

	$('input.filter-option-value').change(function (e) {
		eCommerce.Filters.onCheched(e.target);
	});

	$.each(['#lstOrderBy', '#lstPageSize'], function (index, value) {
		$(value).change(function () { eCommerce.Filters.reoderProducts(); });
	});

	$('button.product-compare-activator').click(function (e) {
		var productsCount = $('input.product-compare-selection:checked').length;

		e.preventDefault();

		if (productsCount < 2 || productsCount > 3) {
			alert(eCommerce.Filters.selectProductsText());
		} else {
			eCommerce.Filters.compareProducts();
		}
	});

});

$(window).bind('unload', function () {
	/* Hiding an overlay so when user clicks "Back" it won't be shown */
	eCommerce.Overlay.hide();
});
