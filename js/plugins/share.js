(function($) {

    "use strict";

    $.fn.share = function(options) {

        var defaults = {
            threshold: 0,
            abbreviate: true,
            counts: false
        }

        var $this = this,
            settings = $.extend(defaults, options);

        var init = function($element) {

            var options = {
                url: (typeof $element.data('url') !== 'undefined') ? $element.data('url') : document.URL,
                message: (typeof $element.data('message') !== 'undefined') ? $element.data('message') : false,
                via: (typeof $element.data('via') !== 'undefined') ? $element.data('via') : false,
                popup: (typeof $element.data('popup') !== 'undefined') ? $element.data('popup') : true,
                count: (typeof $element.data('count') !== 'undefined') ? $element.data('count') : settings.counts,
                network: (typeof $element.data('share') !== 'undefined') ? $element.data('share') : "facebook"
            }

            if(options.count)
                var $count = $('<span class="js-share-count"/>');

            $element.addClass("js-share");

            switch (options.network) {

                case 'facebook':

                    var params = {
                        u: options.url
                    }
                    var url = 'http://www.facebook.com/sharer/sharer.php?' + parameters(params);

                    $element
                        .addClass("js-share-facebook")
                        .attr("href", url);

                    if (options.count) {
                        $.getJSON("http://graph.facebook.com/" + options.url, function(data) {
                            if (data.shares > settings.threshold)
                                $count.text(abbreviate(data.shares)).removeClass('js-share-count-loading').appendTo($element);
                        });
                    }

                    break;

                case 'twitter':

                    var params = {
                        via: options.via ? options.via : "",
                        text: options.message ? options.message : "",
                        url: options.url
                    }
                    var url = 'https://twitter.com/intent/tweet?' + parameters(params);

                    $element
                        .addClass("js-share-twitter")
                        .attr("href", url);

                    if (options.count) {
                        $.getJSON("http://urls.api.twitter.com/1/urls/count.json?url=" + options.url + "&callback=?", function(data) {
                            if (data.count > settings.threshold)
                                $count.text(abbreviate(data.count)).removeClass('js-share-count-loading').appendTo($element);
                        });
                    }

                    break;

            }

            if (options.popup) {

                $element.attr({
                    rel: "external",
                    target: "_blank"
                });

                $element.click(function(event) {
                    open($(this).attr("href"));
                    return false;
                });

            }


        };

        var abbreviate = function(number) {

            if (!settings.abbreviate) return number;

            number = number.toString();

            if (number.length > 6)
                return number.substr(0, 1) + "." + number.substr(1, 1) + "m";
            else if (number.length > 5)
                return number.substr(0, 3) + "k";
            else if (number.length > 5)
                return number.substr(0, 3) + "k";
            else if (number.length > 4)
                return number.substr(0, 2) + "k";
            else if (number.length > 3)
                return number.substr(0, 1) + "." + number.substr(1, 1) + "k";
            else
                return number;
        }

        var open = function(url, w, h) {
            var w = typeof w !== 'undefined' ? w : 600,
                h = typeof h !== 'undefined' ? h : 300,
                left = (screen.width / 2) - (w / 2),
                top = (screen.height / 2) - (h / 2);
            window.open(url, "MsgWindow", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
        }

        var parameters = function(obj) {
            if (!Object.keys) {
                Object.keys = function(obj) {
                    var keys = [];
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            keys.push(i);
                        }
                    }
                    return keys;
                };
            }
            return $.map(Object.keys(obj), function(key) {
                if (!obj[key]) return "";
                return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
            }).join('&');
        }

        return this.each(function() {

            init($(this));

        });

    };

}(jQuery));