(function($){
var ns = "Showroom";

window[ns] = function() {
  this.prepare();
  this.init();
  this.observe();
};

window[ns].prototype = {
  prepare: function() {
    this.overlay   = $('<div id="overlay" />');
    this.showroom  = $('<div id="showroom" />');
    this.loading   = $('<div id="loading" />');
    site.body.append( this.overlay, this.showroom );
    this.showroom.html( this.loading );
  },

  init: function() {
    this.root   = $('#project');
    this.items  = this.root.find('.projects');
    this.thumbs = this.items.find('img');
  },

  observe: function() {
    this.thumbs.click( $.proxy( this.click, this ));
    this.showroom.click( $.proxy( this.leave, this ));
  },

  click: function( event ) {
    var target, a, src;
    
    target = $(event.currentTarget);
    a      = target.parent().find('.project-thumb a');
    src    = this.src = is_retina ? a.attr('data-retina') : a.attr('href');

    this.enter();
  },

  enter: function() {
    this.active = true;
    this.overlay.add( this.showroom ).addClass('active');
    this.showroom.addClass('loading').find('img').remove();
    this.append();
  },

  append: function() {
    var showroom, img, nw, nh, w, h;
    showroom = this.showroom;
    $('<img src="' + this.src + '" />')
      .error( function() {
        setTimeout( $.proxy( this.leave, this ), 1000 );
      }.bind(this))
      .load( function(){
        img = $(this);
        
        nw = img[0].naturalWidth;
        nh = img[0].naturalHeight;
        
        w = nw;
        h = nh;

        if( is_retina ) {
          w /= 2;
          h /= 2;
        }

        img.css({
          width: w,
          height: h,
          marginLeft: -w/2,
          marginTop: -h/2
        })

        showroom.removeClass('loading').append( $(this) );
        setTimeout(function(){
          showroom.addClass('loaded');
        }, 100);
      });
  },

  leave: function() {
    if( !this.active ) return;
    this.active = false;
    this.overlay.add( this.showroom ).removeClass('active');
    this.showroom.removeClass('loading loaded');
  },
};

})(jQuery);