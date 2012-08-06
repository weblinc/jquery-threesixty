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
        .mousedown( eMouseDown )
        .data( 'lastPos', 0 );
        
      if ( this.addEventListener ) {
        this.addEventListener( 'touchmove', eMouseMove );
        this.addEventListener( 'touchstart', eMouseDown );
      }
    });

    $( document ).bind( 'mouseup', eMouseUp );
    
    if ( document.addEventListener  ) {
      document.addEventListener( 'touchend', eMouseUp );
    }

    function eMouseMove ( e ) {
      if ( !mouseDown ) { return; }
      var
        $this = $( this ),
        lastPos = $this.data( 'lastPos' ),
        curPos = normalizePosition( e );

      if ( curPos > lastPos + options.sensitivity || curPos < lastPos - options.sensitivity ) {
        changeFrame.call( $this, curPos > lastPos ? 1 : -1 );
        $this.data( 'lastPos', curPos );
      }
      
      e.preventDefault();
    }

    function eMouseUp () { mouseDown = false; }
    function eMouseDown ( e ) { 
      $( this ).data( 'lastPos', normalizePosition( e ));
      mouseDown = true;
      e.preventDefault();
    }

    function changeFrame ( dir ) {
      var
        bgPos = getBackgroundPos.call( this );
        newPos = bgPos[ axis ] + ( options.spriteDim[ axis ] * dir );
      if ( newPos >= options.spriteSheetDim[ axis ] ) {
        newPos = 0;
      } else if ( newPos < 0 ) {
        newPos = options.spriteSheetDim[ axis ] - options.spriteDim[ axis ];
      }
      bgPos[ axis ] = newPos;
      this.css( 'background-position', bgPos.x + 'px ' + bgPos.y + 'px' );
    }

    function getBackgroundPos () {
      var pos = ( this.css( 'background-position' ) || '' ).split(' ');
      return {
        x: parseInt( this.css( 'background-position-x' ) || pos[ 0 ], 10 ),
        y: parseInt( this.css( 'background-position-y' ) || pos[ 1 ], 10 )
      };
    }

    function normalizePosition ( e ) {
        return ( e.touches && e.touches.length ? e.touches[0] : e )[ 'page' + dragAxis ];
    }
  };


  $.fn.threesixty.defaults = {
    dragAxis: 'x',
    sensitivity: 3,
    spriteSheetDim: { x: 0, y: 0 },
    spriteDim: { x: 0, y: 0 }
  };

})( jQuery );
