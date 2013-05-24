/*
 * Variant - 
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
(function ($) {

    var methods = {
        init: function (options) {
            return this.each(function () {

                var defaultVal = {
                    el_globalCombination: $('.globalCombination'),
                    el_VariantCombinations: $('.VariantCombinations')
                };

                var obj = $.extend(defaultVal, options);
                var selObject = $(this);

                // Get globalCombination Array
                var globalCombination = new Array();
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

                //Get VariantCombinations Array
                var VariantCombinations = new Array();
                var variant = selObject.find(obj.el_VariantCombinations).html().split('|');
                for (var part in variant) {
                    if (variant[part]) {
                        VariantCombinations.push(variant[part]);
                    }
                }


                // Variant Chooser Generating
                for (var group in globalCombination) {
                    if (group == 'Sizes') {
                        selObject.append('<p>' + group + ':</p>').append('<select class="input-large"><option value="0">Select ' + group + '</option></select>');
                        for (var prop in globalCombination[group]) {
                            selObject.find('select').append('<option value="' + globalCombination[group][prop][1] + '">' + globalCombination[group][prop][0] + '</option>');
                        }
                    }
                    else {
                        selObject.append('<p>' + group + ':</p>');
                        for (var prop in globalCombination[group]) {
                            selObject.append('<img data-value="' + globalCombination[group][prop][1] + '" src="/Files' + globalCombination[group][prop][2] + '" />');
                        }
                    }
                }
                globalCombination = [];

                //Dropdown change
                selObject.find('select').bind('change', function () {
                    selObject.find('img').removeClass('off');
                    var sel = $(this).find('option:selected').attr('value');
                    if (sel != 0) {
                        var ar = '';
                        for (var item in VariantCombinations) {
                            if (VariantCombinations[item].search(sel) != -1) {
                                ar += VariantCombinations[item];
                            }
                        }
                        selObject.find('img').each(function () {
                            if (ar.search($(this).data('value')) == -1) {
                                $(this).addClass('off');
                            }
                            else {
                                $(this).removeClass('off');
                            }
                        })
                    }
                    match();
                })

                //Color click
                selObject.find('img[class!=off]').bind('click', function () {
                    selObject.find('img').removeClass('act');
                    $(this).addClass('act');
                    var sel = $(this).data('value');
                    var ar = '';
                    for (var item in VariantCombinations) {
                        if (VariantCombinations[item].search(sel) != -1) {
                            ar += VariantCombinations[item];
                        }
                    }
                    selObject.find('select option').each(function () {
                        if (ar.search($(this).attr('value')) == -1 && $(this).val() != 0) {
                            $(this).attr('disabled', 'disabled');
                        }
                        else {
                            $(this).removeAttr('disabled');
                        }
                    })
                    match();
                })

                function match() {
                    if (selObject.find('img.act').length && selObject.find('option:selected').val() != 0) {
                        selObject.find('input[name="variantid"]').val(selObject.find('img.act').data('value') + '.' + selObject.find('option:selected').val());
                    }
                    else {
                        selObject.find('input[name="variantid"]').val('');
                    }
                };


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

} (jQuery));