/*
 * Variant - controls the variant selectors on a product
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
(function ($) {

  var VariantCombinations = []
    , globalCombination = []
    , availibleCombinations = []
    ;
  
		var methods = {
				init: function (options) {
						return this.each(function () {

								var defaultVal = {
										el_globalCombination: $('.globalCombination'),
          el_VariantCombinations: $('.VariantCombinations'),
          variants: []
								};

								var obj = $.extend(defaultVal, options);
								var selObject = $(this);

        // Fill the globalCombination Array
								selObject.find(obj.el_globalCombination).find('div').each(function () {
										var content = $(this).html().split('|');
										var index = $(this).data('name');
										globalCombination[index] = new Array();
										for (var item in content) {
												var value = content[item].split('^');
												if (value[0]) {
														globalCombination[index].push(Array(value[0], value[1], value[2]));
												}
										}
								})

        // Fill the VariantCombinations Array
								var variant = selObject.find(obj.el_VariantCombinations).html().split('|');
								for (var part in variant) {
										if (variant[part]) {
            var _ids = variant[part].split('.');
            for (var id in _ids) {
              if (obj.variants.indexOf(_ids[id]) == -1) {
                obj.variants.push(_ids[id]);
              }  
            }
												VariantCombinations.push(variant[part]);
										}
								}

        // Delegate event handlers
        $(selObject).on('change', 'select', function (event) {
          selectHandler(event.target, selObject);
        });
        $(selObject).on('click', 'img[class!=off]', function (event) {
          imgHandler(event.target, selObject);
        });

        // Filters UI generation
								for (var group in globalCombination) {
          availibleCombinations[group] = [];

          if (group == 'Colors') {
            selObject.append('<p>' + group + ':</p>');
            
												for (var prop in globalCombination[group]) {
              if (obj.variants.indexOf(globalCombination[group][prop][1]) == -1) {
                continue;
												}
														selObject.append('<img data-value="' + globalCombination[group][prop][1] + '" src="/Files' + globalCombination[group][prop][2] + '" />');
              availibleCombinations[group].push(globalCombination[group][prop]);
												}

            if (availibleCombinations[group].length == 1) {
              var singleOption = $('img[data-value="'+availibleCombinations[group][0][1]+'"]', selObject);
              singleOption.trigger('click');
										}

          } else /*if (group == 'Sizes')*/ {
            selObject.append('<p>' + group + ':</p>');

            var select = $('<select>', {
              'class': 'input-large'
            });
            
            $('<option>', {
              'value': '0',
              'text': 'Select ' + group
            }).appendTo(select);

            select.appendTo(selObject);

            for (var prop in globalCombination[group]) {
              if (obj.variants.indexOf(globalCombination[group][prop][1]) == -1) {
                continue;
														}
              $('<option>', {
                'value': globalCombination[group][prop][1],
                'text': globalCombination[group][prop][0]
              }).appendTo(select);
              availibleCombinations[group].push(globalCombination[group][prop]);
												}

            if (availibleCombinations[group].length == 1) {
              var singleOption = $('option[value="'+availibleCombinations[group][0][1]+'"]', selObject);
              singleOption.trigger('click');
												}
										}
												}

        globalCombination = [];

						});
				},

				destroy: function (options) {
						return $(this).each(function () {
								var selObject = $(this);
								selObject.find('img[class!=off]').unbind('click');
								selObject.find('select').unbind('change');
								return;
						});
				}
		};

		$.fn.variantSelector = function () {
				var method = arguments[0];
				if (methods[method]) {
						method = methods[method];
						arguments = Array.prototype.slice.call(arguments, 1);
				} else if (typeof (method) == 'object' || !method) {
						method = methods.init;
				} else {
						$.error('Method ' + method + ' does not exist');
						return this;
				}

				return method.apply(this, arguments);
		}

  function generateSelectedVariant(wrapper, states) {
    var $wrapper = $(wrapper)
      , inputVariant = $wrapper.find('input[name="variantid"]')
      , resultCombination = ''
      , standartLength = VariantCombinations[0].split('.').length
      , currentState = states || getCurrentState(wrapper).map
      ;

    if (currentState.length == standartLength) {
      resultCombination = currentState.join('.');
    }

    inputVariant.val(resultCombination);
  }

  function getCurrentState(wrapper) {
    var states = []
      , color = $('img.act').data('value')
      , expr = ''
      ;

    if (color && color != '0') {
      states.push(color);
      expr += '(?=.*' + color + ').*';
    }

    $('option:selected', wrapper).each(function (index, el) {
      var value = $(el).val();
      if (value && value != '0') {
        states.push(value);
        expr += '(?=.*' + value + ').*';
      }
		});

    return {
      map: states,
      regexp: new RegExp(expr)
    };
  }

  function selectHandler(obj, wrapper) {
    var $obj = $(obj)
      , $wrapper = $(wrapper)
      , states = getCurrentState(wrapper)
      , sel = $obj.find('option:selected').attr('value')
      , ar = ''
      ;
    
    // $wrapper.find('img').removeClass('off');

    if (sel != 0) {

      for (var item in VariantCombinations) {
        if (states.regexp.test(VariantCombinations[item])) {
          ar += VariantCombinations[item];
        }
        // if (tempCompare(VariantCombinations[item], states)) {
        //   ar += VariantCombinations[item];
        // }
        // if (VariantCombinations[item].indexOf(sel) != -1) {
        //   ar += VariantCombinations[item];
        // }
      }

      // $('img', wrapper).each(function (index, img) {
      //   var $img = $(img);
      //   if (ar.indexOf($img.data('value')) == -1) {
      //     $img.addClass('off');
      //   } else {
      //     $img.removeClass('off');
      //   }
      // });

      $('select', wrapper).not(obj).each(function (index, select) {
        var $select = $(select);
        $('option', select).each(function (index, option) {
          var $option = $(option);
          if (ar.indexOf($option.attr('value')) == -1 && $option.val() != 0) {
            $option.attr('disabled', 'disabled');
          } else {
            $option.removeAttr('disabled');
          }
        });
      });

    }
    
    generateSelectedVariant(wrapper, states.map);
  }

  function imgHandler(obj, wrapper) {
    var $obj = $(obj)
      , sel = $obj.data('value')
      , states = []
      , ar = ''
      ;

    $('img', wrapper).removeClass('act');
    $obj.addClass('act');

    states = getCurrentState(wrapper);

    for (var item in VariantCombinations) {
      if (states.regexp.test(VariantCombinations[item])) {
        ar += VariantCombinations[item];
      }
      // if (VariantCombinations[item].indexOf(sel) != -1) {
      //   ar += VariantCombinations[item];
      // }
      // if (tempCompare(VariantCombinations[item], states)) {
      //   ar += VariantCombinations[item];
      // }
    }

    $('select', wrapper).each(function (index, select) {
      var $select = $(select);
      $('option', select).each(function (index, option) {
        var $option = $(option);
        if (ar.indexOf($option.attr('value')) == -1 && $option.val() != 0) {
          $option.attr('disabled', 'disabled');
        } else {
          $option.removeAttr('disabled');
        }
      });
    });

    generateSelectedVariant(wrapper, states.map);
  } 

  function tempCompare(string, array) {
    var result = true;

    for (var i in array) {
      if (string.indexOf(array[i]) === -1) {
        result = false;
        break;
      }
    }

    return result;
  }

} (jQuery));
