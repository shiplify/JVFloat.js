/*
 * JVFloat.js
 * modified on: 14/05/2014
 */

(function($) {
  "use strict";
  
  // Init Plugin Functions
  $.fn.jvFloat = function() {
    // Check input type - filter submit buttons.
		return this.filter('input:not([type=submit]), textarea').each(function() {
      // Wrap the input in div.jvFloat
      var $el = $(this)
        .wrap('<div class=jvFloat>');
      
      var forId = $el.attr('id');
      if (!forId)
        forId = createIdOnElement($el);
      
      // Store the placeholder text in span.placeHolder
      // added `required` input detection and state
      var required = $el.attr('required') || '';
      
      // adds a different class tag for text areas (.jvFloat .placeHolder.textarea) 
      // to allow better positioning of the element for multiline text area inputs 
      if( $(this).is("textarea") ) {
		  var placeholder = $('<label class="placeHolder ' + ' textarea ' + required + '" for="' + forId + '">' + $el.attr('placeholder') + '</label>')
        .insertBefore($el);
	} else {
		  var placeholder = $('<label class="placeHolder ' + required + '" for="' + forId + '">' + $el.attr('placeholder') + '</label>')
	.insertBefore($el);
	}
      // checks to see if inputs are pre-populated and adds active to span.placeholder
      setState();
      $el.bind('keyup blur', setState);
      function setState() {
      // change span.placeHolder to span.placeHolder.active
        placeholder.toggleClass('active', $el.val() !== '');
      }
      function generateUIDNotMoreThan1million() {
        do {
          var id = ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).substr(-4);
        } while (!!$('#' + id).length);
        
        return id;
      };
      function createIdOnElement($el) {
        var id = generateUIDNotMoreThan1million();
        
        $el.prop('id', id);
        
        return id;
      };
    });
  };
// Make Zeptojs & jQuery Compatible
})(window.jQuery || window.Zepto || window.$);
