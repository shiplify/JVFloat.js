/*
 * JVFloat.js
 * modified on: 12/06/2014
 */

(function($) {
  'use strict';
  
  // Init Plugin Functions
  $.fn.jvFloat = function () {
    // Check input type - filter submit buttons.
    return this.filter('input:not([type=submit]), textarea').each(function() {
      function setState () {
        // change:
        // - div.jvFloat to div.jvFloat.active
        // - span.placeHolder to span.placeHolder.active
        var active = $el.val() !== '';
        $.each([
          placeholder,
          placeholder.parents('.jvFloat')
        ], function(i, el) { el.toggleClass('active', active); });
      }
      function generateUIDNotMoreThan1million () {
        var id = '';
        do {
          id = ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).substr(-4);
        } while (!!$('#' + id).length);
        return id;
      }
      function createIdOnElement($el) {
        var id = generateUIDNotMoreThan1million();
        $el.prop('id', id);
        return id;
      }
      // Wrap the input in div.jvFloat
      var $el = $(this).wrap('<div class=jvFloat>');
      var forId = $el.attr('id');
      if (!forId) { forId = createIdOnElement($el);}
      // Store the placeholder text in span.placeHolder
      // added `required` input detection and state
      var required = $el.attr('required') || '';
      
      // adds a different class tag for text areas (.jvFloat .placeHolder.textarea) 
      // to allow better positioning of the element for multiline text area inputs
      var placeholder = '';
      if( $(this).is('textarea') ) {
        placeholder = $('<label class="placeHolder ' + ' textarea ' + required + '" for="' + forId + '">' + $el.attr('placeholder') + '</label>');
      } else {
        placeholder = $('<label class="placeHolder ' + required + '" for="' + forId + '">' + $el.attr('placeholder') + '</label>');
      }

      // place the label according to data-placeholder-placement (default: before)
      var placement = $(this).data('placeholder-placement');
      if( placement && placement === 'after' ) {
        placeholder.insertAfter($el);
      } else {
        placeholder.insertBefore($el);
      }

      // checks to see if inputs are pre-populated and adds active to span.placeholder
      setState();
      $el.bind('keyup blur jvFloat:update', setState);
    });
  };
// Make Zeptojs & jQuery Compatible
})(window.jQuery || window.Zepto || window.$);
