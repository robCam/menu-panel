var RCAM = RCAM || {},

    nextFrame = (function (window) {
        'use strict';
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || function(callback) { window.setTimeout(callback, 1000 / 60); };
    }(this));

RCAM.widgets = RCAM.widgets || {};

RCAM.widgets.NavPanel = (function (global) {

    'use strict';

    /*jslint nomen:true*/

    var doc = global.document;

    function NavPanel(el, options) {

        /**
         * Ensure the constructor is new-agnostic
         * Checks the receiver value is a proper instance of Header.
         * This ensures no error if instantiated without 'new' keyword.
         */
        if (!(this instanceof NavPanel)) {
            return new NavPanel(el, options);
        }

        /**
         * Object containing the default configuration options.
         * (These defults are used when no options are provided on intantiation)
         * @property options
         * @type Object
         */
        this.options = {
            foobar : null
        };

        // Merge/replace the user defined options
        this._extend(this.options, options);

        /**
         * The DOM node.
         * @property el
         * @type Object
         */
        this.el = typeof el === 'object' ? el : doc.getElementById(el);

        /*this.el.style.cssText += param.cssVendorPref + 'transform: translate3d(0, -100%, 0);';*/

        this.el.classList.toggle('main-header__nav--hidden');
    }

    NavPanel.prototype = {

        constructor: NavPanel,

        /**
         * Enumerate properties of the 'source' object and copy them to the 'target'.
         * @method _extend
         * @private
         */
        _extend : function (target, source) {
            var i;
            if (typeof source === 'object') {
                for (i in source) {
                    if (source.hasOwnProperty(i)) {
                        target[i] = source[i];
                    }
                }
            }
        },

        /**
         * Toggles the active/non-active el state.
         * @method toggleTray
         * @example
             el.toggleState();
         */
        toggleState : function () {
            var self = this;

            nextFrame(function() {
                self.el.classList.toggle('main-header__nav--hidden');
            });

            if (this.options.onToggleState) {
                this.options.onToggleState.call(self);
            }

            this.isActive = this.isActive ? false : true;
        }

    };

    return NavPanel;

}(this));
