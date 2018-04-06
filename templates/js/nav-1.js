(function($){
var ns = "Nav";

window[ns] = function() {
  this.prepare();
  this.init();
  this.observe();
};

window[ns].prototype = {
  prepare: function() {
    this.step = [
      f.start,
      f.activity,
      f.activity_pop,
      f.internet,
      f.media,
      f.dots_to_team,
      
      f.light,
      f.gisele,
      f.andy,
      f.egg,
      f.ian,
      f.wawa,
      f.nicole,
      f.amy,
      f.ada,
      f.greg,
      // f.joya,
      // f.sophie,
      f.hayley,
      f.kate,
      f.shakemaker,
      f.catfur,
      f.po,
      f.sliiice,

      f.rrouge_image,
      f.kao_app,
      f.datemenow,
      f.spex_app,
      f.spex_activity,
      f.edn_fanpage,
      f.dsg_movie,

      f.sasa7th,
      f.lufthansa,
      f.aveda,
      f.vizio,
      f.bananaboat,

      f.family,
      f.transformers,
      f.superrun,
      f.ot,
      f.ari,
      f.yahoo_promo,
      f.wretch,
      f.green,
      f.sasa,
      f.rrouge,
      f.esteelauder,
      f.eighteen,
      f.friday,
      f.yahoo_dm,
      f.yahoo_light,

      f.contact
    ];

    this.size = this.step.length;

    this.nav_step = {
      home: 1,
      service: f.service,
      team:    f.team_move,
      project: f.project,
      contact: f.contact
    }
  },

  init: function() {
    this.root     = $('#main-menu');
    this.items    = this.root.find('a');
    this.index = 0;
  },

  observe: function() {
    site.window.keydown( $.proxy( this.keydown, this ));
    this.items.click( $.proxy( this.click, this ));
  },

  click: function( event ) {
    event.preventDefault();
    var target, id;
    target     = $(event.currentTarget).parent();
    id         = target.attr('id').replace('link-', '');
    
    site.frame = this.nav_step[id];
    site.frame ++;
    this.check_step();
    site.showroom.leave();
  },

  prev: function() {
    this.check_step();
    if( this.index > 0 ) this.index--;
    else this.index = 0;
    this.go();
  },

  next: function() {
    this.check_step();
    if( this.index < this.size - 1 ) this.index++;
    else this.index = this.size - 1; 
    this.go();
  },

  goto: function( index ) {
    this.index = index;
    this.go();
  },

  go: function() {
    site.frame = this.step[ this.index ];
    site.frame ++; 
  },

  check_step: function() {
    if( site.frame < this.step[0] ) return this.index = 0;
    for( var i = 0 ; i < this.size - 1 ; i ++ ) { 
      if( site.frame >= this.step[i] && site.frame < this.step[i+1] ) return this.index = i;
      else this.index = this.size-1
    }
  },

  keydown: function( event ) {
    var key = event.which;
    switch( key ) {
      case KEY_UP:
      case KEY_LEFT:
        this.prev();
      break;

      case KEY_DOWN:
      case KEY_RIGHT:
        this.next();
      break;

    }
    site.showroom.leave();
  },
};

})(jQuery);