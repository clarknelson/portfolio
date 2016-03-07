var home = {

  preferedHeaderSize: 80,

  mobile: window.innerWidth <= 800 ? true : false,
  desktop: window.innerWidth > 800 ? true : false,

  createPattern: function(){

    // more options: http://bl.ocks.org/mbostock/5577023
    var colors = [
      'YlOrRd',
      //'YlOrBr',
      //'Greys',
      //'Spectral'
    ];
    var xColor = Math.floor(Math.random() * colors.length);
    console.log();

    var cellSize = 102;
    var pattern = Trianglify({
      // api options
      // http://qrohlf.com/trianglify/
      width: window.innerWidth + 100,
      height: window.innerHeight + 100,
      cell_size: cellSize,
      x_colors: colors[xColor]
    });

    // take out the old canvas
    $("#mainHeader canvas").remove()
    //$("#mainHeader").append(pattern.canvas());
  },

  headerScrollListener: function(){
    var _this = this;
    $(window).on('scroll', function(e){
      console.log()
      var headerHeight = Math.floor(window.innerHeight - window.scrollY);
      if (window.scrollY < _this.preferedHeaderSize){
        //$header.css("height", headerHeight);
        $header.css("height", _this.preferedHeaderSize);
        //
      } else {
        //$("html,body").animate({scrollTop: 1000);

      }

    });
  },

  createMenu: function(){
    var _this = this;
    var mainMenu = $("#mainMenu .menu--root");
    $("#mainMenu").css({top: _this.preferedHeaderSize + 20});
    $(".container section").each(function(i){
      if(i == 0){
        mainMenu.append("<span data-link='"+i+"'>home</span>");
      } else {
        mainMenu.append("<span data-link='"+i+"'>"+ this.className +"</span>");
      }
    });

    $("#mainMenu span").on('click', function(e){

      var targetSection = $('.container').find("section[data-index=\""+ $(this).data("link") +"\"]");
      var offset;
      if($(this).data("link") == 0){
        $("html,body").animate({scrollTop: 0});
      } else {
        offset = targetSection.offset().top;
        $("html,body").animate({scrollTop: offset - 150});
      }
    });

  },

  contentOpacityScroll: function(){
    $(window).on('scroll', function(e){
      var op = window.scrollY / window.innerHeight;
      if (op <= 1){
        $(".container").css("opacity", op);
        $("#mainMenu").css("opacity", op);
      } else {
        $(".container").css("opacity", 1);
        $("#mainMenu").css("opacity", 1);
      }
    });
  },

  jumpDownListener: function(){
    var _this = this;
    $("#mainHeader .jumpDown").on('click', function(){
      var offset = $(".container section:first-of-type").offset().top;
      $("html,body").animate({scrollTop: offset});
      //$('#mainHeader').css("height", _this.preferedHeaderSize);
    });
  },

  // helper method for the section headers
  setSectionIndex: function(){
    var index = 0;
    $('.container section').each(function(i){
      if($(this).css('display') === "none"){
        return;
      }
      $(this).find("header h4 span").text("0" + index);
      index++;
    });
  },

  // more user friendly <textarea></textarea>
  // http://stackoverflow.com/questions/6140632/how-to-handle-tab-in-textarea
  convertTab: function(){
    $(".contact textarea").keydown(function(e) {
      if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var $this = $(this);
        var value = $this.val();

        // set textarea value to: text before caret + tab + text after caret
        $this.val(value.substring(0, start)
                    + "\t"
                    + value.substring(end));

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
      }
    });
  },


  resizeListener: function(){
    var _this = this;
    $(window).resize(function(){
      _this.createPattern();
      _this.mobile = window.innerWidth <= 800 ? true : false;
      _this.desktop = window.innerWidth > 800 ? true : false;
    });
  },


  init: function(){
    // global
    this.setSectionIndex();
    this.resizeListener();

    //header
    this.createPattern();
    //this.headerScrollListener();
    //this.headerClickListener();
    this.createMenu();
    this.contentOpacityScroll();
    this.jumpDownListener();

    // contact section
    this.convertTab();
  }
}


$(document).ready(function(){
  home.init();
});


//this.flag();
//this.expandPhoto();
/*
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
flag: function(){
  $('.credits .flag').on('click', function(){
    $(this).toggleClass('active');
    $(this).toggleClass('inactive');
  });
}, */
