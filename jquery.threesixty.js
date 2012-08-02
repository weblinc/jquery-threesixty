// jquery.threesixty.js
// @weblinc, @jsantell, (c) 2012

;(function( $ ) {
  $.fn.threesixty = function ( settings ) {
    var
      options = $.extend( {}, $.fn.threesixty.defaults, settings ),
      mouseDown = false,
      axis = options.spriteSheetDim.x > options.spriteSheetDim.y ? 'x' : 'y';
      dragAxis = options.dragAxis.toUpperCase();

    this.each(function () {
      $(this)
        .mousemove( eMouseMove )
        .data( 'lastPos', 0 );
    });

    $(document)
        .mouseup( eMouseUp )
        .mousedown( eMouseDown );

    this.get(0).addEventListener( 'touchmove', eMouseMove );
    document.addEventListener( 'touchstart', eMouseDown );
    document.addEventListener( 'touchend', eMouseUp );

    function eMouseMove ( event ) {
      if ( !mouseDown ) { return; }
      if ( event.touches && event.touches.length ) {
        event.preventDefault();
        event = event.touches[0];
      }
      var
        $this = $( this ),
        lastPos = $this.data( 'lastPos' ),
        curPos = event[ 'page' + dragAxis ];

      if ( curPos > lastPos + options.sensitivity || curPos < lastPos - options.sensitivity ) {
        changeFrame.call( $this, curPos > lastPos ? 1 : -1 );
        $this.data( 'lastPos', curPos );
      }
    }

    function eMouseUp () { mouseDown = false; }
    function eMouseDown () { mouseDown = true; }

    function changeFrame ( dir ) {
      var
        bgPos = parseInt( this.css( 'background-position-' + axis ), 10 ),
        newPos = bgPos + ( options.spriteDim[ axis ] * dir );
      if ( newPos >= options.spriteSheetDim[ axis ] ) {
        newPos = 0;
      } else if ( newPos < 0 ) {
        newPos = options.spriteSheetDim[ axis ] - options.spriteDim[ axis ];
      }
      this.css( 'background-position-' + axis, newPos + 'px' );
    }
  };


  $.fn.threesixty.defaults = {
    dragAxis: 'x',
    sensitivity: 3,
    spriteSheetDim: { x: 0, y: 0 },
    spriteDim: { x: 0, y: 0 }
  };

})( jQuery );
