(function($){
var ns = "Animator";

window[ns] = function() {
  this.init();
  this.animloop();
};

window[ns].prototype = {
  init: function() {
    site.html.addClass('animator-active')
    site.scroller.css('overflow', 'hidden');
    var animators = [], root, style, key, value;
    
    $.each( settings, function( i, data ) {
      root   = $(data.selector);
      styles = 0;

      if( ! data.style ) {
        for( key in data ) {
          if( key != 'selector' && key != 'frame') {
            data.style = {};
            data.style[key] = data[key];
          }
        }

        if( ! data.style ) data.style = false;
      }

      if( typeof data.style == 'object') {
        for( key in data.style ) {
          value = data.style[key];

          if( typeof value == 'number' ) value = data.style[key] = [value]; // trans num to array
          if( value.length == 1) { // only one to change
            switch( key ) {
              case 'height':
              case 'width':
              value.splice( 0, 0, root[key]());
              break;

              case 'left':
              case 'right':
              case 'top':
              case 'bottom':
              value.splice( 0, 0, root.css(key).replace('px','')*1 );
              break;

              default:
              value.splice( 0, 0, root.css(key));
              break;
            }          
          } else {
            for( var i = 0 ; i < value.length ; i ++ ) {
              if( typeof value[i] == 'string' && key != 'transform') {
                data.style[key][i] = data.style[key][i-1] + eval(data.style[key][i]); 
              }
            }
          }
          styles++;
        }
      }

      
      if( !data.frame ) data.frame = root.position().top;
      var frame = data.frame;
      if( typeof frame == 'number' ) frame = data.frame = [frame]; // trans num to array
      if( frame.length == 1 ) {
        for( key in data.style ) {
          frame.push( frame[0] + (data.style[key][1] - data.style[key][0])) ;
        }
      }

      animators.push({
        root   : $(data.selector),
        style  : data.style,
        frame  : frame
      })
    });

    this.animators = animators;


    $.each( animators, function( i , animator ) {
      for( var key in animator.style ) {
        animator.root.css( key, animator.style[key][0] );
      }
    });
  },

  animloop: function() {
    requestAnimFrame( $.proxy( this.animloop, this ) );
    this.render();
  },

  render: function() {
    $.each( this.animators, function( i, animator ) {
      var root    = animator.root,
          style   = animator.style,
          frame   = animator.frame,
          sframe  = site.frame,
          spframe = site.pframe;

      var is_unactive = sframe < frame[0],
          is_actived  = sframe > frame[ frame.length - 1 ];

      var keyframe    = is_unactive ? 0 : frame.length - 1;

      var selector = root.selector.replace('#','').replace('.', '').replace(' ', '-');

      var i,    key,
          from, to,
          current, limit, movement, diff,
          is_deg , is_alpha, range,
          is_unmap  = selector == 'contact-innerwrapper' && site.unmap;

// FREEZE ------------------------------------------------------------------------------------------
      if( is_unactive || is_actived ) {
        modifyClass( root, is_unactive ? 'unactive' : 'actived' , selector);
        if( is_unmap ) is_unactive ? site.remove_map(): site.map_init();

        if( !style ) return;


        for ( key in style) {
          is_deg   = key == 'rotate';
          is_alpha = key == 'opacity';
          is_px    = !( is_deg || is_alpha );

          range    = is_px ? 1 : 0.1;
          
          limit    = style[key][keyframe];
          current  = is_deg ? root.rotate().replace('deg', '')*1
                            : root.css(key).replace('px', '')*1;
          diff     = limit - current;
          if( diff == 0 ) continue;
          
          if( Math.abs( diff ) <= range ) movement = diff;
          else {
            movement = diff * speedrate;
            movement = Math.abs( movement ) < range ? range * ( movement > 0 ? 1 : -1 ) : movement;  
          }

          is_deg ? root.rotate( current + movement + 'deg' ) : root.css( key, current + movement );
        }
        return;
      }

      // if( selector == 'member-sliiice') xx(  "limit: " + limit + ", current: " + current + ', movement: ' + movement );

// ACTIVE ------------------------------------------------------------------------------------------
      for ( i = 0 ; i < frame.length - 1 ; i ++) {
        if( sframe > frame[i]  && sframe < frame[i + 1] ) {
          modifyClass( root, 'active', selector);

          if( is_unmap ) site.map_init();
          if( !style ) return;

          for( key in style ) {
            is_deg   = key == 'rotate';
            is_alpha = key == 'opacity';
            is_px    = key == 'width' || key == 'height';

            range    = is_px ? 1 : 0.01;

            from  = style[key][i];
            to    = style[key][i+1];
            limit = Math.map( sframe , frame[i], frame[i+1], from, to );

            current = is_deg ? root.rotate().replace('deg', '')*1
                             : root.css(key).replace('px', '')*1;
            diff    = limit - current;
            if( diff == 0 ) continue;
            
            if( Math.abs( diff ) <= range ) movement = diff;
            else {
              movement = diff * speedrate;
              movement = Math.abs( movement ) < range ? range * ( movement > 0 ? 1 : -1 ) : movement;
            }

            is_deg ? root.rotate( current + movement + 'deg' ) : root.css( key, current + movement );
          }
          return;
        }
      };
    });

    function modifyClass( root, theStatus, selector ) {
      var selector = selector + '-';
      var status = ['unactive', 'active', 'actived'];
      $.each( status, function( i, s ) {
        if( s != theStatus ) {
          if( root.hasClass( s )  ) root.removeClass( s );
          if( site.body.hasClass( selector + s )  ) site.body.removeClass( selector + s );
        }
      })
      if( ! root.hasClass( theStatus ) ) root.addClass( theStatus );
      if( ! site.body.hasClass( selector + theStatus ) ) site.body.addClass( selector + theStatus );
    }
  },
};

})(jQuery);