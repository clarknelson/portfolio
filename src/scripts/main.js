var home = {

  headerHeight: 130,

  createPattern: function(){

    // add more color options
    // http://bl.ocks.org/mbostock/5577023
    var cellSize = 102;
    var pattern = Trianglify({
      // api options
      // http://qrohlf.com/trianglify/
      width: window.innerWidth,
      height: window.innerHeight,
      cell_size: cellSize,
      x_colors: "YlOrRd"
    });
    $("#mainHeader").append(pattern.canvas());
  },

  headerScrollListener: function(){
    var _this = this;
    $(window).on('scroll', function(e){
      var vh = Math.floor(window.innerHeight - window.scrollY);
      if (vh > _this.headerHeight){
        $("#mainHeader").css({
          height: vh
        });
      } else {
        $("#mainHeader").css({
          height: _this.headerHeight
        });
      }
    });
  },

  contentOpacityScroll: function(){
    $(window).on('scroll', function(e){
      var op = window.scrollY / window.innerHeight;
      if (op <= 1){
        $(".container").css("opacity", op);
        $(".soundcloud").css("opacity", op);
      } else {
        $(".container").css("opacity", 1);
        $(".soundcloud").css("opacity", 1);
      }
    });
  },

  lockSectionScroll: function(){
    var _this = this;
    var offsets = [];
    $("section").each(function(){
      console.log($(this));
      offsets.push($(this).offset().top + $(this).innerHeight());
    });
    //console.log(offsets);
    var offsetTop = $("section.about").offset().top;
    $(window).on('scroll', function(e){
      //console.log(window.scrollY);
      offsets.every(function(el, i, arr){
        //console.log(el, arr);
        return window.scrollY > el;
      });
    });
  },

  expandPhoto: function(){
    $(".photo").on('click', function(){
      var $self = $(this);
      if($self.hasClass("active")){
        $self.css({
          height: 102
        });
        $("html,body").animate({
          scrollTop: $self.offset().top - 200
        });
      } else {
        $self.css({
          height: $self.find('img').innerHeight()
        });
      }
      $self.toggleClass("active");
      console.log();

      //console.log();
    });
  },


  init: function(){
    this.createPattern();
    this.headerScrollListener();
    this.contentOpacityScroll();
    this.lockSectionScroll();
    this.expandPhoto();
  }
}


$(document).ready(function(){
  home.init();
});
