var RCAM = RCAM || {},

    nextFrame = (function (window) {
        'use strict';
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || function(callback) { window.setTimeout(callback, 1000 / 60); };
    }(this));

RCAM.widgets = RCAM.widgets || {};

RCAM.widgets.ContentFade = (function (global) {

    'use strict';

    /*jslint nomen:true*/

    var param = RCAM.param,
        doc = global.document;

    function ContentFade(el, options) {

        /**
         * Ensure the constructor is new-agnostic
         * Checks the receiver value is a proper instance of Header.
         * This ensures no error if instantiated without 'new' keyword.
         */
        if (!(this instanceof ContentFade)) {
            return new ContentFade(el, options);
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

        this.el.addEventListener(param.pointerStart, this, false);
        this.el.addEventListener(param.pointerEnd, this, false);
    }

    ContentFade.prototype = {

        constructor: ContentFade,

        /**
         * Handles events when they are fired.
         * @method handleEvent
         * @private 
         */
        handleEvent : function (e) {
            switch (e.type) {
            case param.pointerStart:
                this._onStart(e);
                break;
            case param.pointerEnd:
            case param.pointerCancel:
                this._onEnd(e);
                break;
            }
        },

        /**
         * Called when a pointer or touch event starts.
         * @method _onStart
         * @private 
         */
        _onStart : function (e) {
            e.stopPropagation();
        },

        /**
         * Called when a pointer or touch event ends.
         * @method _onEnd
         * @private
         */
        _onEnd : function (e) {
            e.preventDefault();
            e.stopPropagation();
        },

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
        toggleFade : function () {
            var self = this;

            nextFrame(function() {
                self.el.classList.toggle('main-content--fade');
            });

            if (this.options.onToggleState) {
                this.options.onToggleState.call(self);
            }

            this.isActive = this.isActive ? false : true;
        }

    };

    return ContentFade;

}(this));
